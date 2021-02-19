import * as TYPES from '../types';

export const signup = (payload) => {
  return {
    type: TYPES.SIGNUP,
    payload: payload,
  };
};

export const login = (payload) => {
  return {
    type: TYPES.LOGIN,
    payload: payload,
  };
};

export const currentUser = (payload) => {
  return {
    type: TYPES.CURRENT_USER,
    payload: payload,
  };
};

export const logoutUser = (payload) => {
  return {
    type: TYPES.LOGOUT,
    payload,
  };
};
