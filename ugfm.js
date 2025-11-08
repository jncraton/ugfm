const ugfm = markdown => {
  const article = document.createElement('article')
  const blocks = markdown.split(/\s\s+/)

  blocks.forEach(text => {
    // Replace heading delimiters
    const cleanedText = text.replace(/^#+/, '')
    const headingLevel = text.length - cleanedText.length

    let el

    if (headingLevel) {
      el = document.createElement(`h${headingLevel}`)
    } else {
      el = document.createElement('p')
    }

    el.textContent = cleanedText
    article.append(el)
  })

  return article
}
