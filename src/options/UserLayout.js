import { useState, useEffect } from 'react'
import { Navigation } from 'baseui/side-navigation'
import { Block } from 'baseui/block'
import Arweave from 'arweave/web'
import AccountTab from './AccountTab'
import MarksTab from './MarksTab'

export default function UserLayout({ address, keyfile }) {
  const [activeItemId, setActiveItemId] = useState('#account')
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    if (!address) {
      return
    }
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    })
    let query = {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'App-Version',
        expr2: '0.0.1',
      },
      expr2: {
        op: 'equals',
        expr1: 'App-Name',
        expr2: 'permamark',
      },
    }

    // Perform query to find permamail tagged emails
    arweave.api.post(`arql`, query).then(async (response) => {
      let transactions = response.data

      if (transactions.length > 0) {
        Promise.all(
          transactions.map((tx) => {
            return arweave.transactions.get(tx).then(async (tx) => tx.data)
          })
        )
          .then((results) => {
            setIsLoadingMarks(false)
            setMarks(
              results.map((t, idx) => {
                return {
                  bm: JSON.parse(arweave.utils.bufferToString(t)),
                  txId: transactions[idx],
                }
              })
            )
          })
          .catch(() => {
            setIsLoadingMarks(false)
          })
      } else {
        setIsLoadingMarks(false)
      }
    })
  }, [address])

  return (
    <Block display="flex" flexDirection="row" height="100%">
      <Navigation
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: '250px',
              height: '100%',
              borderRight: '1px solid #e3e3e3',
            }),
          },
          NavItemContainer: {
            style: ({ $theme }) => ({
              height: '100%',
            }),
          },
        }}
        items={[
          {
            title: 'Account',
            itemId: '#account',
          },
          {
            title: 'Marks',
            itemId: '#marks',
          },
        ]}
        activeItemId={activeItemId}
        onChange={({ item }) => setActiveItemId(item.itemId)}
      />
      <Block flex={1} width={`calc(100vw - 250px)`} overflow="scrollY">
        {activeItemId === '#account' && (
          <AccountTab address={address} marks={marks} />
        )}
        {activeItemId === '#marks' && (
          <MarksTab marks={marks} isLoading={isLoadingMarks} />
        )}
      </Block>
    </Block>
  )
}
