import { Client } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

export const ellipsis = (str, lead, tail) => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length
    )}`
  }
  return str
}

const engine = new Client()

export default function Layout({ children }) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>{children}</BaseProvider>
    </StyletronProvider>
  )
}
