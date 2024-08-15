'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { EthIcon, RsIcon, SwIcon } from "./svgs";
import { FormEvent } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatNumber } from "@/constants/utility";




export default function SwitchArea1() {
  const { token, isTheme, tokAmount, setTokAmount } = useGlobalContext()
  const { address, chainId } = useAccount()

  const {data: balance, isFetching } = useBalance({
    address: address,
    token: token.symbol === "ETH" ? undefined : token.address,
    chainId: 1,
  })


  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setTokAmount(value === '' ? 0 : Number(value));
};

  return (
    <Flex w="100%" direction="column">
        <Flex w="100%" justify="space-between">
            <Text fontWeight="600" fontSize="32px">{token?.symbol === "ETH" ? isTheme === 0 ? "Stake" : "Restake" : "Unstake"}</Text>
            <Flex align="center">
                <Flex w="35px" h="35px" mr="8px">{token?.symbol === "ETH" ? EthIcon : token?.symbol === "rswETH" ? RsIcon : SwIcon}</Flex>
                <Text fontWeight="600" fontSize="24px">{token?.symbol}</Text>
            </Flex>
        </Flex>

        <Flex mt="3" position="relative" w="100%" align="center">
            <input readOnly={chainId !== 1 ? true : false} type="number" className="input" value={(tokAmount !== 0 && tokAmount !== undefined) ? tokAmount : undefined} onInput={handleInputChange} style={{ color: (Number(tokAmount) > Number(balance?.formatted)) ? "rgb(195, 35, 35)" : isTheme === 0 ? "#fff" : "rgb(24, 13, 104)", padding: "4px 58px 5px 0px", borderBottom: isTheme === 0 ? "2px solid #fff" : "2px solid rgb(24, 13, 104)" }} />

            <Flex mt="-12px" zIndex="1" bg={isTheme === 0 ? "transparent" : "#fff"} position="absolute" right="0" padding="4px 10px" h="32px" fontSize="12px" cursor="pointer" justify="center" align="center" borderRadius="100px" fontWeight="600" border={isTheme === 0 ? "1px solid #fff" : "1px solid rgb(24, 13, 104)"} opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => (Number(balance?.formatted) && chainId === 1) ? setTokAmount(Number(balance?.formatted)) : setTokAmount(0.0)}>MAX</Flex>
        </Flex>

        {
          (Number(tokAmount) > Number(balance?.formatted)) ?
          <Text mt="2px" color="rgb(211, 47, 47)" fontSize="12px" letterSpacing="-0.03em">Insufficient balance</Text> 
          : 
          ((Number(tokAmount) <= Number(balance?.formatted)) && Number(tokAmount) > 0) ?
          <Text mt="2px" fontWeight="500" color="rgb(164, 171, 241)" fontSize="12px" letterSpacing="-0.03em">${formatNumber((Number(tokAmount) * Number(token.rate))?.toFixed(2))}</Text> 
          : 
          isTheme === 0 ? 
          <Text mt="2px" fontWeight="500" color="rgb(164, 171, 241)" fontSize="12px" letterSpacing="-0.03em">$0.00</Text>
          :
          <Text mt="2px" h="18px"></Text>
        }

        
    </Flex>
  )
}
