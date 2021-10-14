import TurndownService from 'turndown'

const tdService = new TurndownService()
tdService.addRule('thumbnail', {
  filter: function (node, options) {
    return (
      node.nodeName === 'IMG' &&
      (node.style.visibility === 'hidden' ||
        (node.getAttribute('src') || '').includes('?q=20'))
    )
  },
  replacement: () => {
    return ''
  },
})
tdService.addRule('related', {
  filter: function (node) {
    return (
      (node.nodeName === 'DIV' &&
        (/related/.test(node.className) ||
          /layout-article-sharing/.test(node.className))) ||
      (node.nodeName === 'SECTION' &&
        ['tag-list', 'see-alsos'].includes(node.dataset.component))
    )
  },
  replacement: () => {
    return ''
  },
})
tdService.addRule('hidden', {
  filter: function (node) {
    return (
      node.getAttribute('hidden') !== null ||
      node.getAttribute('aria-haspopup') === 'true'
    )
  },
  replacement: () => {
    return ''
  },
})
tdService.remove([
  'script',
  'noscript',
  'style',
  'figure',
  'thumbnail',
  'related',
  'footer',
  'hidden',
])

export const startMediumIntegration = () => {
  const origin = window.location.href
  const article = document.getElementsByTagName('article')[0]
  const main = document.getElementsByTagName('main')[0]
  let md = ''
  if (article) {
    md = tdService.turndown(article.innerHTML)
  } else if (main) {
    const articleContent = main.getElementsByClassName('article-content')[0]
    if (articleContent) {
      md = tdService.turndown(articleContent.innerHTML)
    } else {
      md = tdService.turndown(main.innerHTML)
    }
  }

  const regexLink = /\)(\n*)\)/g
  const regexMid1 = /\[(\n*)(.*)(\n*)\]/g
  const regexMid2 = /\[(\n*)(.*)(\n*)(.*)(\n*)\]/g
  const regexMid3 = /\[(\n*)(.*)(\n*)(.*)(\n*)(.*)(\n*)\]/g
  const result = md
    .replace(regexMid1, '[$2]')
    .replace(regexMid2, '[$2$4]')
    .replace(regexMid3, '[$2$4$6]')
    .replace(regexLink, '))')
    .replace(/\n·\n/, '')

  return {
    content: result,
    origin,
  }
}
