import axios from 'axios';
import {GET_ERRORS, GET_USERS} from '../types';
import {userApiRoutes} from '../../configs/routes';

export const getUsers = (string = null) => dispatch => {
  const search = string ? `?search=${string}` : '';
  axios.get(userApiRoutes.USERS_ROUTE + search)
  .then(response => {
    dispatch({
      type: GET_USERS,
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
