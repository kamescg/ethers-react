/**
 * @function useAddressSet
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useEffect, useState } from "react";

/* --- Local --- */
import { SET_ADDRESS } from "../types";

/* --- Effect --- */
export const useAccountOnChange = (state, dispatch) => {
  const [address, setAddress] = useState(undefined);

  /* --- Set Address : Effect --- */
  useEffect(() => {
    if (state.address !== address) {
      if (address) {
        dispatch({
          payload: address,
          type: SET_ADDRESS
        });
      }
    }
  }, [address]);

  /* --- Selected Address : Listen Event --- */
  useEffect(() => {
    if (
      state.settings.reactive.getAccountOnLoad &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  /* --- Account Change : Listen Event --- */
  useEffect(() => {
    if (state.settings.reactive.watchAccountOnChange && window.ethereum) {
      window.ethereum.on("accountsChanged", function(accounts) {
        if (accounts[0] !== address) {
          setAddress(accounts[0]);
        }
      });
    }
  }, []);

  return true;
};
