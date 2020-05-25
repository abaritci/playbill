import React, {Component} from 'react';
import {Router, Switch, Route} from "react-router-dom";
import history from './../../core/history'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../setAuthToken';
import {setCurrentUser, logoutUser} from '../../actions/authentication';
import MainContainer from '../../components/layouts/MainContainer'
import '../../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {JWT_TOKEN} from '../../configs/tokens';


class App extends Component {
  render() {
    if (localStorage[JWT_TOKEN]) {
      setAuthToken(localStorage[JWT_TOKEN]);
      const decoded = jwt_decode(localStorage[JWT_TOKEN]);
      this.props.setCurrentUser(decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.logoutUser()
        window.location.href = '/login'
      }
    }
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={MainContainer}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => (
  {});
export default compose(
  withStyles({}, {
    name: 'App',
  }),
  connect(mapStateToProps, {setCurrentUser, logoutUser}),
)(App);
