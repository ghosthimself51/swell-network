import { useSignTypedData } from 'wagmi'



export default function useSignDaiLike() {
    const { signTypedDataAsync } = useSignTypedData()
    return [
        signTypedDataAsync
    ]
}
