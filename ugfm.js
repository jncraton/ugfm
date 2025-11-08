const ugfm = markdown => {
  const parseInline = markdown => {
    let nodes = markdown || ''
    nodes = nodes.split(/(\*\*.*?\*\*|__.*?__)/)
    nodes = nodes.map(node => {
      const strong = node.match(/\*\*(.*?)\*\*/)
      if (strong) {
        return el('strong', strong[1])
      }

      const em = node.match(/__(.*?)__/)
      if (em) {
        return el('em', em[1])
      }

      return node
    })

    return nodes
  }

  const el = (name, text) => {
    const newElement = document.createElement(name)
    newElement.append(...parseInline(text))
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
      ul = el('ul')
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

  return article.childNodes
}
