/**
 * @function useSelectContractFromLibrary
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- useSelectContractFromLibrary : Effect --- */
export const useSelectContractFromLibrary = name => {
  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- Component : State --- */
  const [contract, setContract] = useState({});
  const [api, setContractAPI] = useState(undefined);
  const [isFound, setIsFound] = useState();
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    if (ethers.library) {
      const contract = Object.keys(ethers.library).filter(
        contract => ethers.library[contract].contractName === name
      );
      if (contract.length > 0) {
        setContract(ethers.library[contract[0]]);

        setIsFound(true);
      } else {
        setIsFound(false);
      }
    }
  }, [ethers.library]);

  useEffect(() => {
    if (contract && contract.api && !isConnected) {
      setIsConnected(true);
      setContractAPI(contract.api);
    }
  }, [contract]);

  return {
    contract,
    abi: contract.abi,
    bytecode: contract.bytecode,
    isFound
  };
};
