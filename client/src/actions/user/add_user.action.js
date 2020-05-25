import axios from 'axios';
import {GET_ERRORS, ADD_USER} from '../types';
import {userApiRoutes} from '../../configs/routes';

export const addUser = (data) => dispatch => {
  axios.post(userApiRoutes.USER_ROUTE,data)
  .then(response => {
    dispatch({
      type: ADD_USER,
      payload: response.data
    });
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}
