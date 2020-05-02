import {
  PROVIDER_SET,
  BALANCE_SET,
  NONCE_SET,
  SET_NETWORK,
  SET_ADDRESS,
  BLOCK_CURRENT_SET,
  SIGNER_GET_SUCCESS,
  SIGNER_GET_FAILURE
} from "./types";

const reducerActions = (state, action) => {
  switch (action.type) {
    case BLOCK_CURRENT_SET:
      return {
        ...state,
        currentBlock: action.payload
      };
    case PROVIDER_SET:
      return {
        ...state,
        provider: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case BALANCE_SET:
      return {
        ...state,
        balance: action.payload
      };
    case NONCE_SET:
      return {
        ...state,
        nonce: action.payload
      };
    case SET_NETWORK:
      return {
        ...state,
        network: action.payload
      };

    case SIGNER_GET_SUCCESS:
      return {
        ...state,
        wallet: action.payload
      };
    case SIGNER_GET_FAILURE:
      return {
        ...state,
        wallet: false
      };

    default:
      return state;
  }
};

export default reducerActions;
