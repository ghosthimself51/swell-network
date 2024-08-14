
export const Permit2DomainGoerli = {
  name: 'Permit2',
  chainId: 5,
  verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
}

export const Permit2Domain = {
  name: 'Permit2',
  chainId: 1,
  verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
}

export const UniSwapDomainGoerli = {
  name: 'Uniswap',
  chainId: 5,
  verifyingContract: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
}

export const USDCDomainGoerli = {
  name: 'USD Coin',
  version: '2',
  chainId: 5,
  verifyingContract: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
}

export const USDCDomain = {
  name: 'USD Coin',
  version: '2',
  chainId: 1,
  verifyingContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
}

export const DAIDomain = {
  name: 'Dai Stablecoin',
  version: '1',
  chainId: 1,
  verifyingContract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
}

export const UsdcTypes = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
}

export const DaiType = {
  Permit: [
    { name: 'holder', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
    { name: 'allowed', type: 'bool' },
  ],
}

export const PermitBatchTransferFromType = {
  PermitBatchTransferFrom: [
    { name: 'permitted', type: 'TokenPermissions[]' },
    { name: 'spender', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
  TokenPermissions: [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint256' },
  ],
}

export const PermitBatch = {
  PermitBatch: [
    { name: 'details', type: 'PermitDetails[]' },
    { name: 'spender', type: 'address' },
    { name: 'sigDeadline', type: 'uint256' },
  ],
  PermitDetails: [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint160' },
    { name: 'expiration', type: 'uint48' },
    { name: 'nonce', type: 'uint48' },
  ],
}
