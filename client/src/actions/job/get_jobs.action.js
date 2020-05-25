import axios from 'axios';
import {GET_JOBS_REQUEST,GET_JOBS_SUCCESS,GET_ERRORS_FAILURE} from '../types';
import {jobApiRoutes} from '../../configs/routes';

export const getJobs = (agency = 'playbill', string = null) => dispatch => {
    const search = string ? `?agency=${agency}&search=${string}` : `?agency=${agency}`;
    dispatch({
        type: GET_JOBS_REQUEST
    });
    axios.get(jobApiRoutes.JOBS_ROUTE + search)
        .then(response => {
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: GET_ERRORS_FAILURE,
                payload: error.toString()
            });
        });
}
