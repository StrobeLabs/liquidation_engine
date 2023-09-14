import { ConnectKitProvider } from 'connectkit'
// import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from "@/components/theme-provider"

export default App

import { App } from './App'
import { config } from './wagmi'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Theme>
          <App />
        </Theme>
        </ThemeProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  // </React.StrictMode>,
)
