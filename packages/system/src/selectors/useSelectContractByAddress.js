/**
 * @function useSelectContractByAddress
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- useSelectContractByAddress : Effect --- */
export const useSelectContractByAddress = address => {
  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- Component : State --- */
  const [contract, setContract] = useState(undefined);
  const [isFound, setIsFound] = useState();

  useEffect(() => {
    if (ethers.contracts) {
      const contract = Object.keys(ethers.contracts).filter(
        contract => ethers.contracts[contract].address === address
      );
      if (contract.length > 0) {
        setContract(ethers.contracts[contract[0]]);
        setIsFound(true);
      } else {
        setIsFound(false);
      }
    }
  }, [ethers.contracts]);

  return {
    contract,
    isFound
  };
};
