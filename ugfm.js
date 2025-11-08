const ugfm = markdown => {
  const article = document.createElement('article')
  article.textContent = markdown
  return article
}
