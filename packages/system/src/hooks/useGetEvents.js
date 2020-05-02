/**
 * @function useGetEvents
 * @description Get transaction data.
 */

/* --- Global --- */
import { useReducer, useEffect } from "react";
import { withEthers, selectors, utils } from "@ethers-react/system";

/* --- useGetEvents : Effect --- */
export const useGetEvents = (selector) => {
  /* ------------------- */
  // Reducer & State
  /* ------------------- */
  /* --- Global : State --- */
  const contractSelector = selectors.useSelectContract(selector);

  /* --- Local : State --- */
  const initialState = {
    eventName: undefined,
    topic: undefined,
    filter: undefined,
    fromBlock: 0,
    toBlock: "latest",
    events: undefined,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_FILTER":
        return {
          ...state,
          filter: action.payload.filter,
          eventName: action.payload.eventName,
        };
      case "SET_EVENT_ABI":
        return {
          ...state,
          eventABI: action.payload,
        };
      case "SET_EVENTS":
        return {
          ...state,
          events: action.payload,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      case "SET_CONTRACT":
        return {
          ...state,
          contractFunction: action.payload.contractFunction,
          contractCallValues: action.payload.contractCallValues,
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  /* --- Application : State --- */
  const ethers = withEthers();

  /* --- getEvents : Initialize --- */
  const getEvents = ({ address, topic, eventName }) => {
    let topicId = utils.id(topic);
    const filter = {
      address: address,
      topics: [topicId],
      eventName: eventName,
      fromBlock: 9846562,
    };
    dispatch({
      type: "SET_FILTER",
      payload: { filter, eventName },
    });
  };

  useEffect(() => {
    if (
      contractSelector.contract &&
      contractSelector.contract.abi &&
      state.eventName &&
      !state.eventABI
    ) {
      const EventABI = contractSelector.contract.abi.filter(
        (E) => E.name === state.eventName && E.type === "event"
      );
      if (EventABI[0])
        dispatch({
          type: "SET_EVENT_ABI",
          payload: EventABI[0],
        });
    }
  }, [contractSelector, state.eventName]);

  /* --- Sign Message :: Effect --- */
  useEffect(() => {
    if (ethers.provider && state.filter && state.eventABI && !state.events) {
      (async () => {
        try {
          let ABIInterface;
          ABIInterface = new utils.Interface([state.eventABI]);
          const logs = await ethers.provider.getLogs(state.filter);
          console.log(logs, "logs");
          const events = logs.map((log, i) => ({
            values: ABIInterface.parseLog(log).values,
            meta: logs[i],
          }));
          dispatch({
            type: "SET_EVENTS",
            payload: events,
          });
        } catch (error) {
          dispatch({
            type: "SET_ERROR",
            payload: error,
          });
        }
      })();
    }
  }, [ethers.provider, state.filter, state.eventABI, contractSelector]);

  /* --- Return : Complete --- */
  return {
    getEvents,
    error: state.error,
    events: state.events,
    // State from Contract Selectr
    contractSelector,
    isContractConnected: contractSelector.isConnected,
    isContractFound: contractSelector.isFound,
  };
};
