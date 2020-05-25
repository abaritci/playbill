import axios from 'axios';
import {GET_ERRORS, DELETE_JOBS} from '../types';
import {jobApiRoutes} from '../../configs/routes';

export const deleteJob = (id) => dispatch => {
  axios.delete(jobApiRoutes.JOBS_ROUTE + `/${id}`)
  .then(() => {
    dispatch({
      type: DELETE_JOBS,
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
