'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { EthIcon, RsIcon, SwIcon } from "./svgs";
import { formatNumber } from "@/constants/utility";




export default function SwitchArea2() {
  const { token2, isTheme, token, tokAmount } = useGlobalContext()

  return (
    <Flex w="100%" direction="column">
        <Flex w="100%" justify="space-between">
            <Text fontWeight="600" fontSize="32px">Receive</Text>
            <Flex align="center">
                <Flex w="35px" h="35px" mr="8px">{token2?.symbol === "ETH" ? EthIcon : token2?.symbol === "rswETH" ? RsIcon : SwIcon}</Flex>
                <Text fontWeight="600" fontSize="24px">{token2?.symbol}</Text>
            </Flex>
        </Flex>

        <Flex mt="3" position="relative" w="100%" align="center">
          <input type="number" readOnly style={{ cursor: "auto", color: isTheme === 0 ? "#fff" : "rgb(24, 13, 104)", padding: "4px 0px 5px 0px", borderBottom: isTheme === 0 ? "2px solid #fff" : "2px solid rgb(24, 13, 104)" }} value={(tokAmount === 0) ? '' : Number((token.rate * tokAmount) / token2.rate)} />
        </Flex>

        {
          (Number(tokAmount) > 0) ?
          <Text mt="2px" fontWeight="500" color="rgb(164, 171, 241)" fontSize="12px" mb={["4", "0"]} letterSpacing="-0.03em">${formatNumber((Number(tokAmount) * Number(token.rate))?.toFixed(2))}</Text> 
          :
          isTheme === 0 ? 
          <Text mt="2px" fontWeight="500" color="rgb(164, 171, 241)" fontSize="12px" letterSpacing="-0.03em">$0.00</Text>
          :
          <Text mt="2px" h="18px"></Text>
        }
    </Flex>
  )
}
