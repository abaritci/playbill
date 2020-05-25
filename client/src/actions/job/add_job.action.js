import axios from 'axios';
import {GET_ERRORS, ADD_JOB} from '../types';
import {jobApiRoutes} from '../../configs/routes';

export const addJob = (data) => dispatch => {
  axios.post(jobApiRoutes.JOBS_ROUTE,data)
  .then(response => {
    dispatch({
      type: ADD_JOB,
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
