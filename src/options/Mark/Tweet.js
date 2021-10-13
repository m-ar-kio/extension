import { Block } from 'baseui/block'

export default function Tweet({ tree, parsedURL, reactOutput }) {
  return (
    <Block
      className="mark tweet"
      width="800px"
      $style={{ padding: '20px', borderBottom: '3px solid #e3e3e3' }}
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
    </Block>
  )
}
