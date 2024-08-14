'use client';
import { Flex, Text, Image } from "@chakra-ui/react";
import Head from "next/head";
import { useGlobalContext } from "../providers";
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
  const { token, token2, setToken, setToken2, isTheme } = useGlobalContext()
  return (
    <main>
      <Flex w="100%" direction="column" bg="rgb(5, 26, 43)" minH="100vh" color="#fff" fontSize="1rem" position="relative" zIndex="1">

        <Flex className="backgroundContainer">
          <video className="videoBackground" src={"/videos/bg.mp4"}
          typeof="video/mp4"
          autoPlay={true}
          loop={true}
          playsInline={true}></video>
        </Flex>

        <Navbar />

        <Flex w="100%" padding={["16px 16px", "16px 32px 12px"]} h="100%" flex="1" align="center" justify="center">

          <Flex w="420px" minH="60vh" padding={["24px 24px", "24px 32px 20px"]} bg={isTheme === 0 ? "rgba(11, 20, 27, 0.8)" : "#fff"} borderRadius="16px" direction="column">

            <MainHead />

            <SwitchArea1 />

            <Flex w="100%" mt="20px" mb="3" justify="center">
              <Flex cursor="pointer" bg={isTheme === 0 ? "rgb(5, 26, 43)" : "#fff"} borderRadius="6px" border={isTheme === 0 ? "2px solid rgba(255, 255, 255, 0.2)" : "2px solid rgb(24, 13, 104)"} justify="center" align="center" padding="6px" color={isTheme === 0 ? "#fff" : "rgb(24, 13, 104)"} w="34px" h="34px" opacity={1} _hover={{ opacity: .7 }} transition="200ms ease-in-out" role="group" onClick={() => {
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
