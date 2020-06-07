import {Route, Switch, Redirect} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Resume from "../pages/Resume";
import Pdf from "../pages/Pdf";
import NotFoundPage from "../pages/404";
import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {JWT_TOKEN} from '../../configs/tokens';

const styles = (theme) => (
  {});


/**
 * Private router function, depending on the login, render the necessary component
 * @param Component
 * @param isLoggedIn
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn
          ? (
            <Component {...props} />
          ) : (

            <Redirect
              to={{pathname: "/login", state: {from: props.location}}}
            />
          )
      }
    />
  );
};

/**
 * Public router function, depending on the login, render the necessary component
 * @param Component
 * @param isLoggedIn
 * @param rest
 * @returns {*}
 * @constructor
 */
const PublicRoute = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn
          ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: props.location.state ? props.location.state.from.pathname : '/dashboard',
                state: {from: props.location}
              }}
            />
          )}
    />
  );
};

class Router extends Component {

  render() {
    const {isAuthenticated} = this.props.auth;

    let isLoggedIn = isAuthenticated || Boolean(localStorage.getItem(JWT_TOKEN));

    return (
      <Switch>
        <PublicRoute path="/login" exact component={Login} isLoggedIn={isLoggedIn}/>
        <PublicRoute path="/register" exact component={Register} isLoggedIn={isLoggedIn}/>
        <PublicRoute path="/" exact component={Home} isLoggedIn={isLoggedIn}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard} isLoggedIn={isLoggedIn}/>
        <PrivateRoute path="/jobs" exact component={Jobs} isLoggedIn={isLoggedIn}/>
        <PrivateRoute path="/resume" exact component={Resume} isLoggedIn={isLoggedIn}/>
        <PrivateRoute path="/pdf" exact component={Pdf} isLoggedIn={isLoggedIn}/>
        <Route path="/404" exact component={NotFoundPage}/>
        <Redirect to='/404'/>
      </Switch>
    )
  }
}

Router.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.authReducer
  });

export default compose(
  withStyles(styles, {
    name: 'Router',
  }),
  connect(mapStateToProps, {}),
)(Router);
