const ugfm = markdown => {
  const parseInline = markdown => {
    let nodes = markdown || ''
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
          return el('img', '', ['alt', a[1]], ['src', a[2]])
        } else {
          return el('a', a[1], ['href', a[2]])
        }
      }

      return node
    })

    return nodes
  }

  const el = (name, text, ...attrs) => {
    const newElement = document.createElement(name)
    newElement.append(...parseInline(text))
    attrs.forEach(attr => newElement.setAttribute(attr[0], attr[1]))
    return newElement
  }

  const article = el('article')
  const blocks = markdown.split(/\n\n+/)

  blocks.forEach(text => {
    const headingLevel = text.match(/^#*/)[0].length
    if (headingLevel) {
      article.append(el(`h${headingLevel}`, text.slice(headingLevel)))
    } else if (text.match(/^[\-\*\_]{3,}$/)) {
      article.append(el('hr'))
    } else if (text[0] == '-') {
      const ul = el('ul')
      text.split(/^\- /gm).forEach(item => {
        if (item) {
          ul.append(el('li', item))
        }
      })
      article.append(ul)
    } else if (text[0] == '>') {
      article.append(el('blockquote', text.replace(/^> */gm, ' ')))
    } else {
      article.append(el('p', text))
    }
  })

  return article
}
