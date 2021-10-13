/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'get-keyfile') {
    chrome.storage.local.get(['keyfile'], function (result) {
      sendResponse({ keyfile: result.keyfile })
    })
  }
  return true
})
