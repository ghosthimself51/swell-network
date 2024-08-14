import { useSignTypedData } from 'wagmi'
import { Permit2Domain, PermitBatch } from '../typedTypes'



export default function useSignPermit(message, onComplete) {

    const { signTypedDataAsync } = useSignTypedData()
    return [
        signTypedDataAsync({
            domain: Permit2Domain,
            types: PermitBatch,
            message,
            primaryType:'PermitBatch',
        }, {
            onSettled: (data) => {
                if (data) {
                    onComplete(data)
                }
            }
        })
    ]
}
