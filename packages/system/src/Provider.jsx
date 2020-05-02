/**
 * @function Provider
 * @param {Array<React.Component>} children
 * @param {Array} contracts
 * @param {String} provider
 */

/* --- Global --- */
import React, { useContext, useReducer, useEffect, useState } from "react";
import { ethers } from "ethers";

/* --- Local --- */
import Context from "./Context";
import reducer from "./lib/reducer";
import * as actionList from "./actions";
import { useContractConnect, useWalletEnable } from "./reactive";
import {
  enhanceActions,
  enhanceExtensionActions,
  contractLoad,
  extensionsInitialize,
  combineExtensionInitialState,
  combineExtensionsReducers,
} from "./middleware";

/* --- Component --- */
const Provider = ({ children, contracts = [], extensions, provider }) => {
  const [actions, setActions] = useState();
  const [extensionActions, setExtensionActions] = useState();
  /* --- Ethers Context --- */
  const initialState = useContext(Context);

  /* --- Reducer --- */
  const [state, dispatch] = useReducer(
    combineExtensionsReducers([{ name: "core", reducer }, ...extensions]),
    combineExtensionInitialState([
      { name: "core", initialState },
      ...extensions,
    ]),
    contractLoad(contracts)
  );

  /* --- Extensions : Initialize --- */
  extensionsInitialize(extensions, state, dispatch);

  /* --- Reactive : Effects --- */
  useWalletEnable(state, dispatch);
  useContractConnect(state, dispatch);

  /* --- Enhance Actions --- */
  useEffect(() => {
    const actions = enhanceActions(actionList, state, dispatch);
    const actionsExtensions = enhanceExtensionActions(extensions, dispatch);
    setActions(actions);
    setExtensionActions(actionsExtensions);
    if (provider) {
      (async () => {
        console.log(provider, "providerproviderprovider");
        // const providerWrapped = await new ethers.providers.Web3Provider(
        //   provider
        // );
        dispatch({
          type: "SET_PROVIDER",
          payload: provider,
        });
      })();
    }
  }, []);

  /* --- Developer Messages --- */
  if (Number(process.env.REACT_APP_ETHERS_SYSTEM_DEBUG) === 1) {
    console.log(state, "Ethers Provider");
  }

  return (
    <Context.Provider
      value={{
        ...state,
        ...actions,
        ...extensionActions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
