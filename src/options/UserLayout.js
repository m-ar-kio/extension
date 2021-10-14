import { useState } from 'react'
import { Navigation } from 'baseui/side-navigation'
import { Block } from 'baseui/block'
import AccountTab from './AccountTab'
import MarksTab from './MarksTab'
import { useMyMarks } from './hook'

export default function UserLayout({ address, keyfile }) {
  const [activeItemId, setActiveItemId] = useState('#account')
  const { isLoading, marks } = useMyMarks(address)

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
          <MarksTab marks={marks} isLoading={isLoading} />
        )}
      </Block>
    </Block>
  )
}
