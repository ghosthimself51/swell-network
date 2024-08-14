import { useSignTypedData } from 'wagmi'



export default function useSignPermit2() {

    const { signTypedDataAsync } = useSignTypedData()
    return [
        signTypedDataAsync
    ]
}
