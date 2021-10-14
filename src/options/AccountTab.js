/* eslint-disable no-undef */
import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Display4, Paragraph3 } from 'baseui/typography'
import { Copy } from 'react-feather'

export default function AccountTab({ address, marks }) {
  return (
    <Block
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="30px"
    >
      <Block
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        overrides={{
          Block: {
            style: {
              width: '800px',
              padding: '20px',
              border: '#222326 1px solid',
              margin: '10px',
              boxShadow: '8px 8px 0px 0px #222326',
            },
          },
        }}
      >
        <Display4>Address</Display4>
        <Paragraph3 display="flex" alignItems="center">
          {address}
          <Copy
            color="#999"
            style={{ marginLeft: 6, cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(address)
            }}
          />
        </Paragraph3>
      </Block>

      <Block
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        overrides={{
          Block: {
            style: {
              width: '800px',
              padding: '20px',
              border: '#222326 1px solid',
              margin: '10px',
              boxShadow: '8px 8px 0px 0px #222326',
            },
          },
        }}
      >
        <Display4>Marks</Display4>
        <Display4>{marks.length}</Display4>
      </Block>
      <Button
        onClick={() => {
          chrome.storage.local.set({ keyfile: '' }, () => {
            window.location.reload()
          })
        }}
      >
        Logout
      </Button>
    </Block>
  )
}
