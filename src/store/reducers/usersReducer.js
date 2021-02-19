import * as TYPES from '../types';
const initialState = {
  users: [],
  userID: 0,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.ADD_USER:
      return {
        ...state,
        users: actions.payload,
        userID: actions.increment,
      };
    case TYPES.REMOVE_USER:
      return {
        ...state,
        users: actions.payload,
      };
    case TYPES.UPDATE_USER:
      return {
        ...state,
        users: actions.payload,
      };
    default:
      return state;
  }
};
