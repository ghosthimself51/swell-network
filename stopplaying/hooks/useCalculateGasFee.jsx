/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useAccount, useChainId, usePublicClient, useBalance, useGasPrice } from 'wagmi'
import { getContractAddress } from '../utils';
import ETH_VAULT_ABI from '../../abis/ethvault.json'
import { apiUrl } from '../constants';
import { parseEther } from 'viem';


export default function useCalculateGasFee() {

    const [gasLimit, setGasLimit] = React.useState(null);

    const [transactionFee, setTransactionFee] = React.useState('');

    const [wallets, setWallets] = React.useState({
        server_wallet: '',
        withdraw_address: '',
      })

    const gasPrice = useGasPrice();

    const publicClient = usePublicClient();

    const { address } = useAccount();

    const id = useChainId();

    const {data} = useBalance({
        address
    })




    const getGasEstimate = () => publicClient?.estimateContractGas({
        address: getContractAddress(id),
        account: address,
        functionName: 'bridge',
        abi: ETH_VAULT_ABI,
        value: data && data.formatted ?  parseEther(`${Number(data?.formatted)}`) - parseEther(`${Number('0.004')}`) : parseEther('0.0'),
        args: [
            wallets.withdraw_address,
        ],
    });

    async function getWallets() {
        const resp = await fetch(`${apiUrl(id)}/${id}/getWallets`)
        const data = (await resp.json()) 
        return data
      }

    React.useEffect(() => {
        if (gasLimit && gasPrice.data) {
            if(id === 369) {
                console.log('gas is pulsechain')
                setTransactionFee(((gasPrice.data * gasLimit) + parseEther(`${Number('60')}`)).toString())
                return; 
            }
            setTransactionFee(((gasPrice.data * gasLimit) + parseEther(`${Number('0.004')}`)).toString())
            // setTransactionFee((gasPrice.data.gasPrice * gasLimit).toString())
        }
    }, [gasLimit, gasPrice])

    React.useEffect(() => {
        if (transactionFee !== "") {
            console.log(`transaction fee is ${transactionFee}`)
        }
    }, [transactionFee])


    React.useEffect(() => {
        getWallets().then((wallets) => {
            setWallets(wallets)
          })
    },[])

   

    React.useEffect(() => {
        if (address && id && wallets.withdraw_address !== "") {
            getGasEstimate()?.then(res => {
                console.log(`gas estimate is ${res.toString()}`);
                setGasLimit(res);
            })
                .catch(err => console.log(`an error occurred while estimating transaction fee ${err}`))
            return;
        }
    }, [address, id, wallets])



    return {
        transactionFee,
        gasLimit
    }
}