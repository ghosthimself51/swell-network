'use client';
import { Flex, Text, Image, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { LogoIcon, MenuIcon, ArrDownVar2, RsIcon, SwIcon, AvatIcon, CopyIcon, PowerIcon, ScanIcon, BoltIcon, ModCloseIcon } from "./svgs";
import { useState, useEffect, useRef } from "react";
import { useAccount, useDisconnect, useBalance, useSwitchChain } from "wagmi";
import { truncateAddress, formatNumber } from "@/constants/utility";
import { useRouter } from "next/navigation";
import { AddToken } from "./AddToken";


export default function Navbar() {
  const { isTheme, setIsTheme, setIsConnectorsModal } = useGlobalContext()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const { switchChain } = useSwitchChain()

  const {data: balance, isFetching } = useBalance({
    address: address,
    token: isTheme === 0 ? "0xf951E335afb289353dc249e82926178EaC7DEd78" : "0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0",
    chainId: 1,
  })

  const {data: balance2 } = useBalance({
    address: address,
    chainId: 1,
  })

  const links = ["Stake", "Restake"]
  const [curr, setCurr] = useState(0)
  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  
  const [isOpen2, setIsOpen2] = useState(false);
  const menuRef2 = useRef<HTMLDivElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);

  const [isOpen3, setIsOpen3] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleMenu3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleClickOutside2 = (event: MouseEvent) => {
    if (
      menuRef2.current &&
      !menuRef2.current.contains(event.target as Node) &&
      buttonRef2.current &&
      !buttonRef2.current.contains(event.target as Node)
    ) {
      setIsOpen2(false);
    }
  };

  useEffect(() => {
    if(chainId !== 1) {
      switchChain({ chainId: 1 })
    }
  }, [isConnected, chainId])

 
  

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen2) {
      document.addEventListener('mousedown', handleClickOutside2);
    } else {
      document.removeEventListener('mousedown', handleClickOutside2);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside2);
    };
  }, [isOpen2]);
  




  const { onToggle, isOpen: tOpen, onClose } = useDisclosure();


  
  return (
    <Flex pt={["36px", "0"]} pb={["8px", "0"]} w="100%" h={[!isConnected ? "130px" : "184px", "120px"]} align="center" px={["16px", "36px"]} justify="space-between" direction={["column", "row"]}>
        {
          isOpen2 &&
          <Flex zIndex="3" display={["flex", "none"]} backdropFilter="blur(10.5px)" onClick={() => setIsOpen2(false)} bg="rgba(11,20,27,0.7)" position="fixed" w="100%" h="100%" top="0" left="0"></Flex>
        }
        <Flex align="center" w={["100%", "auto"]} justify="space-between" px={["20px", "0"]}>
          <Flex align="center" cursor="pointer" onClick={() => window.scrollTo(0,0)}>
              <Flex w="51px" h="51px">
                  {LogoIcon}
              </Flex>
              <Text fontSize="27.39px" fontWeight="600" ml="3">Swell</Text>
          </Flex>

          <Flex zIndex="2" position="relative" display={["flex", "none"]}>
                <Flex ml={["0px", "16px"]} w="40px" h="40px" cursor="pointer" color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} _hover={{ color: "rgba(24, 13, 104, 0.7)" }} transition="200ms ease-in-out" as="button" onClick={toggleMenu3}>{MenuIcon}</Flex>
              
                <Flex className={`sidebar ${isOpen3 ? "open" : ""}`} direction="column" padding="16px" position="fixed" top="0" left="0" w="100%" h="100%" bg={isTheme === 0 ? "#000" : "rgb(236, 242, 254)"} transition="200ms ease-in-out">

                  <Flex w="100%" justify="space-between" mb="20px" align="center">
                    <Flex align="center" cursor="pointer" onClick={toggleMenu3}>
                        <Flex w="51px" h="51px">
                            {LogoIcon}
                        </Flex>
                        <Text fontSize="27.39px" fontWeight="600" ml="3">Swell</Text>
                    </Flex>

                    <Flex cursor="pointer" w="24px" h="24px" onClick={toggleMenu3}>{ModCloseIcon}</Flex>
                  </Flex>

                  <Flex direction="column">
                    {
                        ["Docs", "Forum", "GitHub", "Add swETH", "Add rswETH", "Purchase ETH"].map((item, index) => (
                            <Flex key={index} cursor="pointer" fontWeight="600" padding="4px 24px" opacity={1} _hover={{ opacity: .7 }} fontSize="32px" transition="200ms ease-in-out" onClick={() => {
                              toggleMenu3()
                              if(index === 0) {
                                window.open("https://docs/", "_BLANK")
                              }
                              else if(index === 1) {
                                window.open("https://forum/", "_BLANK")
                              }
                              else if(index === 2) {
                                window.open("https://github.com/SwellNetwork", "_BLANK")
                              }
                              else if(index === 3) {
                                AddToken("0xf951E335afb289353dc249e82926178EaC7DEd78", "swETH", 18, "https://s2.coinmarketcap.com/static/img/coins/64x64/25147.png")
                              }
                              else if(index === 4) {
                                AddToken("0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0", "rswETH", 18, "https://s2.coinmarketcap.com/static/img/coins/64x64/29974.png")
                              }
                              else {
                                window.open("https://purchase/", "_BLANK")
                              }
                            }}>{item}</Flex>
                        ))
                    }
                  </Flex>
                </Flex>
            </Flex>

        </Flex>

        <Flex w={["100%", "auto"]} zIndex="1" flex="1" pr={["16px", "0"]} pl={["16px", "93px"]} align="center" position={["fixed", "relative"]} bottom="0" left="0" bg={[isTheme === 0 ? "#000" : "#fff", "transparent"]} h={["60px", "auto"]} justify={["space-between", "flex-start"]} fontSize={["0.875rem", "1rem"]}>
            {
                links.map((item, index) => (
                    <Flex align="center" direction="column" mr={["0", "16px"]} key={index} cursor="pointer" color={isTheme === 0 ? index === isTheme ? "#fff" : "rgb(146, 146, 146)" : index === isTheme ? "rgb(24, 13, 104)" : "rgba(24, 13, 104, 0.5)"} fontWeight={["400", "600"]} _hover={{ color: isTheme === 0 ? "rgba(176, 176, 176, .8)" : "rgba(24, 13, 104, 0.7)" }} transition="200ms ease-in-out" onClick={() => {
                        setIsTheme(index)
                        router.push(index === 0 ? "/stake" : "/")
                    }}>
                      <Flex display={["flex", "none"]} align="center">
                        <Flex w="24px" h="24px">{BoltIcon}</Flex>
                        {index === 1 && <Flex ml="-12px" w="24px" h="24px">{BoltIcon}</Flex>}
                      </Flex>
                      {item}
                    </Flex>
                ))
            }
        </Flex>

        <Flex align="center">
            {
              isConnected ?
              <Flex align="center">

                <Flex mr="8px" padding="12px 18px 12px 12px" borderRadius="40px" border={isTheme === 0 ? "1px solid rgb(11, 20, 27)" : "1px solid rgb(24, 13, 104)"} align="center" justify="center" h="54px" bg={isTheme === 0 ? "rgb(11, 20, 27)" : "transparent"} color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} cursor={(isConnected && chainId !== 1) ? "pointer" : "auto"} fontWeight="500" onClick={() => chainId !== 1 && switchChain({ chainId: 1 })}>
                  {
                    chainId !== 1 ?
                    <Flex align="center">Switch <Text display={["none", "block"]}>Network</Text> <Flex ml="2" w="8px" h="4px">{ArrDownVar2}</Flex></Flex>
                    :
                    <>
                      <Flex w="32px" h="32px">{isTheme === 0 ? SwIcon : RsIcon}</Flex>
                      <Text ml="12px">
                        {
                          isFetching ? 
                          <><Flex animation="1.5s ease-in-out 0.5s infinite normal none running wAFEO" transform="translate3d(0px, 0px, 0px)" bg="rgb(41, 50, 73)" w={["60px", "100px"]} borderRadius="4px" h="10px"></Flex></> : (Number(balance?.formatted)?.toFixed(2))+" "+(isTheme === 0 ? "swETH" : "rswETH")
                        }</Text>
                      </>
                  }
                </Flex>

                <Flex position="relative">
                  <Flex opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" padding="12px 24px" borderRadius="40px" border={isTheme === 0 ? "1px solid rgb(11, 20, 27)" : "1px solid rgb(24, 13, 104)"} align="center" justify="center" h="54px" bg={isTheme === 0 ? "rgb(11, 20, 27)" : "transparent"} color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} cursor="pointer" fontWeight="500" as="button" ref={buttonRef2} onClick={toggleMenu2}>
                    <Flex w="4px" h="4px" borderRadius="100%" bg="#1AFF4B"></Flex>
                    <Text mx="12px">{truncateAddress(address as `0x${string}`, 6, 4)}</Text>
                    <Flex w="8px" h="4px">{ArrDownVar2}</Flex>
                  </Flex>

                  <Flex ref={menuRef2} className={`menu ${isOpen2 ? "zoomIn" : "zoomOut"}`} zIndex="4" w={["90%", "288px"]} position={["fixed", "absolute"]} bg={isTheme === 0 ? "rgb(11, 20, 27)" : "#fff"} boxShadow="rgba(0, 0, 0, 0.25) 0px 4px 4px" padding="24px 32px" borderRadius="16px" border="1px solid rgb(66, 69, 87)" minH="96px" direction="column" ml={["5%", "-85px"]} mt={["-50%", "65px"]} fontWeight="500" left="0" top={["50%", "0"]}>

                    <Flex justify="space-between" align="center" borderBottom="1px solid rgb(227, 227, 227)" pb=".5em" mb=".5em">
                      <Flex w="56px" h="56px" mr="24px" borderRadius="100%" overflow="hidden" bg="rgb(200, 20, 50)">{AvatIcon}</Flex>

                      <Flex flex="1" direction="column">
                        <Flex align="center">
                          <Text fontWeight="500">{truncateAddress(address as `0x${string}`, 6, 4)}</Text>
                          
                          <Tooltip hasArrow borderRadius="5px" label="Copied!" fontSize="10px" closeDelay={500} isOpen={tOpen}>
                            <Flex ml="12px" w="22px" h="22px" cursor="pointer" onClick={() => {
                              onToggle()
                              setTimeout(function() {
                                  onClose()
                              }, 1500)
                              navigator.clipboard.writeText(address as `0x${string}`)
                          }}>{CopyIcon}</Flex>
                          </Tooltip>
                        </Flex>

                        <Flex align="center" mt="1">
                          <Text fontSize="14px" mr="12px">Ethereum</Text>
                           <Tooltip hasArrow borderRadius="5px" label="Etherscan" fontSize="10px">
                            <Flex w="22px" h="22px" cursor="pointer" onClick={() => {
                              window.open("https://etherscan.io/address/"+address, "_BLANK")
                            }}>{ScanIcon}</Flex>
                          </Tooltip>

                          <Tooltip hasArrow borderRadius="5px" label="Disconnect" fontSize="10px">
                            <Flex w="22px" h="22px" cursor="pointer" onClick={() => {
                              setIsOpen2(false)
                              disconnect()
                            }}>{PowerIcon}</Flex>
                          </Tooltip>
                        </Flex>
                      </Flex>
                    </Flex>


                    <Flex w="100%" direction="column" align="center" borderBottom="1px solid rgb(227, 227, 227)" pb=".8em" mb=".8em">
                      <Text textAlign="center" fontSize="14px">ETH Balance</Text>
                      <Text textAlign="center" fontWeight="600" fontSize="24px">{Number(balance2?.formatted)?.toFixed(4)} ETH</Text>
                      <Text textAlign="center" color="rgb(164, 171, 241)" letterSpacing="-0.03em">${formatNumber((Number(balance2?.formatted) * 2650.44)?.toFixed(2))} USD</Text>
                    </Flex>

                    <Flex w="100%" direction="column" align="center">
                      <Text textAlign="center" fontSize="14px">{isTheme === 0 ? "swETH" : "rswETH"} Balance</Text>
                      <Text textAlign="center" fontWeight="600" fontSize="24px">{Number(balance?.formatted)?.toFixed(2)} {isTheme === 0 ? "swETH" : "rswETH"}</Text>

                      <Flex align="center" justify="center" w="100%" mt="1">
                        <Text mr="24px" textAlign="center" color="rgb(164, 171, 241)" letterSpacing="-0.03em">{curr === 0 && "$"}{curr === 0 ? formatNumber((Number(balance?.formatted) * (isTheme === 0 ? 2813.06 : 2678.08))?.toFixed(2)) : (Number(balance?.formatted) * (isTheme === 0 ? 0.9366 : 0.9897))?.toFixed(2)} {curr === 1 && "ETH"}</Text>

                        <Flex border="1px solid rgb(164, 171, 241)" borderRadius="16px">
                          <Flex opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" padding="8px 12px" fontSize="12px" cursor="pointer" borderRadius="16px 0px 0px 16px" bg={curr === 0 ? "rgb(164, 171, 241)" : isTheme === 0 ? "transparent" : "#fff"} color={curr === 0 ? "#fff" : "rgb(164, 171, 241)"} onClick={() => setCurr(0)}>USD</Flex>
                          
                          <Flex opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" padding="8px 12px" fontSize="12px" cursor="pointer" borderRadius="0px 16px 16px 0px" bg={curr === 1 ? "rgb(164, 171, 241)" : isTheme === 0 ? "transparent" : "#fff"} color={curr === 1 ? "#fff" : "rgb(164, 171, 241)"} onClick={() => setCurr(1)}>ETH</Flex>
                        </Flex>
                      </Flex>

                      <Text fontSize="14px" mt="2">{curr === 0 ? ("1 "+(isTheme === 0 ? "swETH" : "rswETH")+" = "+(isTheme === 0 ? "2,813.06" : "2,678.08")+" USD") : "1 ETH = "+(isTheme === 0 ? "0.9366 " : "0.9897 ")+(isTheme === 0 ? "swETH" : "rswETH")}</Text>
                    </Flex>


                  </Flex>
                </Flex>

              </Flex>
              :
              <Flex display={["none", "flex"]} cursor="pointer" px="32.5px" h="42px" fontWeight="600" borderRadius="8px" bg={isTheme === 0 ? "rgb(47, 67, 236)" : "rgb(255, 188, 1)"} align="center" justify="center" color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => setIsConnectorsModal(true)}>Connect wallet</Flex>
            }

            <Flex position="relative" display={["none", "flex"]}>
                <Flex ml={["0px", "16px"]} w="40px" h="40px" cursor="pointer" color={isTheme === 0 ? "rgb(255, 255, 255)" : "rgb(24, 13, 104)"} _hover={{ color:isTheme === 0 ? "rgba(255,255, 255, .7)" : "rgba(24, 13, 104, 0.7)" }} transition="200ms ease-in-out" as="button" ref={buttonRef} onClick={toggleMenu}>{MenuIcon}</Flex>
              
                <Flex ref={menuRef} className={`menu ${isOpen ? "zoomIn" : "zoomOut"}`} w="182px" position="absolute" boxShadow="rgba(0, 0, 0, 0.25) 0px 4px 4px" padding="14px 16px" borderRadius="16px" border="1px solid rgb(66, 69, 87)" minH="96px" direction="column" ml="-109px" mt="55px" bg={isTheme === 0 ? "rgb(11, 20, 27)" : "#fff"}>
                    {
                        ["Documentation", "Forum", "GitHub", "Add swETH", "Add rswETH", "Purchase ETH"].map((item, index) => (
                            <Flex key={index} cursor="pointer" padding="6px 16px" opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" onClick={() => {
                              if(index === 0) {
                                window.open("https://docs/", "_BLANK")
                              }
                              else if(index === 1) {
                                window.open("https://forum/", "_BLANK")
                              }
                              else if(index === 2) {
                                window.open("https://github.com/SwellNetwork", "_BLANK")
                              }
                              else if(index === 3) {
                                AddToken("0xf951E335afb289353dc249e82926178EaC7DEd78", "swETH", 18, "https://s2.coinmarketcap.com/static/img/coins/64x64/25147.png")
                              }
                              else if(index === 4) {
                                AddToken("0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0", "rswETH", 18, "https://s2.coinmarketcap.com/static/img/coins/64x64/29974.png")
                              }
                              else {
                                window.open("https://purchase/", "_BLANK")
                              }
                            }}>{item}</Flex>
                        ))
                    }
                </Flex>
            </Flex>
        </Flex>
    </Flex>
  )
}
