const ugfm = markdown => {
  const parseInline = markdown => {
    /**
     * Parses a markdown string for inline formatting
     *
     * @param markdown = Markdown text of the node
     * @returns Array of nodes
     */
    return markdown.split(/(\*\*.*?\*\*|__.*?__|!?\[.*?\]\(\S*\))/).map(node => {
      const strong = node.match(/\*\*(.*?)\*\*/)
      if (strong) {
        return el('strong', strong[1])
      }

      const em = node.match(/__(.*?)__/)
      if (em) {
        return el('em', em[1])
      }

      const a = node.match(/!?\[(.*)\]\((\S*)\)/)
      if (a) {
        if (a[0][0] == '!') {
          return el('img', '', { alt: a[1], src: a[2] })
        } else {
          return el('a', a[1], { href: a[2] })
        }
      }

      return node
    })
  }

  const el = (name, children = '', attrs = {}) => {
    const newElement = document.createElement(name)
    newElement.append(...(children?.big ? parseInline(children) : [children].flat()))
    for (const attr in attrs) {
      newElement.setAttribute(attr, attrs[attr])
    }
    return newElement
  }

  const article = el('article')

  markdown = markdown.replace(/```\S*(.*?)```/gms, (_, code) => code.replace(/\n/g, '\n    ').trimEnd())
  const blocks = markdown.split(/(?<!    [^\n]*)\n\n+|\n\n+(?=\S)/)

  const rowBuilder = (row, name) => {
    return el(
      'tr',
      row.split('|').map(cell => (cell ? el(name, cell) : '')),
    )
  }

  article.append(
    ...blocks.map(text => {
      const headingLevel = text.match(/^#*/)[0].length
      if (headingLevel) {
        return el(`h${headingLevel}`, text.slice(headingLevel))
      } else if (text.match(/^[\-\*\_]{3,}$/)) {
        return el('hr')
      } else if (text.match(/^ {4,}/)) {
        return el('pre', el('code', text))
      } else if ((m = text.match(/^- |^\d+\./))) {
        return el(
          text[0] == '-' ? 'ul' : 'ol',
          text
            .slice(m[0].length)
            .split(/^\- |^\d+\./gm)
            .map(item => el('li', item)),
        )
      } else if (text[0] == '>') {
        return el('blockquote', text.replace(/^> */gm, ' '))
      } else if (text[0] == '|') {
        const rows = text.split('\n')
        return el('table', [
          el('thead', rowBuilder(rows[0], 'th')),
          el(
            'tbody',
            rows.slice(2).map(row => rowBuilder(row, 'td')),
          ),
        ])
      } else {
        return el('p', text)
      }
    }),
  )

  return article
}
