import { ENABLE_REQUEST } from "../lib/types";

export const enableRequest = (state, dispatch) => () => {
  dispatch({
    type: ENABLE_REQUEST
  });
};
