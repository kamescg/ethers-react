import {
  ENABLE_REQUEST,
  ENABLE_SUCCESS,
  ENABLE_FAILURE,
  PROVIDER_SET,
  PROVIDER_SET_MULTIPLE,
  PROVIDER_SET_STATUS,
  WALLET_SIGN_TYPED_MESSAGE_REQUEST,
  WALLET_SIGN_MESSAGE_REQUEST,
  INIT_CONTRACT_REQUEST,
  CONTRACT_INITIALIZE_REQUEST,
  CONTRACT_INITIALIZE_SUCCESS,
  CONTRACT_INITIALIZE_FAILURE,
  CONTRACT_DEPLOY_REQUEST,
  CONTRACT_DEPLOY_SUCCESS,
  CONTRACT_DEPLOY_FAILURE,
  CONTRACT_DEPLOY_FROM_BYTECODE_REQUEST,
  CONTRACT_DEPLOY_FROM_BYTECODE_SUCCESS,
  CONTRACT_DEPLOY_FROM_BYTECODE_FAILURE,
  BALANCE_SET,
  NONCE_SET,
  SET_NETWORK,
  ENS_ADDRESS_SET,
  WALLET_PROVIDER_GET_REQUEST,
  WALLET_PROVIDER_GET_SUCCESS,
  WALLET_PROVIDER_GET_FAILURE,
  WALLET_SEND_TRANSACTION_REQUEST,
  WALLET_SEND_TRANSACTION_SUCCESS,
  WALLET_SEND_TRANSACTION_FAILURE,
  SIGNER_GET_REQUEST,
  SIGNER_GET_SUCCESS,
  SIGNER_GET_FAILURE,
  SET_WALLET,
  SET_WALLET_FAILURE,
  SET_ADDRESS,
  TRANSACTION_MONITOR_REQUEST,
  TRANSACTION_MONITOR_SUCCESS,
  TRANSACTION_MONITOR_FAILURE,
  CONTRACT_DEPLOY_MONITOR_SUCCESS,
  CONTRACT_DEPLOY_MONITOR_FAILURE
} from "./types";

import {
  CONTRACT_DEPLOY_SUBMITTED,
  CONTRACT_DEPLOY_COMPLETE,
  CONTRACT_DEPLOY_REJECTED,
  TRANSACTION_SUBMITTED,
  TRANSACTION_COMPLETE,
  TRANSACTION_REJECTED
} from "./status";

const reducerActions = (state, action) => {
  switch (action.type) {
    /* ----------------------- */
    /*         Wallet          */
    /* ----------------------- */
    case WALLET_SEND_TRANSACTION_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          transactions: [
            ...state.requests.transactions,
            {
              ...action
            }
          ]
        }
      };
    case WALLET_SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        requests: {
          ...state.requests,
          transactions: []
        },
        activity: {
          ...state.activity,
          transactions: {
            ...state.activity.transactions,
            [action.payload.hash]: {
              status: TRANSACTION_SUBMITTED,
              payload: action.payload
            }
          }
        }
      };
    case TRANSACTION_MONITOR_SUCCESS:
      return {
        ...state,
        activity: {
          ...state.activity,
          transactions: {
            ...state.activity.transactions,
            [action.payload.transactionHash]: {
              ...state.activity.transactions[action.payload.transactionHash],
              status: TRANSACTION_COMPLETE,
              complete: action.payload
            }
          }
        }
      };
    case WALLET_SEND_TRANSACTION_FAILURE:
      return {
        ...state,
        requests: {
          ...state.requests,
          transactions: [],
          activity: [
            ...state.activity,
            {
              status: TRANSACTION_REJECTED,
              payload: action.payload
            }
          ]
        }
      };
    case TRANSACTION_MONITOR_FAILURE:
      return {
        ...state,
        activity: {
          transactions: [
            ...state.activity.transactions,
            {
              ...state.activity.transactions[action.payload.transactionHash],
              status: TRANSACTION_REJECTED,
              error: action.payload
            }
          ]
        }
      };
    case WALLET_SIGN_TYPED_MESSAGE_REQUEST:
      return {
        ...state,
        store: {
          ...state.store,
          messages: [
            ...state.store.messages,
            {
              ...action
            }
          ]
        }
      };
    case WALLET_SIGN_MESSAGE_REQUEST:
      return {
        ...state,
        messages: {
          [id]: action.payload
        }
      };

    default:
      return state;
  }
};

export default reducerActions;
