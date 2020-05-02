/**
 * @function useCacheGetItem
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
  table: undefined
};

const REDUCER = (state, action) => {
  switch (action.type) {
    case "DELETE_ITEMS_REQUEST":
      return {
        ...state,
        lifecycle: LIFECYLE_IS_REQUEST,
        table: action.payload.table,
        filters: action.payload.filters
      };
    case "DELETE_ITEMS_SUCCESS":
      return {
        ...state,
        lifecycle: LIFECYLE_IS_SUCCESS,
        items: action.payload
      };
    case "DELETE_ITEMS_FAILURE":
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
export const useCacheDeleteItems = props => {
  const [state, dispatch] = React.useReducer(REDUCER, INITIAL_STATE);

  const get = ({ table, item }) => {
    dispatch({
      type: "DELETE_ITEMS_REQUEST",
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
          const deleted = await database[table]
            .where("name")
            .anyOf("")
            .delete();
          const items = await database[table].toArray(item);
          dispatch({
            type: "DELETE_ITEMS_SUCCESS",
            payload: deleted
          });
        } catch (error) {
          dispatch({
            type: "DELETE_ITEMS_SUCCESS",
            payload: error
          });
        }
      })();
    }
  }, [state.lifecycle]);

  return {
    get,
    items: state.items
  };
};
