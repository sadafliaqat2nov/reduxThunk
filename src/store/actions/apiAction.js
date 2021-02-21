import * as TYPES from '../types';
import axios from 'axios';
import * as TASKS from '../actions/index';

export const getAPIData = () => {
  return (dispatch) => {
    dispatch(TASKS.showLoader());
    axios
      .get('https://reqres.in/api/users?page=1')
      .then((response) => {
        dispatch(getAPISuccess(response.data.data));
        dispatch(TASKS.hideLoader());
      })
      .catch((error) => {
        console.log(error);
        dispatch(TASKS.hideLoader());
      });
  };
};

const getAPISuccess = (payload) => {
  return {
    type: TYPES.GET_API_DATA,
    payload,
  };
};
