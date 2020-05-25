import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Navbar from "../partials/Navbar";
import {getUsers} from "../../actions/user/get_users.action";
import {deleteUser} from "../../actions/user/delete_users.action";
import {getJobs} from "../../actions/job/get_jobs.action";
import {deleteJob} from "../../actions/job/delete_jobs.action";


const styles = (theme) => (
    {});

class Dashboard extends Component {
    componentDidMount() {
        this.props.getJobs();
    }

    render() {
        return (
            <div id='dashboard'>
                <Navbar/>
                {/*<UsersList*/}
                {/*  data={users}*/}
                {/*  deleteUser={(id) => this.props.deleteUser(id)}*/}
                {/*  searchUser={(string) => this.props.getUsers(string)}*/}
                {/*/>*/}
            </div>
        );
    }
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.authReducer,
        errors: state.errorReducer,
        user: state.userReducer,
        users: state.userReducer.users,
        job: state.jobReducer.job,
        jobs: state.jobReducer.jobs,
    });

export default compose(
    withStyles(styles, {
        name: 'Dashboard',
    }),
    connect(mapStateToProps, {getUsers, deleteUser, getJobs, deleteJob}
    ),
)(Dashboard);
