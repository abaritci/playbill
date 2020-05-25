import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Navbar from "../partials/Navbar";
import {getJobs} from "../../actions/job/get_jobs.action";
import {deleteJob} from "../../actions/job/delete_jobs.action";
import AgencyJobs from "../partials/AgencyJobs";
import SimpleBackdrop from "../partials/SimpleBackdrop";


const styles = (theme) => (
    {});

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agency: 'playbill'
        }
    }

    componentDidMount() {
        const {agency} = this.state;
        this.props.getJobs(agency);
    }

    render() {
        const {jobs, gettingJobs} = this.props;
        return (
            <div id='jobs'>
                <Navbar
                    searchJob={(string) => {
                        const {agency} = this.state;
                        this.props.getJobs(agency, string)
                    }}
                />
                <SimpleBackdrop open={gettingJobs}/>
                <AgencyJobs data={jobs}
                            deleteJob={(id) => this.props.deleteJob(id)}
                            searchJob={(agency, string) => {
                                this.setState({agency});
                                this.props.getJobs(agency, string)
                            }}/>
            </div>
        );
    }
}

Jobs.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.authReducer,
        errors: state.errorReducer,
        job: state.jobReducer.job,
        jobs: state.jobReducer.jobs,
        gettingJobs: state.jobReducer.gettingJobs,
    });

export default compose(
    withStyles(styles, {
        name: 'Jobs',
    }),
    connect(mapStateToProps, {getJobs, deleteJob}
    ),
)(Jobs);
