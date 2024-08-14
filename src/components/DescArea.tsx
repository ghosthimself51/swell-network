'use client';
import { Flex, Text, Image, Tooltip } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { InfoIcon } from "./svgs";



export default function DescArea() {
  const { isTheme, token2, token } = useGlobalContext()

  return (
    <Flex w="100%" mt={[isTheme === 0 ? "4" : "0", "24px"]} borderTop={isTheme === 0 ? "1px solid rgb(66, 69, 87)" : "1px solid rgb(227, 227, 227)"} pt="12px" direction="column" fontSize="12px" mb="24px" fontWeight="500">

        <Flex w="100%" justify="space-between" align="center" mb="4px">
            <Flex align="center">
                <Text mr="4px" fontWeight="600">{isTheme === 0 ? "swETH" : "rswETH"} APR</Text>
                <Tooltip hasArrow borderRadius="5px" label="Total pool 7 day moving average" fontSize="10px"><Flex w="13px" h="13px" color="rgb(176, 176, 176)">{InfoIcon}</Flex></Tooltip>
            </Flex>
            <Text>{isTheme === 0 ? "4.08" : "6.39"}%</Text>
        </Flex> 

        <Flex w="100%" justify="space-between" align="center" mb="4px">
            <Flex align="center">
                <Text mr="4px" fontWeight="600">Exchange rate</Text>
                <Tooltip hasArrow borderRadius="5px" label={isTheme === 0 ? "Represents the accruing value of swETH vs ETH" : "Represents the accruing value of rswETH vs ETH"} fontSize="10px"><Flex w="13px" h="13px" color="rgb(176, 176, 176)">{InfoIcon}</Flex></Tooltip>
            </Flex>
            <Text>1 {isTheme === 0 ? "swETH" : "rswETH"} = {isTheme === 0 ? "1.0676" : "1.0104"} ETH</Text>
        </Flex> 

        <Flex w="100%" justify="space-between" align="center" mb="4px">
            <Flex align="center">
                <Text fontWeight="600">Transaction fee</Text>
            </Flex>
            <Text>${token.symbol === "rswETH" ? "2.10" : "0.79"} USD</Text>
        </Flex> 

        {
            token2?.symbol === "ETH" &&
            <Flex w="100%" justify="space-between" align="center" mb="4px">
                <Flex align="center">
                    <Text mr="4px" fontWeight="600">Processing time</Text>
                    <Tooltip hasArrow borderRadius="5px" label="Visit docs for more info" fontSize="10px"><Flex w="13px" h="13px" color="rgb(176, 176, 176)">{InfoIcon}</Flex></Tooltip>
                </Flex>
                <Text>~12 days</Text>
            </Flex>
        }
    </Flex>
  )
}
