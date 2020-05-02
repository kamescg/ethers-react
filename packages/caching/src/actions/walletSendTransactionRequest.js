import { WALLET_SEND_TRANSACTION_REQUEST } from "../lib/types";
export const walletSendTransactionRequest = dispatch => transaction => {
  dispatch({
    type: WALLET_SEND_TRANSACTION_REQUEST,
    payload: transaction
  });
};
