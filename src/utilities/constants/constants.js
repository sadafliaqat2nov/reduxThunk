export const BASE_URL = '';
export const COLOR_LIGHT_ORANGE = '#F09866';
export const COLOR_DARK_ORANGE = '#F05423';
export const COLOR_PURPLE = '#642C75';
export const COLOR_LIGHT_PURPLE = '#CFB1C8';
export const COLOR_GREY = '#676767';
export const PLACEHOLDER_COLOR = 'grey';
export const DISABLE_COLOR_PURPLE = '#905883';
export const BLACK = '#000';
export const WHITE = '#F8F7F6';
export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
