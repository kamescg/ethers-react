/**
 * @function useWalletSignTypedMessageV3
 * @description Sign messages using the application wallet.
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import withEthers from "../withContext";

/* --- useWalletSignTypedMessageV3 : Hook --- */
export const useWalletSignTypedMessageV4 = props => {
  /* ------------------- */
  // State : Component
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

  /* --- Sign Message : Action : Hook --- */
  const signMessage = msg => {
    setMessageUnsigned(msg);
    setMessageSignedError(undefined);
    setMessageSigned(undefined);
    setIsWaitingResponse(true);
  };

  /* ------------------- */
  // Effects
  /* ------------------- */

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (messageUnsigned && isRequesting) {
      (async () => {
        try {
          ethersProvider.wallet.provider.provider.sendAsync(
            {
              method: "eth_signTypedData_v4",
              params: [ethersProvider.address, messageUnsigned],
              from: ethersProvider.address
            },
            (err, res) => {
              if (err) {
                setMessageSignedError(err);
                setIsWaitingResponse(false);
              } else {
                setIsWaitingResponse(false);
                setMessageSigned(res.result);
              }
            }
          );
          // setMessageSigned(messageSigned);
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
