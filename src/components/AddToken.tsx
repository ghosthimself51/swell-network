import { useAccount } from 'wagmi';

export const AddToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
): Promise<void> => {
  if (!window.ethereum) {
    console.error('MetaMask is not installed');
    return;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });
    console.log(`${tokenSymbol} added to wallet`);
  } catch (error) {
    console.error('Failed to add token to wallet', error);
  }
};
