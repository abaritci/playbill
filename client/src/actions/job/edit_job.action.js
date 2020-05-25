import axios from 'axios';
import {GET_ERRORS, EDIT_JOB} from '../types';
import {jobApiRoutes} from '../../configs/routes';

export const editJob = (jobId, data) => dispatch => {
  axios.put(jobApiRoutes.JOBS_ROUTE + `/${jobId}`,data)
  .then(response => {
    dispatch({
      type: EDIT_JOB,
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
