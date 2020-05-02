import {
  ENABLE_REQUEST,
  ENABLE_SUCCESS,
  ENABLE_FAILURE,
  CONTRACT_INIT,
  CONTRACT_INIT_WITH_WALLET,
  SET_ADDRESS,
  SET_NETWORK,
  SET_PROVIDER,
} from "./types";

const reducerActions = (state, action) => {
  const { id, payload, type } = action;
  switch (type) {
    case SET_PROVIDER:
      return {
        ...state,
        provider: action.payload,
      };
    /* ----------------------- */
    /*         Common          */
    /* ----------------------- */
    case ENABLE_REQUEST:
      return {
        ...state,
        isEnableRequested: true,
      };
    case ENABLE_SUCCESS:
      return {
        ...state,
        isEnableSuccess: true,
        isEnableRequested: false,
      };
    case ENABLE_FAILURE:
      return {
        ...state,
        isEnableRequested: false,
        isEnableSuccess: false,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: payload,
      };

    case SET_NETWORK:
      return {
        ...state,
        network: payload,
      };

    /* ----------------------- */
    /* Contract Initialize     */
    /* ----------------------- */

    case CONTRACT_INIT:
      return {
        ...state,
        contracts: {
          ...state.contracts,
          [action.id]: {
            address: action.id,
            abi: payload.abi,
            api: payload.api,
          },
        },
      };
    case CONTRACT_INIT_WITH_WALLET:
      return {
        ...state,
        contracts: {
          ...state.contracts,
          [action.id]: {
            api: action.payload,
            ...state.contracts[action.payload.address],
          },
          ...state.contacts,
        },
      };

    default:
      return state;
  }
};

export default reducerActions;
