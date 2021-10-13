/* eslint-disable no-undef */

import { startTwitterIntegration } from './twitter'
import { startMediumIntegration } from './medium'
import { toast, createBookmark } from './helper'

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.type === 'trigger') {
    const result = startMediumIntegration()
    if (result) {
      createBookmark(result)
    } else {
      toast('error', 'Fail to load content')
    }
  }
})

function main() {
  console.log('# main start')
  const href = window.location.href
  if (/\/\/twitter.com/.test(href)) {
    console.log('# twitter integration')
    startTwitterIntegration()
  } else if (/:\/\/\S*.medium.com/.test(href)) {
    console.log('# medium integration')
    startMediumIntegration()
  }
}

main()
