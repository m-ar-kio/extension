/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import Arweave from 'arweave/web'
import { StyledSpinnerNext } from 'baseui/spinner'
import Layout from './Layout'
import './Options.css'
import Login from './Login'
import UserLayout from './UserLayout'

export default function Hello() {
  const [address, setAddress] = useState('')
  const [keyfile, setKeyfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (address) {
      return
    }
    document.title = 'm-ar-k'
    chrome.storage.local.get(['keyfile'], function (result) {
      if (result.keyfile) {
        setKeyfile(result.keyfile)
        const arweave = Arweave.init()
        arweave.wallets
          .jwkToAddress(JSON.parse(result.keyfile))
          .then((address) => {
            setAddress(address)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [address])
  return (
    <Layout>
      {isLoading && <StyledSpinnerNext />}
      {!isLoading && !address && <Login />}
      {address && <UserLayout address={address} keyfile={keyfile}></UserLayout>}
    </Layout>
  )
}
