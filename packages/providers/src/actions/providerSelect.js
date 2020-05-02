import { PROVIDER_SELECT_REQUEST } from "../lib/types";

export const providerSelect = dispatch => () =>
  dispatch({
    type: PROVIDER_SELECT_REQUEST
  });
