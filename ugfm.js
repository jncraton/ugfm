const ugfm = markdown => {
  const parseInline = nodes => {
    if (nodes?.map) return nodes
    if (!nodes?.at) return [nodes]
    nodes = nodes.split(/(\*\*.*?\*\*|__.*?__|!?\[.*?\]\(.*?\))/)
    nodes = nodes.map(node => {
      const strong = node.match(/\*\*(.*?)\*\*/)
      if (strong) {
        return el('strong', strong[1])
      }

      const em = node.match(/__(.*?)__/)
      if (em) {
        return el('em', em[1])
      }

      const a = node.match(/!?\[(.*?)\]\((\S*)\)/)
      if (a) {
        if (a[0][0] == '!') {
          return el('img', '', { alt: a[1], src: a[2] })
        } else {
          return el('a', a[1], { href: a[2] })
        }
      }

      return node
    })

    return nodes
  }

  const el = (name, child = '', attrs = {}) => {
    const newElement = document.createElement(name)
    newElement.append(...parseInline(child))
    for (attr in attrs) {
      newElement.setAttribute(attr, attrs[attr])
    }
    return newElement
  }

  const article = el('article')

  markdown = markdown.replace(/```\S*(.*?)```/gms, (_, code) => code.replace(/\n/g, '\n    ').trimEnd())
  const blocks = markdown.split(/(?<!    [^\n]*)\n\n+|\n\n+(?=\S)/)

  article.append(
    ...blocks.map(text => {
      const headingLevel = text.match(/^#*/)[0].length
      if (headingLevel) {
        return el(`h${headingLevel}`, text.slice(headingLevel))
      } else if (text.match(/^[\-\*\_]{3,}$/)) {
        return el('hr')
      } else if (text.match(/^ {4,}/)) {
        return el('pre', el('code', text))
      } else if (text[0] == '-') {
        return el(
          'ul',
          text
            .slice(1)
            .split(/^\- /gm)
            .map(item => el('li', item)),
        )
      } else if (text[0] == '>') {
        return el('blockquote', text.replace(/^> */gm, ' '))
      } else {
        return el('p', text)
      }
    }),
  )

  return article
}
