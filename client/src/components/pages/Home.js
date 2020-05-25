import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authentication";
import {editUser} from "../../actions/user/edit_user.action";
import {getUser} from "../../actions/user/get_user.action";
import {addUser} from "../../actions/user/add_user.action";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Navbar from "../partials/Navbar";

const styles = (theme) => (
    {});

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1>Home</h1>
            </div>
        );
    }
}

Home.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.authReducer,
        errors: state.errorReducer,
        user: state.userReducer.user
    });

export default compose(
    withStyles(styles, {
        name: 'Home',
    }),
    connect(mapStateToProps, {registerUser, addUser, getUser, editUser}
    ),
)(Home);
