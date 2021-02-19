import * as TYPES from '../types';
const initialState = {
  user: null,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.SIGNUP:
      return {
        ...state,
        user: actions.payload,
      };
    case TYPES.LOGIN:
      return {
        ...state,
        user: actions.payload,
      };
    case TYPES.CURRENT_USER:
      return {
        ...state,
        user: actions.payload,
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        user: actions.payload,
      };
    default:
      return state;
  }
};
