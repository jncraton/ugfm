# µgfm

[![Release](https://github.com/jncraton/ugfm/actions/workflows/release.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/release.yml)
[![Deploy](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/deploy.yml)
[![Test](https://github.com/jncraton/ugfm/actions/workflows/test.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/test.yml)
[![Lint](https://github.com/jncraton/ugfm/actions/workflows/lint.yml/badge.svg)](https://github.com/jncraton/ugfm/actions/workflows/lint.yml)

A tiny, safe markdown parser for the browser

[Demo](https://jncraton.github.io/ugfm/)

[ugfm.min.js](https://jncraton.github.io/ugfm/ugfm.min.js) (1018 bytes)

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

### Completed Features

- Thematic breaks (`<hr>`)
- ATX headings
- Indented code blocks
- Fenced code blocks
- Paragraphs
- Textual content
- Blank lines
- Block quotes
- Single-level unordered lists
- Single-level ordered lists
- Emphasis and strong emphasis
- Links
- Images
- Soft line breaks
- Disallowed Raw HTML (extension) (all Raw HTML is disallowed)
- Tables (extension)

### Intentionally Unimplemented Features

- Raw HTML
- HTML blocks

### Incomplete Features

- Setext headings
- Link reference definitions
- Task list items (extension)
- Backslash escapes
- Entity and numeric character references
- Code spans
- Strikethrough (extension)
- Autolinks
- Autolinks (extension)
- Hard line breaks
