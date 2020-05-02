import {
  SET_PROVIDER,
  PROVIDER_SELECT_REQUEST,
  PROVIDER_SELECT_SUCCESS,
  PROVIDER_SELECT_FAILURE
} from "./types";

const reducerActions = (state, action) => {
  switch (action.type) {
    case PROVIDER_SELECT_REQUEST:
      return {
        ...state,
        isSelectedProviderRequested: true
      };
    case PROVIDER_SELECT_SUCCESS:
      return {
        ...state,
        isSelectedProviderSuccess: true,
        isSelectedProviderRequested: false
      };
    case PROVIDER_SELECT_FAILURE:
      return {
        ...state,
        isSelectedProviderRequested: false,
        isSelectedProviderSuccess: false
      };
    case SET_PROVIDER:
      return {
        ...state,
        provider: action.payload
      };
    default:
      return state;
  }
};

export default reducerActions;
