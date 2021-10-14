import React from 'react'
import { isBBC, isMedium, isNyTimes, isTwitter } from './helper'
import TwitterLogo from '../../images/source/twitter.svg'
import MediumLogo from '../../images/source/medium.svg'
import NytimesLogo from '../../images/source/nytimes.svg'
import BBCLogo from '../../images/source/bbc.svg'

export default function Source({ parsedURL }) {
  let src = null
  const hostname = parsedURL.hostname
  if (isTwitter(hostname)) {
    src = TwitterLogo
  } else if (isMedium(hostname)) {
    src = MediumLogo
  } else if (isNyTimes(hostname)) {
    src = NytimesLogo
  } else if (isBBC(hostname)) {
    src = BBCLogo
  }
  return (
    <a
      href={parsedURL.href}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <span style={{ marginRight: 10 }}>Origin:</span>
      {src ? (
        <img src={src} alt="twitter" height="30px" />
      ) : (
        <span>{hostname}</span>
      )}
    </a>
  )
}
