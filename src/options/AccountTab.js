import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { Display4, Paragraph3 } from 'baseui/typography'

export default function AccountTab({ address, marks }) {
  return (
    <Block
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="30px"
    >
      <Display4>Address</Display4>
      <Paragraph3>{address}</Paragraph3>

      <Display4>Marks</Display4>
      <Paragraph3>{marks.length}</Paragraph3>
      <Button>Logout</Button>
    </Block>
  )
}
