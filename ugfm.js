const ugfm = markdown => {
  const el = (name, text) => {
    const newElement = document.createElement(name)
    newElement.textContent = text
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
    } else {
      article.append(el('p', text))
    }
  })

  return article
}
