import { addAction, removeKontextButtons } from './handler'

const twitterObserver = new MutationObserver(addAction)
const mutationConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true,
}

export function startTwitterIntegration() {
  const root = document.querySelector('#react-root')
  twitterObserver.observe(root, mutationConfig)
  addAction()
}

export function stopIntegration() {
  twitterObserver.disconnect()
  removeKontextButtons()
}
