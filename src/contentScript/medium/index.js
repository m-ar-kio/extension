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
tdService.remove(['script', 'noscript', 'style', 'figure', 'thumbnail'])

export const startMediumIntegration = () => {
  const origin = window.location.href
  const article = document.getElementsByTagName('article')[0]
  if (article) {
    const md = tdService.turndown(article.innerHTML)
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
}
