'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { useAccount, useBalance, useSwitchChain } from "wagmi";



export default function BtnArea() {
  const { isTheme, token, setIsConnectorsModal, tokAmount } = useGlobalContext()
  const { isConnected, address, chainId } = useAccount()
  const { switchChain } = useSwitchChain()

  const {data: balance } = useBalance({
    address: address,
    token: token.symbol === "ETH" ? undefined : token.address,
    chainId: 1,
  })

  return (
    <Flex w="100%">
        <Flex w="100%" cursor={(!isConnected) ? "pointer" : (isConnected && chainId !== 1) ? "pointer" : (isConnected && ((Number(tokAmount) !== 0) && (Number(tokAmount) <= Number(balance?.formatted)))) ? "pointer" : "not-allowed"} px="32.5px" h="54px" fontWeight="600" borderRadius="8px" bg={isTheme === 0 ? "rgb(47, 67, 236)" : "rgb(255, 188, 1)"} align="center" justify="center" color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} opacity={(!isConnected) ? "1" : (isConnected && chainId !== 1) ? "1" : (isConnected && ((Number(tokAmount) !== 0) && (Number(tokAmount) <= Number(balance?.formatted)))) ? "1" : ".6"} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => {
          if(!isConnected) {
            setIsConnectorsModal(true)
          }
          else if(isConnected && chainId !== 1) {
            switchChain({ chainId: 1 })
          }
          else if(isConnected && ((Number(tokAmount) !== 0) && (Number(tokAmount) <= Number(balance?.formatted)))) {
            return null
          }
        }}>
          {isConnected ? chainId !== 1 ? "Switch to Ethereum Mainnet " : token.symbol === "ETH" ? isTheme === 0 ? "Stake" : "Restake" : isTheme === 0 ? "Request unstake" : "Unstake" : "Connect wallet"}
        </Flex>
    </Flex>
  )
}
