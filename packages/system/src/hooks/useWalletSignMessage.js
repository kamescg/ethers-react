/**
 * @function useWalletSignMessage
 * @description Sign messages using the application wallet.
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import withEthers from "../withContext";

/* --- useWalletSignMessage : Hook --- */
export const useWalletSignMessage = props => {
  /* ------------------- */
  // State
  /* ------------------- */

  /* --- Global : State --- */
  const ethersProvider = withEthers();

  /* --- Local : State --- */
  const [isRequesting, setIsWaitingResponse] = useState(false);
  const [messageUnsigned, setMessageUnsigned] = useState(undefined);
  const [messageSigned, setMessageSigned] = useState(undefined);

  /* --- Error : State --- */
  const [messageSignedError, setMessageSignedError] = useState(undefined);

  /* ------------------- */
  // Actions : Hook
  /* ------------------- */
  /* --- signMessage : Action --- */
  const signMessage = msg => {
    setMessageUnsigned(msg);
    setMessageSignedError(undefined);
    setMessageSigned(undefined);
    setIsWaitingResponse(true);
  };

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (messageUnsigned && isRequesting) {
      (async () => {
        try {
          const messageSigned = await ethersProvider.wallet.signMessage(
            messageUnsigned
          );
          setIsWaitingResponse(false);
          setMessageSigned(messageSigned);
        } catch (error) {
          setIsWaitingResponse(false);
          setMessageSignedError(error);
        }
      })();
    }
  }, [messageUnsigned, isRequesting]);

  /* --- Return : Complete --- */
  return {
    signMessage,
    messageSigned,
    messageUnsigned,
    isRequesting,
    error: messageSignedError
  };
};
