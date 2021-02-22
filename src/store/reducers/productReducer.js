import * as TYPES from '../types';
const initialState = {
  products: [],
  cartProducts: [],
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: actions.payload,
      };
    case TYPES.ADD_TO_CART:
      return {
        ...state,
        cartProducts: actions.payload,
      };
    case TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: actions.payload,
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
