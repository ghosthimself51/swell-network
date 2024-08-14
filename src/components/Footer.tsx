'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { BlankIocn, GweiIcon } from "./svgs";



export default function Footer() {
  const { isTheme } = useGlobalContext()

  return (
    <Flex w="100%" justify="space-between" opacity=".5" padding={["20px 10px 74px 10px", "0px 10px 10px 10px"]} align={["flex-start", "center"]} fontWeight="500" fontSize="12px" direction={["column", "row"]} color={isTheme === 0 ? "rgb(164, 171, 241)" : "rgb(24, 13, 104)"}>
        <Flex align={["flex-start", "center"]} direction={["column", "row"]}>
          <Flex align="center" cursor="pointer" mr="4" _hover={{ color: "rgb(98, 126, 234)" }} onClick={() => {
            window.open(isTheme === 0 ? "https://etherscan.io/address/0xf951E335afb289353dc249e82926178EaC7DEd78" : "https://etherscan.io/address/0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0", "_BLANK")
          }}>
            <Text mr="12px">{isTheme === 0 ? "swETH contract v1.0" : "rswETH contract v1.0"}</Text>
            <Flex w="9px" h="9px">{BlankIocn}</Flex>
          </Flex>

          <Flex my={["3px", "0"]} align="center" cursor="pointer" _hover={{ color: "rgb(98, 126, 234)" }} transition="200ms ease-in-out" onClick={() => {
            window.open(isTheme === 0 ? "https://etherscan.io/address/0xb3D9cf8E163bbc840195a97E81F8A34E295B8f39" : "https://etherscan.io/address/0x5e6342D8090665bE14eeB8154c8a87B7249a4889", "_BLANK")
          }}>
            <Text mr="12px">{isTheme === 0 ? "Deposit manager contract v1.0" : "rswETH deposit manager contract v1.0"}</Text>
            <Flex w="9px" h="9px">{BlankIocn}</Flex>
          </Flex>
        </Flex>

        <Flex align="center">
          <Flex align="center" cursor="pointer" _hover={{ color: "rgb(98, 126, 234)" }} transition="200ms ease-in-out" ml={["-4.5px", "0"]} onClick={() => {
            window.open("https://etherscan.io/gastracker", "_BLANK")
          }}>
            <Flex w="24px" h="19px">{GweiIcon}</Flex>
            <Text ml="2px">{isTheme === 0 ? "2 gwei" : "2 gwei"}</Text>
          </Flex>
        </Flex>
    </Flex>
  )
}
