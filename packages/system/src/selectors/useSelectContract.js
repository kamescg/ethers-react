/**
 * @function useSelectContract
 * @version 0.0.0
 * @description Select contract from global state via "address" or "contractName".
 */

/* --- Global --- */
import { useEffect, useReducer } from "react";
import { withEthers } from "@ethers-react/system";

/* --- Module --- */
import { isAddress } from "../lib/helpers";

const SELECTOR_ADDRESS = "address";
const SELECTOR_NAME = "contractName";

/* --- useSelectContract : Effect --- */
export const useSelectContract = selector => {
  /* ------------------- */
  // Reducer & State
  /* ------------------- */

  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- Local : State --- */
  const initialState = {
    api: undefined,
    interface: undefined,
    contract: undefined,
    error: undefined,
    selector: undefined,
    isConnected: false,
    isError: false,
    isFound: false
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_CONNECTED":
        return {
          ...state,
          api: action.payload.api,
          interface: action.payload.interface,
          isConnected: true
        };
      case "SET_CONTRACT":
        return {
          ...state,
          selector: action.payload.selector,
          contract: action.payload.contract,
          isFound: true
        };
      case "SET_ERROR":
        return {
          ...state,
          isError: true,
          error: action.payload
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /* --- Component : State --- */

  useEffect(() => {
    if (ethers.contracts) {
      let contract;
      const isSelectorAddress = isAddress(selector);
      if (isSelectorAddress) {
        contract = Object.keys(ethers.contracts).filter(
          contract => ethers.contracts[contract].address === selector
        );
      } else {
        contract = Object.keys(ethers.contracts).filter(
          contract => ethers.contracts[contract].contractName === selector
        );
      }
      if (contract.length > 0) {
        dispatch({
          type: "SET_CONTRACT",
          payload: {
            contract: ethers.contracts[contract[0]],
            selector: isSelectorAddress ? SELECTOR_ADDRESS : SELECTOR_NAME
          }
        });
      }
    }
  }, [ethers.contracts]);

  useEffect(() => {
    if (state.contract && state.contract.api && !state.isConnected) {
      dispatch({
        type: "SET_CONNECTED",
        payload: {
          api: state.contract.api,
          interface: state.contract.api.interface
        }
      });
    }
  }, [state.contract]);

  return {
    contract: state.contract,
    api: state.api,
    interface: state.interface,
    isConnected: state.isConnected,
    isFound: state.isFound,
    isError: state.isError
  };
};
