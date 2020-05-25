import React, {Component, Fragment} from "react";
import Routes from '../system/Router';
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {JWT_TOKEN} from '../../configs/tokens';

const styles = (theme) => (
  {});

class MainContainer extends Component {
  render() {
    const {isAuthenticated} = this.props.auth;
    const isLoggedIn = isAuthenticated || Boolean(localStorage.getItem(JWT_TOKEN));
    if (isLoggedIn) {
      return (
        <Fragment>
          <div className={"main-panel"}>
            <Routes/>
          </div>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <div className={"main"}>
            <Routes/>
          </div>
        </Fragment>)
    }
  }
}

MainContainer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.authReducer
  });

export default compose(
  withStyles(styles, {
    name: 'MainContainer',
  }),
  connect(mapStateToProps, {}),
)(MainContainer);

