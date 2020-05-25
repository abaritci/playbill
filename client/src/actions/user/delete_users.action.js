import axios from 'axios';
import {GET_ERRORS, DELETE_USERS} from '../types';
import {userApiRoutes} from '../../configs/routes';

export const deleteUser = (id) => dispatch => {
  axios.delete(userApiRoutes.USERS_ROUTE + `/${id}`)
  .then(() => {
    dispatch({
      type: DELETE_USERS,
      payload: id
    });
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}
