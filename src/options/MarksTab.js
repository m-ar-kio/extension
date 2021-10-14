import { Block } from 'baseui/block'
import { StyledSpinnerNext } from 'baseui/spinner'
import Mark from './Mark'

export default function MarksTab({ marks, isLoading }) {
  return (
    <Block
      padding="30px"
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading && <StyledSpinnerNext />}
      {marks.map((m) => {
        return (
          <Mark
            key={m.txId}
            mark={{
              ...m.bm,
              txId: m.txId,
              sender: m.sender,
              timestamp: m.timestamp,
            }}
          />
        )
      })}
    </Block>
  )
}
