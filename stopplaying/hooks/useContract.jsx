import { useWriteContract as useContractWrite } from "wagmi";


export default function useContract() {
  const { writeContractAsync, data  } = useContractWrite();
  return { 
    data, 
    writeAsync: writeContractAsync
  };
}
