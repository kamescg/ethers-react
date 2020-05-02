/**
 * @function useWalletSendTransaction
 * @description Dispatch, Broadcast and Confirm Ethereum tranasctions.
 */

/* --- Global --- */
import { useEffect, useReducer } from "react";
import { selectors } from "@ethers-react/system";

/* --- Module --- */
import withEthers from "../withContext";

const LIFECYLE_TRANSACTION_BROADCAST = "LIFECYLE_TRANSACTION_BROADCAST";
const LIFECYLE_TRANSACTION_SUCCESS = "LIFECYLE_TRANSACTION_SUCCESS";
const LIFECYLE_TRANSACTION_FAILURE = "LIFECYLE_TRANSACTION_FAILURE";
/* --- Effect --- */
export const useContractSendTransaction = (selector) => {
  /* ------------------- */
  // Reducer & State
  /* ------------------- */

  /* --- Global : State --- */
  const ethersProvider = withEthers();
  const contractSelector = selectors.useSelectContract(selector);

  /* --- Local : State --- */
  const initialState = {
    lifecyle: undefined,
    params: {},
    hash: undefined,
    broadcast: undefined,
    receipt: undefined,
    // Contract : States
    contractNamePassed: undefined,
    contractFunction: undefined,
    contractCallValues: undefined,

    // Error : States
    broadcastError: undefined,
    confirmedError: undefined,
    receiptStatus: undefined,
    // Booleans : States
    isRequesting: false,
    isBroadcast: false,
    isConfirmed: false,
    isRejected: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_PARAMS":
        return {
          ...state,
          params: action.payload,
        };
      case "SET_CONTRACT":
        return {
          ...state,
          contractFunction: action.payload.contractFunction,
          contractCallValues: action.payload.contractCallValues,
        };
      case "SEND_TRANSACTION":
        return {
          ...state,
          contractFunction: action.payload.contractFunction,
          contractCallValues: action.payload.contractCallValues,
          hash: undefined,
          broadcastError: undefined,
          broadcastErrorCode: undefined,
          isRequesting: true,
          isBroadcast: false,
          isConfirmed: false,
          isRejected: false,
          receipt: undefined,
          params: action.payload.params,
          lifecyle: LIFECYLE_TRANSACTION_BROADCAST,
        };
      case "SET_BROADCAST_CONFIRMED":
        return {
          ...state,
          isRequesting: false,
          isBroadcast: true,
          hash: action.payload.hash,
          transaction: action.payload.transaction,
        };
      case "SET_BROADCAST_REJECTED":
        return {
          ...state,
          isRequesting: false,
          broadcastErrorCode: action.payload.errorCode,
          broadcastError: action.payload.error,
          lifecyle: LIFECYLE_TRANSACTION_FAILURE,
        };
      case "SET_RECEIPT_SUCCESS":
        return {
          ...state,
          isRequesting: false,
          isConfirmed: true,
          receiptStatus: action.payload.receiptStatus,
          receipt: action.payload.receipt,
          lifecyle: LIFECYLE_TRANSACTION_SUCCESS,
        };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Debugging
  if (Number(process.env.REACT_APP_ETHERS_SYSTEM_DEBUG) === 1) {
    // console.log(state, "Contract SEND");
  }

  /* ------------------- */
  // Hooks
  /* ------------------- */

  /* ------------------- */
  // Actions
  /* ------------------- */
  /* --- setContractName : Action --- */
  const setContractName = (contractName) => {
    dispatch({
      type: "SET_CONTRACT_NAME",
      payload: contractName,
    });
  };

  /* --- sendTransaction : Action --- */
  const sendTransaction = ({ func, inputs, contractName, params }) => {
    dispatch({
      type: "SEND_TRANSACTION",
      payload: {
        contractName: state.contractName ? state.contractName : contractName,
        contractFunction: func,
        contractCallValues: inputs,
        params: params,
      },
    });
  };

  /* ------------------- */
  // Effects
  /* ------------------- */
  /* --- Contract Send Transaction :: Effect --- */
  useEffect(() => {
    if (
      contractSelector.api &&
      state.contractFunction &&
      state.contractCallValues &&
      !state.hash
    ) {
      (async () => {
        try {
          const transactionBroadcast = await contractSelector.api[
            state.contractFunction
          ](...state.contractCallValues, state.params);
          dispatch({
            type: "SET_BROADCAST_CONFIRMED",
            payload: {
              hash: transactionBroadcast.hash,
              transaction: transactionBroadcast,
            },
          });
        } catch (error) {
          dispatch({
            type: "SET_BROADCAST_REJECTED",
            payload: {
              errorCode: error.code,
              error: error,
            },
          });
        }
      })();
    }
  }, [contractSelector.api, state.contractFunction, state.contractCallValues]);

  /* --- Wait for Transaction : Effect --- */
  useEffect(() => {
    if (state.isBroadcast && state.hash) {
      (async () => {
        try {
          const receipt = await ethersProvider.wallet.provider.waitForTransaction(
            state.hash
          );

          dispatch({
            type: "SET_RECEIPT_SUCCESS",
            payload: {
              receipt: receipt,
              receiptStatus: receipt.status ? true : false,
            },
          });
        } catch (error) {
          setTransactionConfirmedError(error);
        }
      })();
    }
  }, [state.isBroadcast, state.hash]);

  return {
    sendTransaction,
    setContractName,
    lifecyle: state.lifecyle,
    hash: state.hash,
    broadcast: state.broadcast,
    broadcastError: state.broadcastError,
    broadcastErrorCode: state.broadcastErrorCode,
    receipt: state.receipt,
    receiptStatus: state.receiptStatus,
    confirmedError: state.confirmedError,
    // Boolean States
    isBroadcast: state.isBroadcast,
    isConfirmed: state.isConfirmed,
    isRejected: state.isRejected,
    isRequesting: state.isRequesting,
    // State from Contract Selectr
    isContractConnected: contractSelector.isConnected,
    isContractFound: contractSelector.isFound,
  };
};
