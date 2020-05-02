/**
 * @function useContractConnect
 * @description Initialize Contracts
 */

/* --- Global --- */
import { useState, useEffect } from "react";
import { ethers } from "@ethers-react/system";

/* --- Local --- */
import { CONTRACT_INIT_WITH_WALLET } from "../lib/types";

/* --- Effect --- */
export const useContractConnect = (state, dispatch) => {
  /* --- Error : State --- */

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (state.contracts && state.wallet) {
      const runEffect = async () => {
        try {
          Object.keys(state.contracts)
            .filter(contractId => {
              return state.contracts[contractId].address;
            })
            .forEach(contractId => {
              const contract = new ethers.Contract(
                state.contracts[contractId].address,
                state.contracts[contractId].abi,
                state.wallet
              );
              dispatch({
                type: CONTRACT_INIT_WITH_WALLET,
                id: state.contracts[contractId].address,
                payload: contract
              });
            });
        } catch (error) {
          // setError(error);
        }
      };
      runEffect();
    }
  }, [state.wallet]);

  /* --- Return : Complete --- */
  return true;
};
