/**
 * @function useWalletEstimateTransaction
 * @description Dispatch, Broadcast and Confirm Ethereum tranasctions.
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { utils } from "ethers";
/* --- Module --- */
import withEthers from "../withContext";

/* --- useWalletEstimateTransaction : Effect --- */
export const useWalletEstimateTransaction = () => {
  /* ------------------- */
  // State
  /* ------------------- */

  /* --- Global : State --- */
  const ethersProvider = withEthers();

  /* --- Local : State --- */
  const [transaction, setTransaction] = useState(undefined);

  /* --- Transaction : States --- */
  const [estimate, setEstimate] = useState(undefined);

  /* --- Boolean : States --- */
  const [isRequesting, setIsWaitingResponse] = useState(false);

  /* ------------------- */
  // Actions
  /* ------------------- */

  /* --- estimateTransaction : Action --- */
  const estimateTransaction = tx => {
    setIsWaitingResponse(true);
    setTransaction(tx);
  };

  /* ------------------- */
  // Effects
  /* ------------------- */

  /* --- Broadcast Transaction :: Effect --- */
  useEffect(() => {
    if (transaction && !estimate) {
      (async () => {
        try {
          const estimateRequest = await ethersProvider.provider.estimateGas(
            transaction
          );
          setEstimate({
            bg: estimateRequest,
            string: estimateRequest.toString(),
            wei: utils.formatEther(estimateRequest.toString())
          });
          setIsWaitingResponse(false);
        } catch (error) {
          console.log(error);
          setIsWaitingResponse(false);
        }
      })();
    }
  }, [transaction]);

  return {
    estimateTransaction,
    estimate,
    isRequesting: isRequesting
  };
};
