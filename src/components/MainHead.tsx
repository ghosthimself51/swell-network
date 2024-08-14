'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { useAccount, useBalance } from "wagmi";



export default function MainHead() {
  const { isTheme, token } = useGlobalContext()
  const { isConnected, address, chainId } = useAccount()

  const {data: balance, isFetching } = useBalance({
    address: address,
    token: token.symbol === "ETH" ? undefined : token.address,
    chainId: 1,
  })

  return (
    <Flex w="100%" direction="column">
        <Flex w="100%" justify="space-between" align="center" pb="16px" mb="16px" borderBottom={isTheme === 0 ? "1px solid rgb(66, 69, 87)" : "1px solid rgb(24, 13, 104)"}>
            <Text fontSize="14px" letterSpacing="-0.03em" fontWeight="500">{isTheme === 0 ? "Stake" : "Restake"}</Text>
            {
                isTheme === 1 &&
                <Image src={"/egn.webp"} w="62px" />
            }
        </Flex>

        <Flex w="100%" mb="24px" mt="12px">
            <Flex justify="center" align="center" border={isTheme === 0 ? "1px solid rgb(176, 176, 176)" : "1px solid rgb(24, 13, 104)"} fontSize="12px" opacity={isConnected ? "1" : ".3"} fontWeight="500" h="32px" borderRadius="16px" px="12px">
              {
                (isConnected && chainId === 1) ? 
                  isFetching ? 
                  <><Flex animation="1.5s ease-in-out 0.5s infinite normal none running wAFEO" transform="translate3d(0px, 0px, 0px)" bg="rgb(41, 50, 73)" w="100px" borderRadius="4px" h="10px"></Flex></>
                  :
                  (Number(balance?.formatted)?.toFixed(4)+" "+token.symbol+" Available")
                : 
                "- Available"
              }
            </Flex>
        </Flex>
    </Flex>
  )
}
