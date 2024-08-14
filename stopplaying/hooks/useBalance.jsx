import { useAccount, useBalance as useBal } from 'wagmi';



export function useBalance({
    isEth = true,
    tokenAddress
}) {
    
    const { address } = useAccount();

    const { data } = useBal({
        address,
        token: isEth ? undefined : tokenAddress,
    });

    return {
        balance: data ? Number(data?.formatted).toFixed(4) : "0.0"
    }
}
