import axios from 'axios';
import {GET_ERRORS, GET_JOB} from '../types';
import {jobApiRoutes} from '../../configs/routes';

export const getJob = (jobId) => dispatch => {
  axios.get(jobApiRoutes.JOBS_ROUTE + `/${jobId}`)
  .then(response => {
    dispatch({
      type: GET_JOB,
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
