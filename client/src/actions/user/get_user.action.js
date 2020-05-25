import axios from 'axios';
import {GET_ERRORS, GET_USER} from '../types';
import {userApiRoutes} from '../../configs/routes';

export const getUser = (userId) => dispatch => {
  axios.get(userApiRoutes.USER_ROUTE + `/${userId}`)
  .then(response => {
    dispatch({
      type: GET_USER,
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
