/**
 * @summary Insert documentation for enhanceActions middleware
 * @param {Object} state the state object
 * @param {React.Dispatch} dispatch
 */
export const enhanceActions = (actions, state, dispatch) => {
  let enhanced = {};
  const keys = Object.keys(actions);
  keys.forEach(action => {
    enhanced[action] = actions[action](state, dispatch);
  });
  return enhanced;
};
