import * as React from 'react'
import { Block } from 'baseui/block'
import { Link } from 'react-feather'
import { ellipsis } from '../Layout'
import dayjs from 'dayjs'
import TwitterLogo from '../source/twitter.svg'

export default function Tweet({ tree, reactOutput, mark }) {
  return (
    <Block
      className="mark tweet"
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
      <Block
        className="author"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {reactOutput(tree[0])}
        {reactOutput(tree[1])}
      </Block>
      <Block className="content">{reactOutput(tree.slice(2))}</Block>
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
        <a
          href={mark.origin}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ marginRight: 10 }}>Origin:</span>
          {/* <Twitter color="#002FA7" /> */}
          <img src={TwitterLogo} alt="twitter" height="30px" />
        </a>
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
