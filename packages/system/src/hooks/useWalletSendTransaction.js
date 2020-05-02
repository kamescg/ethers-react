/**
 * @function useWalletSendTransaction
 * @description Dispatch, Broadcast and Confirm Ethereum tranasctions.
 */

/* --- Global --- */
import { useState, useEffect } from "react";

/* --- Module --- */
import withEthers from "../withContext";

/* --- Effect --- */
export const useWalletSendTransaction = () => {
  /* ------------------- */
  // State
  /* ------------------- */

  /* --- Global : State --- */
  const ethersProvider = withEthers();

  /* --- Local : State --- */
  const [isRequesting, setIsWaitingResponse] = useState(false);
  const [transaction, setTransaction] = useState(undefined);

  /* --- Transaction : States --- */
  const [transactionHash, setTransactionHash] = useState(undefined);
  const [transactionBroadcast, setTransactionBroadcast] = useState(undefined);
  const [transactionConfirmed, setTransactionConfirmed] = useState(undefined);

  /* --- Error : States --- */
  const [transactionBroadcastError, setTransactionBroadcastError] = useState(
    undefined
  );
  const [transactionConfirmedError, setTransactionConfirmedError] = useState(
    undefined
  );

  /* --- Boolean : States --- */
  const [isTransactionBroadcast, setIsTransactionBroadcast] = useState(false);
  const [isConfirmed, setIsTransactionConfirmed] = useState(false);

  /* ------------------- */
  // Actions
  /* ------------------- */

  /* --- sendTransaction : Action --- */
  const sendTransaction = tx => {
    setTransactionHash(undefined);
    // Broadcast : Transaction
    setTransactionBroadcast(undefined);
    setIsTransactionBroadcast(undefined);
    setTransactionBroadcastError(undefined);
    // Confirmed : Transaction
    setTransactionConfirmed(undefined);
    setIsTransactionConfirmed(undefined);
    setTransactionConfirmedError(undefined);
    setIsWaitingResponse(true);
    setTransaction(tx);
  };

  /* ------------------- */
  // Effects
  /* ------------------- */

  /* --- Broadcast Transaction :: Effect --- */
  useEffect(() => {
    if (transaction && !isTransactionBroadcast) {
      (async () => {
        try {
          const transactionBroadcast = await ethersProvider.wallet.sendTransaction(
            transaction
          );
          setIsWaitingResponse(false);
          setIsTransactionBroadcast(true);
          setTransactionHash(transactionBroadcast.hash);
          setTransactionBroadcast(transactionBroadcast);
        } catch (error) {
          console.log(error);
          setIsWaitingResponse(false);
          setTransactionBroadcastError(error);
        }
      })();
    }
  }, [transaction]);

  /* --- Wait for Transaction : Effect --- */
  useEffect(() => {
    if (isTransactionBroadcast && transactionHash) {
      (async () => {
        try {
          const transactionConfirmed = await ethersProvider.wallet.provider.waitForTransaction(
            transactionHash
          );
          setIsTransactionConfirmed(true);
          setTransactionConfirmed(transactionConfirmed);
        } catch (error) {
          setTransactionConfirmedError(error);
        }
      })();
    }
  }, [isTransactionBroadcast, transactionHash]);

  return {
    sendTransaction,
    hash: transactionHash,
    broadcast: transactionBroadcast,
    broadcastError: transactionBroadcastError,
    confirmed: transactionConfirmed,
    confirmedError: transactionConfirmedError,
    isBroadcast: isTransactionBroadcast,
    isConfirmed: isConfirmed,
    isRequesting: isRequesting
  };
};
