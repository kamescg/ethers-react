/**
 * @function useGetTransactionReceipt
 * @description Get transaction receipt data.
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- Effect --- */
export const useTransactionWatch = props => {
  const ethers = withEthers();
  const [transactionHash, setTransactionHash] = useState();
  const [isConfirmed, setIsTransactionConfirmed] = useState();
  const [isWatching, setIsWatchingTransaction] = useState();
  const [transactionConfirmed, setTransactionConfirmed] = useState(undefined);
  const [transactionConfirmedError, setTransactionConfirmedError] = useState();

  /* --- Initialize --- */
  const watch = txHash => {
    setTransactionHash(txHash);
  };

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (transactionHash) {
      (async () => {
        try {
          setIsWatchingTransaction(true);
          const transactionConfirmed = await ethers.provider.waitForTransaction(
            transactionHash
          );
          setIsTransactionConfirmed(true);
          setTransactionConfirmed(transactionConfirmed);
        } catch (error) {
          setTransactionConfirmedError(error);
        }
      })();
    }
  }, [ethers.provider, transactionHash]);

  /* --- Return : Complete --- */
  return {
    watch,
    hash: transactionHash,
    isConfirmed,
    isWatching,
    data: transactionConfirmed,
    error: transactionConfirmedError
  };
};
