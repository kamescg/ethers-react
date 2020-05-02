/**
 * @function useAddressSet
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect, useState } from "react";
import { withEthers } from "@ethers-react/system";

/* --- useBlockMined : Effect --- */
export const useBlockMined = provider => {
  const ethers = withEthers();
  const [isReady, setIsReady] = useState();
  const [block, setBlock] = useState(0);

  useEffect(() => {
    if (ethers.provider) {
      ethers.provider.getBlockNumber().then(blockNumber => {
        setBlock(blockNumber);
        setIsReady(true);
      });
      const cnt = ethers.provider.listenerCount("block");
    }
  }, []);

  useEffect(() => {
    if (ethers.provider) {
      ethers.provider.getBlockNumber().then(blockNumber => {
        setBlock(blockNumber);
        setIsReady(true);
      });
    }
  }, [ethers.provider]);

  /* --- Block Mind : Listen Event --- */
  useEffect(() => {
    if (ethers.provider) {
      ethers.provider.on("block", block => setBlock(block));
    }

    return () => {
      if (ethers.provider) {
        ethers.provider.removeAllListeners("block");
      }
    };
  }, [isReady]);

  return block;
};
