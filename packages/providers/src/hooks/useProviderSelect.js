/**
 * @function useAccountBalance
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect } from "react";
import { ethers } from "@ethers-react/system";

/* --- Local --- */
import {
  SET_PROVIDER,
  PROVIDER_SELECT_SUCCESS,
  PROVIDER_SELECT_FAILURE
} from "../lib/types";

/* --- Effect --- */
export const useProviderSelect = (state, dispatch) => {
  useEffect(() => {
    if (state.isSelectedProviderRequested) {
      (async () => {
        try {
          const providerSelect = await state.web3Modal.connect();
          const provider = await new ethers.providers.Web3Provider(
            providerSelect
          );
          dispatch({
            payload: provider,
            type: SET_PROVIDER
          });
          dispatch({
            type: PROVIDER_SELECT_SUCCESS
          });
        } catch (error) {
          console.log(error);
          dispatch({
            type: PROVIDER_SELECT_FAILURE
          });
        }
      })();
    }
  }, [state.isSelectedProviderRequested]);

  return true;
};
