const ugfm = markdown => {
  const el = (name, children = '', attrs = {}) => {
    /**
     * Builds a DOM element
     *
     * @param name - Name of the element, e.g. 'h3'
     * @param children - Children of the element. Can be text, node, or array of nodes
     * @param attrs - An object representing attributes for the node
     * @returns DOM element
     */
    const newElement = document.createElement(name)
    newElement.append(...[children].flat())
    for (const attr in attrs) {
      newElement.setAttribute(attr, attrs[attr])
    }
    return newElement
  }

  const parseInline = text => {
    /**
     * Phase 2: Parse inline content (links, images, emphasis, bold)
     *
     * @param text - Text content to parse for inline formatting
     * @returns Array of DOM nodes and text nodes
     */
    return text.split(/(\*\*.*?\*\*|__.*?__|!?\[.*?\]\(\S*\))/).map(node => {
      const strong = node.match(/\*\*(.*?)\*\*/)
      if (strong) {
        return el('strong', parseInline(strong[1]))
      }

      const em = node.match(/__(.*?)__/)
      if (em) {
        return el('em', parseInline(em[1]))
      }

      const a = node.match(/!?\[(.*)\]\((\S*)\)/)
      if (a) {
        if (a[0][0] == '!') {
          return el('img', '', { alt: a[1], src: a[2] })
        } else {
          return el('a', parseInline(a[1]), { href: a[2] })
        }
      }

      return node
    })
  }

  const parseList = (lines, startIndex, baseIndent) => {
    /**
     * Parse a list recursively, handling nested lists
     *
     * @param lines - Array of lines
     * @param startIndex - Index to start parsing from
     * @param baseIndent - Base indentation level for this list
     * @returns Object with list element and next index
     */
    const isOrdered = lines[startIndex].match(/^\d+\. /)
    const listType = isOrdered ? 'ol' : 'ul'
    const items = []
    let j = startIndex

    while (j < lines.length) {
      const currentLine = lines[j]

      // Check indentation
      const indent = currentLine.match(/^ */)[0].length

      // If line is less indented than base, we're done with this list
      if (currentLine.trim() && indent < baseIndent) {
        break
      }

      // Check if this is a list item at the current level
      const itemMatch = currentLine.match(/^( *)([\-+*] |\d+\. )(.*)/)

      if (!itemMatch) {
        // Blank line or non-list content
        if (!currentLine.trim()) {
          // Check if next line continues the list at this level
          if (j + 1 < lines.length) {
            const nextIndent = lines[j + 1].match(/^ */)[0].length
            if (nextIndent >= baseIndent && lines[j + 1].match(/^ *([\-+*] |\d+\. )/)) {
              j++
              continue
            }
          }
        }
        break
      }

      const itemIndent = itemMatch[1].length

      // If this item is at a different indent level, skip it (will be handled by recursion)
      if (itemIndent !== baseIndent) {
        break
      }

      const itemContent = [...parseInline(itemMatch[3]), '\n']
      j++

      // Check for nested lists
      while (j < lines.length) {
        const nextLine = lines[j]
        const nextIndent = nextLine.match(/^ */)[0].length

        // If next line is more indented and is a list item, parse nested list
        if (nextLine.trim() && nextIndent > baseIndent && nextLine.match(/^ *([\-+*] |\d+\. )/)) {
          const nestedResult = parseList(lines, j, nextIndent)
          itemContent.push(nestedResult.list)
          j = nestedResult.nextIndex
        } else {
          break
        }
      }

      items.push(el('li', itemContent))
    }

    return { list: el(listType, items), nextIndex: j }
  }

  const parseBlocks = lines => {
    /**
     * Phase 1: Parse block structure
     * Process lines to build a tree of block elements
     *
     * @param lines - Array of lines to parse
     * @returns Array of DOM elements
     */
    const blocks = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Skip blank lines
      if (!line.trim()) {
        i++
        continue
      }

      // Thematic break
      if (line.match(/^[\-\*\_]{3,}$/)) {
        blocks.push(el('hr'))
        i++
        continue
      }

      // ATX heading
      const headingMatch = line.match(/^(#{1,6}) (.*)/)
      if (headingMatch) {
        blocks.push(el(`h${headingMatch[1].length}`, parseInline(headingMatch[2])))
        i++
        continue
      }

      // Fenced code block
      if (line.match(/^```/)) {
        const codeLines = []
        i++
        while (i < lines.length && !lines[i].match(/^```/)) {
          codeLines.push(lines[i])
          i++
        }
        blocks.push(el('pre', el('code', codeLines.join('\n'))))
        i++ // Skip closing fence
        continue
      }

      // Indented code block
      if (line.match(/^ {4}/)) {
        const codeLines = []
        while (i < lines.length) {
          if (lines[i].match(/^ {4}/)) {
            codeLines.push(lines[i])
            i++
          } else if (!lines[i].trim() && i + 1 < lines.length && lines[i + 1].match(/^ {4}/)) {
            // Blank line followed by more indented code - include the blank line
            codeLines.push('')
            i++
          } else {
            break
          }
        }
        blocks.push(el('pre', el('code', codeLines.join('\n'))))
        continue
      }

      // Table
      if (line.match(/^\|/)) {
        const tableLines = []
        while (i < lines.length && lines[i].match(/^\|/)) {
          tableLines.push(lines[i])
          i++
        }
        const rowBuilder = (row, name) =>
          /**
           * Builds a `tr` element
           *
           * @param row - Row of from markdown text such as: "| a | b |"
           * @param name - Column element name (`th` or `td`)
           * @returns `tr` element
           */
          el(
            'tr',
            row.split('|').map(cell => cell && el(name, parseInline(cell))),
          )
        blocks.push(
          el('table', [
            el('thead', rowBuilder(tableLines[0], 'th')),
            el(
              'tbody',
              tableLines.slice(2).map(row => rowBuilder(row, 'td')),
            ),
          ]),
        )
        continue
      }

      // Blockquote (container block)
      if (line.match(/^>/)) {
        const quoteLines = []
        while (i < lines.length) {
          if (lines[i].match(/^>/)) {
            quoteLines.push(lines[i].replace(/^> ?/, ''))
            i++
          } else if (!lines[i].trim()) {
            // Blank line - could be part of blockquote or end it
            if (i + 1 < lines.length && (lines[i + 1].match(/^>/) || lines[i + 1].trim())) {
              quoteLines.push('')
              i++
            } else {
              break
            }
          } else if (
            quoteLines.length > 0 &&
            lines[i].trim() &&
            !lines[i].match(/^(#{1,6} |[\-\*\_]{3,}$|```|^ {4}|\||[\-+*] |\d+\. )/)
          ) {
            // Lazy continuation - a non-blank line that isn't a block start
            quoteLines.push(lines[i])
            i++
          } else {
            break
          }
        }
        // Recursively parse blockquote content
        blocks.push(el('blockquote', parseBlocks(quoteLines)))
        continue
      }

      // List (container block)
      if (line.match(/^[\-+*] /) || line.match(/^\d+\. /)) {
        const result = parseList(lines, i, 0)
        blocks.push(result.list)
        i = result.nextIndex
        continue
      }

      // Paragraph - collect consecutive non-blank lines
      const paraLines = []
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].match(/^(#{1,6} |[\-\*\_]{3,}$|```|^ {4}|\||>|[\-+*] |\d+\. )/)
      ) {
        paraLines.push(lines[i])
        i++
      }
      if (paraLines.length > 0) {
        blocks.push(el('p', parseInline(paraLines.join(' '))))
      }
    }

    return blocks
  }

  // Start two-phase parsing
  const lines = markdown.split('\n')
  const article = el('article')
  article.append(...parseBlocks(lines))

  return article
}
