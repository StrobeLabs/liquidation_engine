import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'

const walletConnectProjectId = 'bruh'

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    walletConnectProjectId,
  })
)
