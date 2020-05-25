import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authentication';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import GoogleIcon from "../partials/icons/GoogleIcon";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {createMuiTheme, ThemeProvider, withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {compose} from "redux";
import {green} from "@material-ui/core/colors";
import {ValidatorForm} from "react-material-ui-form-validator";
import '../../assets/scss/Login.scss';

const styles = (theme) => (
  {
    root: {
      margin: 'auto',
      width: '100%',
      maxWidth: 300,
      marginTop: 100
    },
    section: {
      margin: 'auto',
    },
    firstName: {
      width: '50%'
    },
    lastName: {
      width: '50%'
    },
    email: {
      width: '100%'
    },
    password: {
      width: '100%'
    },
    signUpGoogle: {
      width: '100%'
    },
    divider: {
      width: '45%',
      margin: 3
    }
  });
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    subtitle1: {
      fontSize: 10,
      margin: 6
    }
  },
});

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleClickShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  };
  
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(user);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  render() {
    const {errors, showPassword, email, password} = this.state;
    const {classes} = this.props;
    return (
      <div id='Login' className={classes.root}>
        <div className={classes.section}>
          <ValidatorForm id='hooryLoginForm' noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <Typography component="div">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Sign in to your account
                  </Box>
                </Typography>
              </Grid>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <FormControl className={clsx(classes.margin, classes.signUpGoogle)} variant="outlined">
                  <Button
                    variant="outlined"
                    startIcon={<GoogleIcon/>}
                  >
                    Sign up with Google
                  </Button>
                </FormControl>
              </Grid>
              
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <Divider className={classes.divider}/> or <Divider className={classes.divider}/>
              </Grid>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <FormControl className={clsx(classes.margin, classes.email)} variant="outlined">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    type={'text'}
                    value={email}
                    name={'email'}
                    onChange={this.handleInputChange}
                    className={classnames({
                      'is-invalid': errors.email
                    })}
                    labelWidth={70}
                    inputProps={{
                      autoComplete: 'email'
                    }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>)}
                </FormControl>
              </Grid>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <FormControl className={clsx(classes.margin, classes.password)} variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    name={'password'}
                    onChange={this.handleInputChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                      </InputAdornment>
                    }
                    className={classnames({
                      'is-invalid': errors.password
                    })}
                    labelWidth={70}
                    inputProps={{
                      autoComplete: 'password'
                    }}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>)}
                </FormControl>
              </Grid>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <Typography component="div">
                  <ThemeProvider theme={theme}>
                    <Button type={'submit'} variant="contained" color="primary">
                      Sign In
                    </Button>
                  </ThemeProvider>
                </Typography>
              </Grid>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                <ThemeProvider theme={theme}>
                  <Typography variant="subtitle1">Don't have an account?
                  </Typography>
                  <Typography variant="subtitle1">
                    <Link to="/register">
                      Sign Up
                    </Link>
                  </Typography>
                </ThemeProvider>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
  {
    auth: state.authReducer,
    errors: state.errorReducer
  })

export default compose(
  withStyles(styles, {
    name: 'Login',
  }),
  connect(mapStateToProps, {loginUser}
  ),
)(Login);
