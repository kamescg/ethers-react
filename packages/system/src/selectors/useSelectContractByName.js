/**
 * @function useSelectContractByName
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- useSelectContractByName : Effect --- */
export const useSelectContractByName = name => {
  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- Component : State --- */
  const [contract, setContract] = useState(undefined);
  const [api, setContractAPI] = useState(undefined);
  const [isFound, setIsFound] = useState();
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    if (ethers.contracts) {
      const contract = Object.keys(ethers.contracts).filter(
        contract => ethers.contracts[contract].name === name
      );
      if (contract.length > 0) {
        setContract(ethers.contracts[contract[0]]);

        setIsFound(true);
      } else {
        setIsFound(false);
      }
    }
  }, [ethers.contracts]);

  useEffect(() => {
    if (contract && contract.api && !isConnected) {
      setIsConnected(true);
      setContractAPI(contract.api);
    }
  }, [contract]);

  return {
    contract,
    api,
    isConnected,
    isFound
  };
};
