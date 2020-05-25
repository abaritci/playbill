import axios from 'axios';
import {GET_ERRORS, EDIT_USER} from '../types';
import {userApiRoutes} from '../../configs/routes';

export const editUser = (userId, data) => dispatch => {
  axios.put(userApiRoutes.USER_ROUTE + `/${userId}`,data)
  .then(response => {
    dispatch({
      type: EDIT_USER,
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
