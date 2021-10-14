import * as React from 'react'
import { Block } from 'baseui/block'
import { Link } from 'react-feather'
import { ellipsis } from '../Layout'
import dayjs from 'dayjs'
import Source from './Source'

export default function Article({ tree, reactOutput, mark, parsedURL }) {
  return (
    <Block
      className="mark article"
      width="800px"
      overrides={{
        Block: {
          style: {
            padding: '20px',
            border: '#222326 1px solid',
            margin: '10px',
            boxShadow: '8px 8px 0px 0px #222326',
          },
        },
      }}
    >
      <Block className="content">{reactOutput(tree)}</Block>
      <Block
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        overrides={{
          Block: {
            style: {
              paddingTop: '15px',
              borderTop: '#222326 1px solid',
              marginTop: '15px',
            },
          },
        }}
      >
        <Source parsedURL={parsedURL} />
        <a
          href={`https://viewblock.io/arweave/tx/${mark.txId}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ marginRight: 10 }}>HASH:</span>
          <Link color="#002FA7" />
        </a>
        <a
          href={`https://viewblock.io/arweave/address/${mark.sender}`}
          target="_blank"
          rel="noreferrer"
        >
          <span style={{ marginRight: 10 }}>Marker:</span>
          <span>{ellipsis(mark.sender, 5, 6)}</span>
        </a>
        <span style={{ marginRight: 20 }}>{`Created at: ${dayjs(
          mark.timestamp * 1000
        ).format('YYYY-MM-DD HH:MM')}`}</span>
      </Block>
    </Block>
  )
}
