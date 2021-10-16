import { selectWeightedPstHolder, readContract } from 'smartweave'
import Arweave from 'arweave/web'
import { MARK_CONTRACT } from './constants'

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})
export const getPSTAllocation = async () => {
  return readContract(arweave, MARK_CONTRACT).then((contractState) => {
    const holders = selectWeightedPstHolder(contractState.balances)
    return holders
  })
}
