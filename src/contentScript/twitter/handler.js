import TurndownService from 'turndown'
import { saveButtonElement } from './ui'
import { appendTagModal } from '../tagmodal'

const tdService = new TurndownService()
tdService.remove('time')
tdService.addRule('emoji', {
  filter: function (node, options) {
    return node.nodeName === 'IMG'
  },
  replacement: function (content, node, options) {
    const url = node.getAttribute('src')
    const alt = node.getAttribute('alt')
    if (url.includes('/emoji/')) {
      const splits = url.split('/')
      const emoji = splits[splits.length - 1]
      return String.fromCodePoint(`0x${emoji.split('.')[0].split('-')[0]}`)
    }
    return `![${alt}](${url})`
  },
})
tdService.keep('emoji')
tdService.addRule('actions', {
  filter: function (node, options) {
    return node.nodeName === 'DIV' && /KonextAdded/.test(node.className)
  },
  replacement: function () {
    return ''
  },
})
tdService.addRule('showthisthread', {
  filter: function (node, options) {
    return node.nodeName === 'SPAN' && node.innerText === 'Show this thread'
  },
  replacement: () => {
    return ''
  },
})
tdService.addRule('socialContext', {
  filter: function (node, options) {
    return (
      (node.nodeName === 'SPAN' || node.nodeName === 'DIV') &&
      (node.dataset.testid === 'socialContext' ||
        node.getAttribute('aria-hidden') === 'true')
    )
  },
  replacement: () => {
    return ''
  },
})

tdService.addRule('extra', {
  filter: function (node, options) {
    const href = node.getAttribute('href') || ''
    return (
      node.nodeName === 'A' &&
      (href ===
        'https://help.twitter.com/using-twitter/how-to-tweet#source-labels' ||
        /^\/\S*\/status\/\d{1,}$/.test(href) ||
        /^\/\S*\/status\/\d{1,}\/retweets/.test(href) ||
        /^\/\S*\/status\/\d{1,}\/likes/.test(href))
    )
  },
  replacement: () => {
    return ''
  },
})

tdService.remove([
  'script',
  'style',
  'actions',
  'showthisthread',
  'socialContext',
  'extra',
])

const saveToKontextButton = saveButtonElement()

export function addAction() {
  const actionLists = document.querySelectorAll(
    '[role=group]:not(.KonextAdded)'
  )

  if (!actionLists && actionLists.length) return

  try {
    Array.from(actionLists, addPocketFunctionality)
  } catch ({ message }) {
    if (message !== 'legacyTwitter') console.log(message)
  }
}

export function removeKontextButtons() {
  const nodeList = document.querySelectorAll('div.saveToKontextButton')
  nodeList.forEach((e) => e.parentNode.removeChild(e))
}

export function getKontextButtonClone({ permaLink, isFocusViewTweet }) {
  const pocketIconButtonClone = saveToKontextButton.cloneNode(true)
  // the id is used in the resolve save event to find the element and apply styles to it
  pocketIconButtonClone.id = `kontextButton-${Math.random()
    .toString(36)
    .substring(7)}`
  pocketIconButtonClone.setAttribute('data-permalink-path', permaLink)
  pocketIconButtonClone.classList.add(
    isFocusViewTweet ? 'focus-view' : 'list-view'
  )

  return pocketIconButtonClone
}

function addPocketFunctionality(actionListContainer) {
  const { permaLink, isFocusViewTweet } = getTweetInfo(actionListContainer)
  const kontextButton = getKontextButtonClone({
    permaLink,
    isFocusViewTweet,
  })
  // add save handler to each pocket icon
  kontextButton.addEventListener('click', (e) => {
    e.preventDefault()
    const article = kontextButton.closest('article')
    const md = tdService.turndown(article.innerHTML)
    const regexLink = /\)(\n{2,})\)/g
    const regexMid1 = /\[(\n*)(.*)(\n*)\]/g
    const regexMid2 = /\[(\n*)(.*)(\n*)(.*)(\n*)\]/g
    const regexMid3 = /\[(\n{1,})(.*)(\n{1,})(.*)(\n{1,})(.*)(\n{1,})\]/g
    const result = md
      .replace(regexMid1, '[$2]')
      .replace(regexMid2, '[$2$4]')
      .replace(regexMid3, '[$2$4$6]')
      .replace(regexLink, ')\n)')
      .replace(/\n·\n/, '')

    appendTagModal({
      content: result,
      origin: permaLink,
    })
  })
  // add save to pocket button to the twitter action list container
  addPocketIconToActionList(actionListContainer, kontextButton)
}

function addPocketIconToActionList(actionListContainer, kontextButton) {
  const shareAction = actionListContainer.children[3]
  shareAction.before(kontextButton)
  actionListContainer.classList.add('KonextAdded')
}

export function getTweetInfo(twitterActionListCotnainerElement) {
  // Page link is last resort
  const pageLink = window.location.pathname

  // Find the Tweet container
  const tweet = twitterActionListCotnainerElement.closest('article')

  // This is legacy twitter, no article tag parent present!'
  if (tweet && tweet.length === 0) throw Error('legacyTwitter')

  // Fetch the single time element, from there we can grab the href from the
  // parent to get the screen name and status id.

  const time = tweet.querySelector('time')
  const timeContainer = time ? time.parentElement : false
  const timeLink = timeContainer ? timeContainer.getAttribute('href') : false
  const permaLink = timeLink ? `https://twitter.com${timeLink}` : pageLink
  const isFocusViewTweet = tweet.getAttribute('data-testid') === 'tweetDetail'

  return {
    permaLink: permaLink.startsWith('/')
      ? `https://twitter.com${permaLink}`
      : permaLink,
    isFocusViewTweet,
  }
}
