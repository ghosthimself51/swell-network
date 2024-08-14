import { useSignTypedData } from 'wagmi'
import { DAIDomain, DaiType } from '../typedTypes'


export default function useSignDai(message, onComplete) {
  const { signTypedDataAsync } = useSignTypedData()
  return [
    signTypedDataAsync({
      domain: DAIDomain,
      types: DaiType,
      message,
      primaryType: 'Permit',

    },
      {
        onSettled: (data) => {
          if (data) {
            onComplete(data)
          }
        },

      })
  ]
}
