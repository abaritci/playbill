import {
    ADD_JOB,
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_ERRORS_FAILURE,
    DELETE_JOBS,
    GET_JOB,
    EDIT_JOB
} from '../actions/types';

const initialState = {
    jobs: [],
    job: {},
    gettingJobs: false,
    getJobsSuccess: false,
    getJobsError: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JOBS_REQUEST:
            return {
                ...state,
                gettingJobs: true,
                getJobsSuccess: false
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.payload,
                gettingJobs: false,
                getJobsSuccess: true
            }
        case GET_ERRORS_FAILURE:
            return {
                ...state,
                getJobsError: action.payload,
                gettingJobs: false,
                getJobsSuccess: false
            }
        case GET_JOB:
            return {
                ...state,
                job: action.payload
            }
        case EDIT_JOB:
            return {
                ...state,
                job: action.payload
            }
        case ADD_JOB:
            return {
                ...state,
                job: action.payload
            }
        case DELETE_JOBS: {
            return {
                ...state,
                jobs: state.jobs.filter((job) => job._id !== action.payload)
            }
        }
        default:
            return state;
    }
}
