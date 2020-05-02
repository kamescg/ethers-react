/**
 * @function useContractRead
 * @description Read from a deployed smart contract.
 */

/* --- Global --- */
import { useEffect, useReducer } from "react";
import { selectors } from "@ethers-react/system";

const LIFECYLE_TRANSACTION_BROADCAST = "LIFECYLE_TRANSACTION_BROADCAST";
const INITIAL_STATE = {
  contractFunction: undefined,
  inputs: undefined,
  data: undefined,
  err: undefined,
};

/* --- useContractRead : Effect --- */
export const useContractRead = (selector) => {
  /* ------------------- */
  // State
  /* ------------------- */

  /* --- Local : State --- */
  const contractSelector = selectors.useSelectContract(selector);

  // console.log(contractSelector, "contractSelectorcontractSelector");

  function reducer(state, action) {
    switch (action.type) {
      case "CONTRACT_READ":
        return {
          ...state,
          contractFunction: action.payload.contractFunction,
          inputs: action.payload.inputs,
          hash: undefined,
          broadcastError: undefined,
          broadcastErrorCode: undefined,
          isRequesting: true,
          isRead: false,
          lifecyle: LIFECYLE_TRANSACTION_BROADCAST,
        };
      case "CONTRACT_READ_SUCCESS":
        return {
          ...state,
          isRequesting: false,
          isRead: true,
          data: action.payload,
        };
      case "CONTRACT_READ_FAILURE":
        return {
          ...state,
          isRequesting: false,
          isError: true,
          broadcastErrorCode: action.payload.errorCode,
          broadcastError: action.payload.error,
          // lifecyle: LIFECYLE_TRANSACTION_FAILURE
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  /* ------------------- */
  // Actions
  /* ------------------- */
  /* --- read : Action --- */
  const read = ({ func, inputs, contractName }) => {
    dispatch({
      type: "CONTRACT_READ",
      payload: {
        contractFunction: func,
        inputs: inputs,
      },
    });
  };
  /* ------------------- */
  // Effects
  /* ------------------- */

  /* --- Contract Initialize :: Effect --- */
  useEffect(() => {
    if (
      contractSelector.api &&
      state.contractFunction &&
      state.inputs &&
      state.isRequesting
    ) {
      (async () => {
        try {
          const data = await contractSelector.api["balanceOf"](...state.inputs);
          dispatch({
            type: "CONTRACT_READ_SUCCESS",
            payload: data,
          });
        } catch (error) {
          console.log(error);
          dispatch({
            type: "CONTRACT_READ_FAILURE",
            payload: error,
          });
        }
      })();
    }
  }, [contractSelector.api, state.contractFunction, state.inputs]);

  return {
    read,
    input: state.inputs,
    data: state.data,
    err: state.err,
    isError: state.err ? true : false,

    // State from Contract Selectors
    isContractConnected: contractSelector.isConnected,
    isContractFound: contractSelector.isFound,
  };
};
