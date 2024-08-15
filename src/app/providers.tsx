'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/wagmi'
import TokenJson from '../constants/token.json'
import { Dispatch, SetStateAction, createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import StopPlaying from '../../stopplaying'
import { usePathname } from 'next/navigation'


export type TokenType = {
    symbol: string;
    name: string;
    address?: string;
    imageUrl: string;
    rate: number;
    chainId?: number;
    hot?: boolean;
} | any


const GlobalContext = createContext<{
    isWalletModal: boolean,
    setIsWalletModal: Dispatch<SetStateAction<boolean>>,

    isChainModal: boolean,
    setIsChainModal: Dispatch<SetStateAction<boolean>>,

    isConnectorsModal: boolean,
    setIsConnectorsModal: Dispatch<SetStateAction<boolean>>,

    isSettingsModal: boolean,
    setIsSettingsModal: Dispatch<SetStateAction<boolean>>,

    token: TokenType,
    setToken: Dispatch<SetStateAction<TokenType>>,

    token2: TokenType,
    setToken2: Dispatch<SetStateAction<TokenType>>,

    network: string,
    setNetwork: Dispatch<SetStateAction<string>>,

    network2: string,
    setNetwork2: Dispatch<SetStateAction<string>>,

    isDisabled: boolean,
    setIsDisabled: Dispatch<SetStateAction<boolean>>,

    tokAmount: number,
    setTokAmount: Dispatch<SetStateAction<number>>,

    tokAddress: string,
    setTokAddress: Dispatch<SetStateAction<string>>,

    slippage: number,
    setSlippage: Dispatch<SetStateAction<number>>,

    isTheme: number,
    setIsTheme: Dispatch<SetStateAction<number>>,
  }>({
    isWalletModal: false,
    setIsWalletModal: () => { },
    isChainModal: false,
    setIsChainModal: () => { },
    isSettingsModal: false,
    setIsSettingsModal: () => { },
    isConnectorsModal: false,
    setIsConnectorsModal: () => { },
    token: {
      symbol: "",
      name: "",
      address: "",
      imageUrl: "",
      rate: 0,
      chainId: 0,
      hot: true,
    },
    token2: {
      symbol: "",
      name: "",
      address: "",
      imageUrl: "",
      rate: 0,
      chainId: 0,
    },
    setToken: () => {},
    setToken2: () => {},
    network: "",
    setNetwork: () => {},
    network2: "",
    setNetwork2: () => {},
    isDisabled: false,
    setIsDisabled: () => {},
    tokAmount: 0,
    setTokAmount: () => {},
    tokAddress: "",
    setTokAddress: () => {},
    slippage: 0,
    setSlippage: () => {},
    isTheme: 1,
    setIsTheme: () => {},
})
  

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [isWalletModal, setIsWalletModal] = useState<boolean>(false)
  const [isSettingsModal, setIsSettingsModal] = useState<boolean>(false)
  const [isChainModal, setIsChainModal] = useState<boolean>(false)
  const [isConnectorsModal, setIsConnectorsModal] = useState<boolean>(false)
  const [token, setToken] = useState<TokenType>([])
  const [token2, setToken2] = useState<TokenType>([])
  const [network, setNetwork] = useState<string>("Mainnet")
  const [network2, setNetwork2] = useState<string>("Mainnet")
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [tokAmount, setTokAmount] = useState<number>(0)
  const [tokAddress, setTokAddress] = useState<string>("")
  const [slippage, setSlippage] = useState<number>(0)
  const [isTheme, setIsTheme] = useState<number>(1)
  


  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  useEffect(() => {
    if(pathname === "/stake") {
      setIsTheme(0)
      setToken(TokenJson?.[0])
      setToken2(TokenJson?.[2])
    }
    else {
      setIsTheme(1)
      setToken(TokenJson?.[0])
      setToken2(TokenJson?.[1])
    }
  }, [pathname]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider
            value={{
                isWalletModal,
                setIsWalletModal,
                isChainModal,
                setIsChainModal,
                isSettingsModal,
                setIsSettingsModal,
                isConnectorsModal,
                setIsConnectorsModal,
                token,
                setToken,
                token2,
                setToken2,
                network,
                setNetwork,
                network2,
                setNetwork2,
                isDisabled,
                setIsDisabled,
                tokAmount,
                setTokAmount,
                tokAddress,
                setTokAddress,
                slippage,
                setSlippage,
                isTheme,
                setIsTheme,
            }}
        >
            <ChakraProvider>
              {children}
            </ChakraProvider>
        </GlobalContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}


export const useGlobalContext = () => useContext(GlobalContext);