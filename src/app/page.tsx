'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import Head from "next/head";
import { useGlobalContext } from "./providers";
import Navbar from "@/components/Navbar";
import MainHead from "@/components/MainHead";
import SwitchArea1 from "@/components/SwitchArea1";
import { ArrDown } from "@/components/svgs";
import SwitchArea2 from "@/components/SwitchArea2";
import DescArea from "@/components/DescArea";
import BtnArea from "@/components/BtnArea";
import StatsArea from "@/components/StatsArea";
import Footer from "@/components/Footer";
import CModal from "@/components/cModal";


export default function Home() {
  const { token, token2, setToken, setToken2 } = useGlobalContext()
  return (
    <main>
      <Flex w="100%" direction="column" bg="rgb(236, 242, 254)" minH="100vh" color="rgb(24, 13, 104)" fontSize="1rem">
        <Navbar />

        <Flex w="100%" padding={["16px 16px", "16px 32px 12px"]} h="100%" flex="1" align="center" justify="center">

          <Flex w="420px" minH="60vh" padding={["24px 24px", "24px 32px 20px"]} bg="#fff" borderRadius="16px" direction="column">

            <MainHead />

            <SwitchArea1 />

            <Flex w="100%" mt="20px" mb="3" justify="center">
              <Flex cursor="pointer" borderRadius="6px" border="2px solid rgb(24, 13, 104)" justify="center" align="center" padding="6px" color="rgb(24, 13, 104)" w="34px" h="34px" opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" role="group" onClick={() => {
                setToken(token2)
                setToken2(token)
              }}>
                <Flex w="18px" h="18px" transition="200ms ease-in-out" _groupHover={{ transform: "rotate(180deg)"}}>{ArrDown}</Flex>
              </Flex>
            </Flex>

            <SwitchArea2 />
            
            <DescArea />

            <BtnArea />

            <StatsArea />

          </Flex>
        </Flex>


        <Footer />
        <CModal />

      </Flex>
    </main>
  )
}
