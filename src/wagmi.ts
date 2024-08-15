import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'


const app_name: string = "Swell"
const app_url: string = ""
const app_icon: string = "https:///example.com"
const app_description: string = ""

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    metaMask({
      dappMetadata: {
        url: app_url,
        name: app_name,
        iconUrl: app_icon,
      },
      extensionOnly: true,
    }),
    coinbaseWallet({
      appName: app_name,
      appLogoUrl: app_icon
    }),
    walletConnect({
      projectId: "2c07a9f5ac11ab827ba9599cdaf81ff3",
      relayUrl: 'wss://relay.walletconnect.org',
      metadata: {
        name: app_name,
        description: app_description,
        url: app_url,
        icons: [app_icon]
      },
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
