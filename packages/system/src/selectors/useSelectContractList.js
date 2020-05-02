/**
 * @function useSelectContractList
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- Effect --- */
export const useSelectContractList = state => {
  const ethers = withEthers();
  const [isConnected, setIsConnected] = useState(false);
  const [contracts, setContracts] = useState();

  useEffect(() => {
    setContracts(ethers.contracts);
  }, [ethers.contracts]);

  return {
    isConnected,
    list: contracts
  };
};
