/* eslint-disable no-undef */
import Arweave from 'arweave/web'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { getPSTAllocation } from './pst'
import { MARK_OWNER } from './constants'

export function toast(type, message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top', // `top` or `bottom`
    position: 'right',
    style: {
      background: {
        success: 'green',
        error: 'red',
        normal: '#002FA7',
      }[type],
    },
    onClick: function () {}, // Callback after click
  }).showToast()
}

export async function createBookmark(bm) {
  chrome.runtime.sendMessage({ method: 'get-keyfile' }, async (response) => {
    if (!response.keyfile) {
      toast('error', 'Please login first')
      return
    }
    toast('normal', 'Saving')

    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    })
    const wallet = JSON.parse(response.keyfile)
    const tokens = arweave.ar.arToWinston(0)

    const tx = await arweave.createTransaction(
      {
        target: MARK_OWNER,
        data: JSON.stringify(bm),
        quantity: tokens,
      },
      wallet
    )
    tx.addTag('App-Name', 'permamark')
    tx.addTag('App-Version', '0.0.1')
    tx.addTag('Unix-Time', Math.round(new Date().getTime() / 1000))

    await arweave.transactions.sign(tx, wallet)
    let txId = tx.id

    let jwkWallet = await arweave.wallets.jwkToAddress(wallet)
    let walletBalance = await arweave.wallets.getBalance(jwkWallet)
    let balanceInAr = await arweave.ar.winstonToAr(walletBalance)

    if (balanceInAr < 0.02000001) {
      toast('error', 'Insufficient balance to mark')
      return
    }

    // PST Fee handling
    let pstRecipient = await getPSTAllocation()
    const pstTx = await arweave.createTransaction(
      {
        target: pstRecipient,
        quantity: arweave.ar.arToWinston(0.01), // 0.2 AR fee
      },
      wallet
    )
    await arweave.transactions.sign(pstTx, wallet)
    await arweave.transactions.post(pstTx)

    await arweave.transactions.post(tx)

    toast('success', `Transaction sent,\nid: ${txId}.`)
  })
}
