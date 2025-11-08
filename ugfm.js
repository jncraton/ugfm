const ugfm = markdown => {
  const article = document.createElement('article')
  const blocks = markdown.split(/\s\s+/)

  blocks.forEach(text => {
    const p = document.createElement('p')
    p.textContent = text
    article.append(p)
  })

  return article
}
