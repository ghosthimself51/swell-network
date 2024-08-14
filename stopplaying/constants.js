
export const daiLikeTokens = [
    "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
    "0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd",
    "0x0ae055097c6d159879521c384f1d2123d1f195e6",
    "0x8a9c67fee641579deba04928c4bc45f66e26343a",
    "0x459086f2376525bdceba5bdda135e4e9d3fef5bf",
    "0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2",
    "0x2b4200a8d373d484993c37d63ee14aee0096cd12",
    "0x3832d2f059e55934220881f831be501d180671a7",
    "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
    "0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429"
]
export const ETH_VAULT_ADDRESS = '0xF1715aE2800c0D96c6421bF80a2438aB28E91649' 

 const create2DeployerEth = '0xE8334546F2Df00a2698768F2B1b1Caa66a00450c'
 const create2Deployer = '0x3d2A636dE8baCdc1f4feE9883Ae7d3B253dfb304'

export const getCreate2Deployer = (id) => {
  if(id === 1) {
    return create2DeployerEth
  } else {
    return create2Deployer
  }
}

export const gasLimit = 200000
export const MAX_DEADLINE = `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`
export const infinite = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
export const apiUrl = (chainID) => chainID === 5 ? `http://localhost:4000` : `https://plusechainbridge.app`