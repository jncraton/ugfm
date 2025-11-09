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
      console.log(a)
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
    // Replace heading delimiters
    const cleanedText = text.replace(/^#+/, '')
    const headingLevel = text.length - cleanedText.length

    if (headingLevel) {
      article.append(el(`h${headingLevel}`, cleanedText))
    } else if (text[0] == '-') {
      const ul = el('ul')
      text.split(/^\- /gm).forEach(item => {
        if (item.trim()) {
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
