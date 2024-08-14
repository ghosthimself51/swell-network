import { MetaMaskIcon, WalletConnectIcon, CoinBaseIcon } from "@/components/svgs";
export function truncateAddress(
    str: `0x${string}`,
    start?: number,
    end?: number,
) {
    if (str.length > 35) {
        return (
            str.substr(0, start || 4) +
            "..." +
            str.substr(str.length - (end || 4), str.length)
        );
    }
    return str;
}

export function formatBalance(balance: number, dp?: number) {
    if (balance) {
        return Number(balance).toFixed(dp || 4);
    }
    return (0).toFixed(4);
}

export const searchFunc = (item: any, searchTerms: string) => {
    if (
        item.name?.trim().toLowerCase().includes(searchTerms.toLowerCase()) ||
        item.symbol?.trim().toLowerCase().includes(searchTerms.toLowerCase()) ||
        searchTerms?.trim() === ""
    ) {
        return true;
    }
};

export const getImage = (name: string) => {
    if (name === "MetaMask") {
        return MetaMaskIcon;
    } else if (name === "Coinbase Wallet") {
        return CoinBaseIcon;
    } else if (name === "WalletConnect") {
        return WalletConnectIcon;
    } else {
        return null;
    }
};

export const restrictWallet = (id: string) => {
    if (
        id === "metaMaskSDK" ||
        id === "coinbaseWalletSDK" ||
        id === "walletConnect"
    ) {
        return true;
    } else {
        return false;
    }
};

export const formatNumber = (value: string): string => {
    const [integerPart, decimalPart] = value.split('.');
  
    const formattedIntegerPart = parseFloat(integerPart).toLocaleString('en-US');
  
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  }
