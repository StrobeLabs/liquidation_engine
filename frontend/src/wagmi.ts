import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'
import { sepolia } from 'viem/chains';

const walletConnectProjectId = ''

const chains = [sepolia];

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: '!dydx',
    walletConnectProjectId,
    chains
  })
)
