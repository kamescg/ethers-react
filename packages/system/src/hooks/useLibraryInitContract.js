/**
 * @function useLibraryInitContract
 * @description Get transaction data.
 */

/* --- Global --- */
import { useReducer, useEffect } from "react";
import { withEthers, selectors, utils, ethers } from "@ethers-react/system";

/* --- Local --- */
import { CONTRACT_INITIALIZE_SUCCESS } from "../lib/types";

/* --- useLibraryInitContract : Effect --- */
export const useLibraryInitContract = ({ address, contractName }) => {
  /* ------------------- */
  // Reducer & State
  /* ------------------- */

  /* --- Global : State --- */
  const ethersProvider = withEthers();
  const contractSelector = selectors.useSelectContractByName(contractName);

  /* --- Local : State --- */
  const initialState = {
    address: undefined,
    contractName: undefined
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_CONTRACT":
        return {
          ...state,
          address: action.payload.address,
          contractName: action.payload.contractName
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /* --- getEvents : Initialize --- */
  const initContract = ({ contractName }) => {
    dispatch({
      type: "SET_CONTRACT",
      payload: { address, contractName }
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_CONTRACT",
      payload: { address, contractName }
    });
  }, [address]);

  useEffect(() => {
    if (ethersProvider.library && ethersProvider.wallet && state.address) {
      const contractSelected = Object.values(ethersProvider.library).filter(
        contract => (contract.contractName = state.contractName)
      );

      if (contractSelected.length > 0) {
        const contract = new ethers.Contract(
          state.address,
          contractSelected[0].abi,
          ethersProvider.wallet
        );

        ethersProvider.contractAddToStore({
          address: state.address,
          abi: contractSelected[0].abi,
          api: contract
        });
      }
    }
  }, [ethersProvider.library, ethersProvider.wallet, state.address]);

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (ethersProvider.provider) {
      (async () => {
        try {
        } catch (error) {
          dispatch({
            type: "SET_ERROR",
            payload: error
          });
        }
      })();
    }
  }, []);

  /* --- Return : Complete --- */
  return {
    initContract,
    error: state.error,
    events: state.events
  };
};
