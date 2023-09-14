import { ConnectKitProvider } from 'connectkit'
// import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from "../src/components/theme-provider";

export default Dash

import { Dash } from '../src/Dash'
import { config } from '../src/wagmi'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Theme>
          <Dash />
        </Theme>
        </ThemeProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  // </React.StrictMode>,
)
