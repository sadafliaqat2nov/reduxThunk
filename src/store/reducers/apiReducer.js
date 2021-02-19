import * as TYPES from '../types';
const initialState = {
  apiData: null,
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_API_DATA:
      return {
        ...state,
        apiData: actions.payload,
      };
    default:
      return state;
  }
};
