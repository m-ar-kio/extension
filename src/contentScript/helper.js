/* eslint-disable no-undef */
import Arweave from 'arweave/web'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const TARGET = 'FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234'

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
        target: TARGET,
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

    if (balanceInAr < 0.10000001) {
      toast('error', 'Error: Insufficient balance to send mail')
      return
    }

    // PST Fee handling
    // let pstRecipient = await getPSTAllocation() // Get randomized token holder address
    // let pstTx = await arweave.createTransaction(
    //   {
    //     target: TARGET, // Fee recipient
    //     quantity: arweave.ar.arToWinston(0.1), // 0.1 AR fee
    //   },
    //   wallet
    // )
    // await arweave.transactions.sign(pstTx, wallet) // Sign transaction
    // await arweave.transactions.post(pstTx)

    const txResponse = await arweave.transactions.post(tx)
    console.log('###', txResponse)
    arweave.transactions.getStatus(txId).then((res) => {
      console.log('getStatus', res)
    })

    toast('success', `Success: Transaction sent, id: ${txId}.`)
  })
}
