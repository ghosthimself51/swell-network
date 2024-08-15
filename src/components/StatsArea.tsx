'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { ArrDownVar, ReIcon } from "./svgs";
import { useState } from "react";



export default function StatsArea() {
  const { isTheme } = useGlobalContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Flex w="100%" direction="column" mt={["14px", "24px"]} fontSize="12px">
        <Flex w="100%" justify="center">
            <Flex cursor="pointer" align="center" h="46px" justify="center" fontSize="14px" fontWeight="500" letterSpacing="-0.03em" opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
                Swell statistics 

                <Flex transition="300ms ease-in-out" ml="5px" w="8px" h="4px" transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}>{ArrDownVar}</Flex>
            </Flex>
        </Flex>

        {isOpen && <Flex w="100%" direction="column" className="tlpAnm" fontWeight="500">
            <Flex w="100%" justify="space-between" align="center" mb="4px">
                <Flex align="center">
                    <Text fontWeight="600">Commission rate</Text>
                </Flex>
                <Text>10%</Text>
            </Flex> 

            <Flex w="100%" justify="space-between" align="center" mb="4px">
                <Flex align="center">
                    <Text fontWeight="600">Total ETH restaked</Text>
                </Flex>
                <Text>{isTheme === 0 ? "146,600" : "114,484"} ETH</Text>
            </Flex> 

            <Flex w="100%" justify="space-between" align="center" mb="4px">
                <Flex align="center">
                    <Text fontWeight="600">{isTheme === 0 ? "Stakers" : "Restakers"}</Text>
                </Flex>
                <Text>{isTheme === 0 ? "128706" : "37394"}</Text>
            </Flex> 

            <Flex w="100%" justify="space-between" align="center" mb="4px">
                <Flex align="center">
                    <Text fontWeight="600">{isTheme === 0 ? "swETH" : "rswETH"} market cap</Text>
                </Flex>
                <Text>${isTheme === 0 ? "401,860,310.15" : "303,374,159.58"} USD</Text>
            </Flex> 

            <Flex w="100%" justify="center" mt="12px">
                <Flex cursor="pointer" align="center" h="46px" justify="center" fontSize="14px" fontWeight="500" opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => window.location.reload()}>
                    Restaking pool activity

                    <Flex transition="300ms ease-in-out" ml="5px" w="12px" h="12px">{ReIcon}</Flex>
                </Flex>
            </Flex>
        </Flex>}

        
    </Flex>
  )
}
