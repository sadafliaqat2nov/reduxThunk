import * as TYPES from '../types';
const initialState = {
  products: [],
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: actions.payload,
      };
    case TYPES.REMOVE_PRODUCT:
      return {
        ...state,
        products: actions.payload,
      };
    case TYPES.UPDATE_QTY:
      return {
        ...state,
        products: actions.payload,
      };
    default:
      return state;
  }
};
