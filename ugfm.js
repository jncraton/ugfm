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
    /**
     * Builds a DOM element
     *
     * @param name - Name of the element, e.g. 'h3'
     * @param children - Children of the element. Can be a markdown string,
     * node, or list of nodes. If markdown, text will be processed for inline
     * styles
     * @param attrs - An object representing attributes for the node
     * @returns Array of nodes
     */
    const newElement = document.createElement(name)
    newElement.append(...(children?.big ? parseInline(children) : [children].flat()))
    for (const attr in attrs) {
      newElement.setAttribute(attr, attrs[attr])
    }
    return newElement
  }

  const rowBuilder = (row, name) => {
    /**
     * Builds a `tr` element
     *
     * @param row - Row of from markdown text such as: "| a | b |"
     * @param name - Column element name (`th` or `td`)
     * @returns `tr` element
     */
    return el(
      'tr',
      row.split('|').map(cell => cell && el(name, cell)),
    )
  }

  const article = el('article')

  // Convert fenced code blocks to indented code blocks
  markdown = markdown.replace(/```\S*(.*?)\n?```/gms, (_, code) => code.replace(/\n/g, '\n    '))

  const blocks = markdown.split(/(?<!    [^\n]*)\n\n+|\n\n+(?=\S)/)

  article.append(
    ...blocks.map(text => {
      const headingLevel = text.match(/^#*/)[0].length
      const listItems = text.split(/^[\-+*] |^\d+\./gm).slice(1)
      if (headingLevel) {
        return el(`h${headingLevel}`, text.slice(headingLevel))
      } else if (text.match(/^[\-\*\_]{3,}$/)) {
        return el('hr')
      } else if (text.match(/^ {4,}/)) {
        return el('pre', el('code', text))
      } else if (listItems[0]) {
        return el(
          text.match(/^[\-+*]/) ? 'ul' : 'ol',
          listItems.map(item => el('li', item)),
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
