# µgfm

[![Release](https://github.com/jncraton/ugfm/actions/workflows/release.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/release.yml)
[![Deploy](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml)
[![Test](https://github.com/jncraton/ugfm/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/test.yml)
[![Lint](https://github.com/jncraton/ugfm/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/lint.yml)

A tiny, safe markdown parser for the browser

[Demo](https://jncraton.github.io/ugfm/)

[ugfm.min.js](https://jncraton.github.io/ugfm/ugfm.min.js) (1005 bytes)

## Usage

```html
<script src="ugfm.js"></script>

<main></main>

<script>
  document.querySelector('main').append(...ugfm('# Heading 1'))
</script>
```

## Safety

This packages will never produce unsafe HTML. `createElement` is used to build elements in the DOM, `innerHTML` is never used, and any raw HTML provided by the user will simply appear as text.

## Features

Feature support is very limited at the moment. The following [GFM features](https://github.github.com/gfm/) are available:

- [ ] Leaf Blocks
  - [x] Thematic breaks
  - [x] ATX headings
  - [ ] Setext headings
  - [x] Indented code blocks
  - [x] Fenced code blocks
  - [ ] HTML blocks
  - [ ] Link reference definitions
  - [x] Paragraphs
  - [x] Blank lines
  - [x] Tables (extension)
- [ ] Container blocks
  - [x] Block quotes
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
  - [x] Images
  - [ ] Autolinks
  - [ ] Autolinks (extension)
  - [ ] Raw HTML
  - [ ] Disallowed Raw HTML (extension)
  - [ ] Hard line breaks
  - [x] Soft line breaks
  - [ ] Textual content
