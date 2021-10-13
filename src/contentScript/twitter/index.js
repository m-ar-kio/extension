/* global chrome */
import { addAction, removeKontextButtons } from './handler'
;(function () {
  if (window.top === window) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setLoaded)
    } else {
      setLoaded()
    }
  }
})()

function setLoaded() {
  if (chrome) {
    chrome.runtime.onMessage.addListener(function (request) {
      console.log('### twitter', request)
      const { action: name, payload: message } = request
      handleMessage({ name, message })
    })
  }
}

const twitterObserver = new MutationObserver(addAction)
const mutationConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true,
}

export function startTwitterIntegration() {
  const root = document.querySelector('#react-root')
  twitterObserver.observe(root, mutationConfig)
  setLoaded()
  addAction()
}

export function stopIntegration() {
  twitterObserver.disconnect()
  removeKontextButtons()
}

function handleMessage(event) {}
