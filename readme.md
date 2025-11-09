# µgfm

[![Deploy](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml)
[![Test](https://github.com/jncraton/ugfm/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/test.yml)
[![Lint](https://github.com/jncraton/ugfm/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/lint.yml)

A tiny, safe markdown parser for the browser

[Demo](https://jncraton.github.io/ugfm/)

## Usage

```html
<script src="ugfm.js"></script>

<article></article>

<script>
  document.querySelector('article').replaceChildren(...ugfm('# Heading 1'))
</script>
```

## Features

- [ ] Leaf Blocks
  - [ ] Thematic breaks
  - [x] ATX headings
  - [ ] Setext headings
  - [ ] Indented code blocks
  - [ ] Fenced code blocks
  - [ ] HTML blocks
  - [ ] Link reference definitions
  - [x] Paragraphs
  - [x] Blank lines
  - [ ] Tables (extension)
- [ ] Container blocks
  - [ ] Block quotes
  - [ ] Subitems
  - [x] List items
  - [ ] Task list items (extension)
  - [x] Lists
- [ ] Inlines
  - [ ] Backslash escapes
  - [ ] Entity and numeric character references
  - [ ] Code spans
  - [x] Emphasis and strong emphasis
  - [ ] Strikethrough (extension)
  - [x] Links
  - [ ] Images
  - [ ] Autolinks
  - [ ] Autolinks (extension)
  - [ ] Raw HTML
  - [ ] Disallowed Raw HTML (extension)
  - [ ] Hard line breaks
  - [x] Soft line breaks
  - [ ] Textual content
