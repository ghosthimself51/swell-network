'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useGlobalContext } from "@/app/providers";
import { LogoIconLight, InfoIcon2, ModCloseIcon, LogoIcon } from "./svgs";
import { useConnect, useAccount } from "wagmi"
import { restrictWallet, getImage } from "@/constants/utility"
import { useState, useEffect } from "react";



export default function CModal() {
  const { isConnectorsModal, setIsConnectorsModal } = useGlobalContext()
  const { connectors, connect, error, isPending, isError, isSuccess } = useConnect();
  const [cname, setCname] = useState("")
  const [screen, setScreen] = useState(0)
  const [screenData, setScreenData] = useState(0)
  const { isConnected, isConnecting } = useAccount()


  function afresh() {
    setScreen(0)
    setScreenData(0)
    setCname("")
  }

  useEffect(() => {
    if(isConnecting) {
      return setScreen(1)
    }

    if (isError && error) {
      (error?.message.includes("rejected") || error?.message.includes("denied")) ? setScreenData(1) : setScreenData(2)
    }
    else {
      setScreenData(0)
    }

    if(isSuccess) {
      setScreen(2)
      setTimeout(function() {
        setIsConnectorsModal(false)
        afresh()
      }, 1500)
    }

    if(!isConnectorsModal) {
      afresh()
    }
  }, [isConnected, isConnecting, isConnectorsModal, isError, error, isPending, isSuccess])




  return (
    isConnectorsModal && 
    <Flex w="100%" position="fixed" direction="column" zIndex="100" justify="center" align="center" h="100%" top="0" left="0" color="#fff">
        <Flex backdropFilter="blur(10.5px)" onClick={() => setIsConnectorsModal(false)} bg="rgba(11,20,27,0.7)" position="absolute" w="100%" h="100%"></Flex>

        <Flex className={`opaq ${isConnectorsModal ? "fadeIn" : "fadeOut"}`} w={["96%", "769px"]} borderRadius="16px" border="1px solid rgb(164, 171, 241)" maxHeight={["80vh", "441px"]} minHeight="100px" zIndex="1" position="relative" direction={["column-reverse", "row"]}>

            <Flex w={["100%", "280px"]} borderRadius={["0px 0px 16px 16px", "16px 0 0 16px"]} bg="#081a2b" borderRight="1px solid #444454" padding={["0 16px", "16px"]}>
                <Flex w="100%" padding="24px" direction="column">
                    <Flex w="149px" h="56px" display={["none", "flex"]}>{LogoIconLight}</Flex>
                    <Text mt={["0", "4"]} mb="3" textAlign={["center", "left"]}>{screen === 2 ? "Connection Successful!" : screen === 1 ? "Approve Connection" : "Connect your wallet"}</Text>
                    <Text fontSize=".875rem" textAlign={["center", "left"]}>{screen === 2 ? "Your wallet is now connected to Swell" : screen === 1 ? "Please approve the connection in your wallet and authorize access to continue." : "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started."}</Text>

                    <Flex mt="5" padding="0.25rem 0.5rem 0.25rem 0.75rem" color="#A4ABF1" fontSize=".875rem" cursor="pointer" align="center" justify={["center", "flex-start"]} _hover={{ textDecoration: "underline" }} transition="300ms ease-in-out">I don't have a wallet <Flex w="20px" h="20px" ml="1">{InfoIcon2}</Flex></Flex>

                    <Flex mt="auto"></Flex>

                    <Flex mt={["5", "12"]} w="100%" align="center" position="relative">
                      <Flex w="100%" position="relative" zIndex="1" justify="space-between">
                        <Flex w="8px" h="8px" bg="#a4abf1" borderRadius="8px"></Flex>
                        <Flex w="8px" h="8px" bg={screen !== 0 ? "#a4abf1" : "#1a1d26"} borderRadius="8px" transition="500ms ease-in-out"></Flex>
                        <Flex w="8px" h="8px" bg={screen === 2 ? "#a4abf1" : "#1a1d26"} borderRadius="8px" transition="500ms ease-in-out"></Flex>
                      </Flex>

                      <Flex w="100%" position="absolute" bg="#1a1d26">
                        <Flex h="2px" bg="#a4abf1" w={screen === 2 ? "100%" : screen === 1 ? "50%" : "0%"} transition="500ms ease-in-out"></Flex>
                      </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex flex="1" bg="#0c141b" borderRadius={["16px 16px 0 0px", "0 16px 16px 0"]} direction="column">
              <Flex w="100%" borderBottom="1px solid #424557" padding="10px 10px 10px 16px" align="center" justify="space-between">
                <Flex align="center" display={["flex", "none"]}><Flex w="20px" h="20px" mr="6px">{LogoIcon}</Flex><Text fontSize="10px">Swell</Text></Flex>
                <Text>{screen === 2 ? "Connection Successful" : screen === 0 ? "Available Wallets (3)" : <>Connecting to {cname}...</>}</Text>

                <Flex cursor="pointer" w="32px" h="32px" color="rgba(255, 255, 255, 0.7)" bg="rgba(255, 255, 255, 0.1)" borderRadius="100%" justify="center" align="center" _hover={{ bg: "rgba(255, 255, 255, 0.2)", color: "#fff" }} transition="200ms ease-in-out" onClick={() => setIsConnectorsModal(false)}><Flex w="24px" h="24px">{ModCloseIcon}</Flex></Flex>
              </Flex>

              <Flex w="100%" direction="column" h="100%" padding="16px">
                {
                  screen === 0 ?
                  <Flex w="100%" h="100%" direction="column">
                    <Flex w="100%" flexWrap="wrap" justify="space-between">
                      {
                        connectors?.map((connector) => restrictWallet(connector.id) && (
                          <Flex mb=".5rem" cursor="pointer" key={connector.id} w={["auto", "49%"]} border={["none", "1px solid #424557"]} borderRadius={["0", "24px"]} padding={["0", "16px"]} align="center" direction={["column", "row"]} onClick={() => {
                            connect({ connector })
                            setCname(connector?.name)
                        }}>
                            <Flex padding="8px" border="1px solid #424557" cursor="pointer" align="center" justify="center" w={["56px", "48px"]} h={["56px", "48px"]} borderRadius="12px" mr={["0", "16px"]}><Flex w={["38px", "30px"]} h={["38px", "30px"]}>{getImage(connector?.name) || ""}</Flex></Flex>
                            <Text mt={["2.5", "0"]} fontSize={[".75rem", "1rem"]}>{connector?.name}</Text>
                          </Flex>
                        ))
                      }
                    </Flex>

                    <Flex mt="auto"></Flex>

                    <Flex w="100%" mt={["5", "12"]} bg="#3B46B7" borderRadius="12px" justify="space-between" padding="0.75rem">
                      <Flex direction="column" fontSize=".75rem">
                        <Text lineHeight="16px">Why don't I see my wallet?</Text>
                        <Text color="#A4ABF1" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => {
                          window.open("https://www.blocknative.com/blog/metamask-wont-connect-web3-wallet-troubleshooting", "_BLANK")
                        }}>Click here to learn more</Text>
                      </Flex>
                      <Flex w="16px" h="16px">{InfoIcon2}</Flex>
                    </Flex>
                  </Flex>
                  :
                  screen === 1 ?
                  <Flex w="100%" direction="column" h="100%">
                    <Flex w="100%" bg="#3B46B7" borderRadius="24px" justify="space-between" padding="16px" align="flex-start">
                      <Flex align="center" position="relative" mr="58px">
                        <Flex w="40px" h="40px" bg="#fff" align="center" justify="center" border={screenData === 0 ? "1px solid #252C73" : "1px solid #ffaf00"} borderRadius="12px"><Flex w="24px" h="24px">{LogoIcon}</Flex></Flex>
                        <Flex position="absolute" zIndex="1" ml="30px" w="40px" h="40px" bg="#fff" align="center" justify="center" border={screenData === 0 ? "1px solid #252C73" : "1px solid #ffaf00"} borderRadius="12px"><Flex w="24px" h="24px">{getImage(cname) || ""}</Flex></Flex>
                      </Flex>

                      <Flex flex="1" direction="column">
                        <Text>{screenData === 1 ? "Connection Rejected!" : "Connecting..."}</Text>
                        <Text fontSize=".75rem">{screenData === 1 ? <><Text color="#A4ABF1" cursor="pointer" onClick={() => afresh()}>Click here to try again</Text></> : screenData === 2 ? "MetaMask already has a pending connection request, please open the MetaMask app to login and connect." : "Make sure to select all accounts that you want to grant access to."}</Text>
                      </Flex>
                    </Flex>

                    <Flex mt="auto"></Flex>

                    <Flex w="100%" justify="center" mt="12">
                      <Flex cursor="pointer" bg="#fff" padding="5px 16px" fontSize=".875rem" fontWeight="600" border="1px solid #33394b" borderRadius="24px" color="#33394b" onClick={() => afresh()}>Back to wallets</Flex>
                    </Flex>
                  </Flex>
                  :
                  <Flex w="100%" borderRadius="24px" bg="#fff">
                    <Flex w="100%" bg="#11996740" borderRadius="24px" justify="space-between" padding="16px" align="center" border="1px solid #119967">
                      <Flex align="center" position="relative" mr="58px">
                        <Flex w="40px" h="40px" bg="#fff" align="center" justify="center" border="1px solid #119967" borderRadius="12px"><Flex w="24px" h="24px">{LogoIcon}</Flex></Flex>
                        <Flex position="absolute" zIndex="1" ml="30px" w="40px" h="40px" bg="#fff" align="center" justify="center" border="1px solid #119967" borderRadius="12px"><Flex w="24px" h="24px">{getImage(cname) || ""}</Flex></Flex>
                      </Flex>

                      <Flex flex="1" direction="column" justify="center">
                        <Text color="#119967">Connected</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                }
              </Flex>
            </Flex>

        </Flex>
    </Flex>
  )
}
