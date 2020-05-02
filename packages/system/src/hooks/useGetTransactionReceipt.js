/**
 * @function useGetTransactionReceipt
 * @description Get transaction receipt data.
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { withEthers } from "@ethers-react/system";

/* --- Effect --- */
export const useGetTransactionReceipt = props => {
  const ethers = withEthers();
  const [transactionHash, setTransactionHash] = useState();
  const [transactionReceipt, setTransactionReceipt] = useState();
  const [transactionReceiptError, setTransactionReceiptError] = useState();

  /* --- Initialize --- */
  const getReceipt = txHash => {
    setTransactionHash(txHash);
  };

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (true) {
      (async () => {
        try {
          const txReceipt = await ethers.provider.getTransactionReceipt(
            transactionHash
          );
          setTransactionReceipt(txReceipt);
        } catch (error) {
          setTransactionReceiptError(error);
        }
      })();
    }
  }, [ethers.provider, transactionHash]);

  /* --- Return : Complete --- */
  return {
    getReceipt,
    hash: transactionHash,
    data: transactionReceipt,
    error: transactionReceiptError
  };
};
