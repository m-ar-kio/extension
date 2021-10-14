/* eslint-disable no-undef */
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'trigger' })
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'get-keyfile') {
    chrome.storage.local.get(['keyfile'], function (result) {
      sendResponse({ keyfile: result.keyfile })
    })
  }
  return true
})
