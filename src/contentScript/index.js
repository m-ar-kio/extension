/* eslint-disable no-undef */

import { startTwitterIntegration } from './twitter'
import { startMediumIntegration } from './medium'
import { toast } from './helper'
import { appendTagModal } from './tagmodal'

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.type === 'trigger') {
    const result = startMediumIntegration()
    if (result && result.content) {
      appendTagModal(result)
    } else {
      toast('error', 'Fail to load content')
    }
  }
})

function main() {
  const href = window.location.href
  if (/\/\/twitter.com/.test(href)) {
    startTwitterIntegration()
  } else if (/:\/\/\S*.medium.com/.test(href)) {
    startMediumIntegration()
  }
}

main()
