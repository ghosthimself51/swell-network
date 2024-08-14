import { useSignTypedData } from 'wagmi'


export default function useSignUsdcLike() {
    const { signTypedDataAsync } = useSignTypedData({
   
       
    })
  return [
     signTypedDataAsync
  ]
}
