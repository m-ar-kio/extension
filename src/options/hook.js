import { useEffect, useState } from 'react'

export const useMyMarks = (address) => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    if (!address) {
      return
    }
    import('arweave/web').then((Arweave) => {
      const arweave = Arweave.default.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
      })

      const query = {
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: address,
        },
        expr2: {
          op: 'equals',
          expr1: 'App-Name',
          expr2: 'permamark',
        },
      }
      arweave.api.post(`arql`, query).then(async (response) => {
        let transactions = response.data

        if (transactions.length > 0) {
          Promise.all(
            transactions.map((txId) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const tx = await arweave.transactions.get(txId)
                  const owner = await arweave.wallets.ownerToAddress(tx.owner)
                  let timestamp = 0
                  tx.tags.forEach((tag: any) => {
                    let key = tag.get('name', {
                      decode: true,
                      string: true,
                    })
                    let value = tag.get('value', {
                      decode: true,
                      string: true,
                    })
                    if (key === 'Unix-Time') {
                      timestamp = Number(value)
                    }
                  })
                  resolve({
                    sender: owner,
                    data: tx.data,
                    timestamp,
                  })
                } catch (error) {
                  resolve(null)
                }
              })
            })
          )
            .then((results) => {
              setMarks(
                results
                  .filter((t) => t)
                  .map((t, idx) => {
                    return {
                      bm: JSON.parse(arweave.utils.bufferToString(t.data)),
                      txId: transactions[idx],
                      sender: t.sender,
                      timestamp: t.timestamp,
                    }
                  })
              )
              setIsLoadingMarks(false)
            })
            .catch(() => {
              setIsLoadingMarks(false)
            })
        } else {
        }
      })
    })
  }, [address])

  if (!address) {
    return {
      isLoading: false,
      marks: [],
    }
  }

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}
