import * as TYPES from '../types/index';
const initialState = {
  isLoading: false,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
