/**
 * @function useGetEncodedData
 * @description Get transaction data.
 */

/* --- Global --- */
import { useReducer, useEffect } from "react";
import { withEthers, selectors, utils } from "@ethers-react/system";

/* --- useGetEncodedData : Effect --- */
export const useGetEncodedData = selector => {
  /* ------------------- */
  // Reducer & State
  /* ------------------- */
  /* --- Global : State --- */
  const contractSelector = selectors.useSelectContract(selector);

  /* --- Local : State --- */
  const initialState = {
    func: undefined
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_FUNCTION":
        return {
          ...state,
          func: action.payload.func,
          inputs: action.payload.inputs
        };
      case "SET_FUNCTION_ABI":
        return {
          ...state,
          abi: action.payload
        };
      case "SET_DATA":
        return {
          ...state,
          data: action.payload
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload
        };
      case "SET_CONTRACT":
        return {
          ...state,
          contractFunction: action.payload.contractFunction,
          contractCallValues: action.payload.contractCallValues
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- getABI : Initialize --- */
  const getABI = (func, inputs) => {
    dispatch({
      type: "SET_FUNCTION",
      payload: { func, inputs }
    });
  };

  useEffect(() => {
    if (contractSelector.contract && state.func && !state.abi) {
      const FuncABI = Object.values(
        contractSelector.contract.api.interface.functions
      ).filter(V => V.name === state.func);
      if (FuncABI[0])
        dispatch({
          type: "SET_FUNCTION_ABI",
          payload: FuncABI[0]
        });
    }
  }, [contractSelector, state.func]);

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (ethers.provider && state.func && state.abi && !state.data) {
      (async () => {
        try {
          let ABIInterface;
          ABIInterface = state.abi.encode(state.inputs);
          dispatch({
            type: "SET_DATA",
            payload: ABIInterface
          });
        } catch (error) {
          console.log(error, "derr");
          dispatch({
            type: "SET_DATA",
            payload: {}
          });
          dispatch({
            type: "SET_ERROR",
            payload: error
          });
        }
      })();
    }
  }, [ethers.provider, state.func, state.abi, contractSelector]);

  /* --- Return : Complete --- */
  return {
    getABI,
    data: state.data,
    error: state.error
  };
};
