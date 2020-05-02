/**
 * @function useCacheSetItem
 * @param {Object} props
 * @version 0.0.0
 * @description
 */

/* --- Global --- */
import { useEffect } from "react";
/* --- Local --- */
import { database } from "../database";

const LIFECYLE_IS_REQUEST = "LIFECYLE_IS_REQUEST";
const LIFECYLE_IS_SUCCESS = "LIFECYLE_IS_SUCCESS";
const LIFECYLE_IS_FAILURE = "LIFECYLE_IS_FAILURE";
const INITIAL_STATE = {
  table: undefined,
  index: undefined
};

const REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_ITEM_REQUEST":
      return {
        ...state,
        lifecycle: LIFECYLE_IS_REQUEST,
        table: action.payload.table,
        item: action.payload.item
      };
    case "SET_ITEM_SUCCESS":
      return {
        ...state,
        lifecycle: LIFECYLE_IS_SUCCESS,
        index: action.payload
      };
    case "SET_ITEM_FAILURE":
      return {
        lifecycle: LIFECYLE_IS_FAILURE,
        err: action.payload,
        ...state
      };
    default:
      throw new Error();
  }
};

/* --- Effect --- */
export const useCacheSetItem = props => {
  const [state, dispatch] = React.useReducer(REDUCER, INITIAL_STATE);

  const set = ({ table, item }) => {
    dispatch({
      type: "SET_ITEM_REQUEST",
      payload: {
        table,
        item
      }
    });
  };

  useEffect(() => {
    if (state.lifecycle === LIFECYLE_IS_REQUEST) {
      (async () => {
        const { table, item } = state;
        try {
          const index = await database[table].add(item);
          console.log(index, "indexindex");
          dispatch({
            type: "SET_ITEM_SUCCESS",
            payload: index
          });
        } catch (error) {
          dispatch({
            type: "SET_ITEM_SUCCESS",
            payload: error
          });
        }
      })();
    }
  }, [state.lifecycle]);

  return {
    set,
    index: state.index
  };
};
