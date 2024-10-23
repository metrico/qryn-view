// this is a fixed version of the json-markup npm package
'use strict'

const INDENTATION = '    '

function createInlineStyle(rules: Record<string, string> | undefined): string {
  let inlineStyle = ''
  rules && Object.keys(rules).forEach((property) => {
    inlineStyle += `${property}:${rules[property]};`
  })
  return inlineStyle
}

function createStyleApplier(styleFile: Record<string, Record<string, string>> | undefined) {
  function applyClass(cssClassName: string): string {
    return `class="${cssClassName}"`
  }

  function applyInlineStyle(cssClassName: string): string {
    return `style="${createInlineStyle(styleFile?.['.' + cssClassName])}"`
  } 

  return styleFile ? applyInlineStyle : applyClass
}

function determineType(value: any): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'string' && /^https?:/.test(value)) return 'link'
  if (typeof value === 'object' && typeof value.toISOString === 'function') return 'date'

  return typeof value
}

function escapeHtml(unsafeString: string): string {
  return unsafeString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default function renderJsonMarkup(
  jsonObject: any,
  styleFile?: Record<string, Record<string, string>> | undefined
): string {
  let currentIndentation = ''
  const applyStyle = createStyleApplier(styleFile)

  function renderList(
    items: any[],
    startDelimiter: string,
    endDelimiter: string,
    renderItem: (item: any) => string
  ): string {
    if (!items.length) return `${startDelimiter} ${endDelimiter}`

    let result = startDelimiter + '\n'

    currentIndentation += INDENTATION
    items.forEach((item, index) => {
      result += currentIndentation + renderItem(item) + (index < items.length - 1 ? ',' : '') + '\n'
    })
    currentIndentation = currentIndentation.slice(0, -INDENTATION.length)

    return result + currentIndentation + endDelimiter
  }

  function renderValue(value: any): string {
    if (value === undefined) return ''

    switch (determineType(value)) {
      case 'boolean':
        return `<span ${applyStyle('json-markup-bool')}>${value}</span>`

      case 'number':
        return `<span ${applyStyle('json-markup-number')}>${value}</span>`

      case 'date':
        return `<span class="json-markup-string">"${escapeHtml(value.toISOString())}"</span>`

      case 'null':
        return `<span ${applyStyle('json-markup-null')}>null</span>`

      case 'string':
        return `<span ${applyStyle('json-markup-string')}>"${escapeHtml(value.replace(/\n/g, '\n' + currentIndentation))}"</span>`

      case 'link':
        return `<span ${applyStyle('json-markup-string')}>"<a href="${escapeHtml(value)}">${escapeHtml(value)}</a>"</span>`

      case 'array':
        return renderList(value, '[', ']', renderValue)

      case 'object':
        const keys = Object.keys(value).filter((key) => value[key] !== undefined)

        return renderList(keys, '{', '}', (key) =>
          `<span ${applyStyle('json-markup-key')}>"${escapeHtml(key)}":</span> ${renderValue(value[key])}`
        )
    }

    return ''
  }

  return `<div ${applyStyle('json-markup')}>${renderValue(jsonObject)}</div>`
}