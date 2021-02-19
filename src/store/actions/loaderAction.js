import * as TYPES from '../types/index';

export const showLoader = () => {
  return {
    type: TYPES.SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: TYPES.HIDE_LOADER,
  };
};
