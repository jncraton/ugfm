const ugfm = markdown => {
  const article = document.createElement('article')
  const blocks = markdown.split(/\n\n+/)

  blocks.forEach(text => {
    // Replace heading delimiters
    const cleanedText = text.replace(/^#+/, '')
    const headingLevel = text.length - cleanedText.length

    let el

    if (headingLevel) {
      el = document.createElement(`h${headingLevel}`)
      el.textContent = cleanedText
    } else if (text[0] == '-') {
      el = document.createElement('ul')
      text.split(/^\- /gm).forEach(item => {
        if (item.trim()) {
          const li = document.createElement('li')
          li.textContent = item
          el.append(li)
        }
      })
    } else {
      el = document.createElement('p')
      el.textContent = text
    }

    article.append(el)
  })

  return article
}
