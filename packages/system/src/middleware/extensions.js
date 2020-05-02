/**
 * @function combineExtensionInitialState
 * @description Wrap extenion actions with dispatch
 */
export const combineExtensionInitialState = extensions =>
  extensions
    .map(({ name, initialState, settings }) => {
      return { name, initialState, settings };
    })
    .reduce((acc = {}, { name, initialState, settings }) => {
      return {
        ...acc,
        ...initialState,
        settings: { ...acc.settings, [name]: settings }
      };
    }, {});

/**
 * @function combineExtensionsReducers
 * @description Wrap extenion actions with dispatch
 */
export const combineExtensionsReducers = extensions => {
  return (state = {}, action) => {
    let nextState = state;
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext.reducer) {
        const nextStateForKey = ext.reducer(nextState, action);
        nextState = { ...nextState, ...nextStateForKey };
      }
    }
    return nextState;
  };
};

/**
 * @function enhanceExtensionActions
 * @description Wrap extenion actions with dispatch
 */
export const enhanceExtensionActions = (extensions, dispatch) => {
  if (Array.isArray(extensions) && extensions.length > 0) {
    let actions = {};
    extensions.forEach(extension => {
      if (extension.actions) {
        Object.keys(extension.actions).forEach(action => {
          actions[action] = extension.actions[action](dispatch);
        });
      }
    });
    return actions;
  }
};

/**
 * @function extensionsInitialize
 * @description
 */
export const extensionsInitialize = (extensions, state, dispatch) => {
  if (Array.isArray(extensions) && extensions.length > 0) {
    return extensions.map(extension => {
      return Object.values(extension.hooks).map(effect =>
        effect(state, dispatch)
      );
    });
  } else {
    return null;
  }
};
