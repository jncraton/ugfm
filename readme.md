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
