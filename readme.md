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

### Completed Features

- Thematic breaks (`<hr>`)
- ATX headings
- Indented code blocks
- Fenced code blocks
- Paragraphs
- Blank lines
- Tables (extension)
- Block quotes
- Single-level unordered lists
- Emphasis and strong emphasis
- Links
- Images
- Soft line breaks

### Incomplete Features

- Setext headings
- HTML blocks
- Link reference definitions
- Container blocks
- Task list items (extension)
- Inlines
- Backslash escapes
- Entity and numeric character references
- Code spans
- Strikethrough (extension)
- Autolinks
- Autolinks (extension)
- Raw HTML
- Disallowed Raw HTML (extension)
- Hard line breaks
- Textual content
