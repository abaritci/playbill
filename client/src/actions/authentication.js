import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER, CREATE_USER} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {authApiRoutes} from '../configs/routes';
import {JWT_TOKEN} from '../configs/tokens';

export const registerUser = (user) => dispatch => {
  axios.post(authApiRoutes.REGISTER_ROUTE, user)
  .then(response => {
    dispatch({
      type: CREATE_USER,
      payload: response
    });
  })
  .catch(errors => {
    dispatch({
      type: GET_ERRORS,
      payload: errors.response.data
    });
  });
}

export const loginUser = (user) => dispatch => {
  axios.post(authApiRoutes.LOGIN_ROUTE, user)
  .then(res => {
    const {token} = res.data;
    localStorage.setItem(JWT_TOKEN, token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const setCurrentUser = (decoded) => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem(JWT_TOKEN);
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
}
