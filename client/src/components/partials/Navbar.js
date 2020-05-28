import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authentication';
import Avatar from '@material-ui/core/Avatar';
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import '../../assets/scss/Navbar.scss';
import Grid from "@material-ui/core/Grid";
import Search from "./Search";
import AdvancedSearch from "./AdvancedSearch";
import Logo from "../../assets/playbill.png";

const styles = (theme) => (
    {
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        header: {
            padding: 5
        },
        logoLink: {
            color: '#a72e2e',
            fontWeight: 600,
            "&:hover": {
                color: '#4a1010',
                textDecoration: 'none'
            }
        },
        avatar: {
            float: 'left'
        },
        info: {
            margin: 10
        },
        profileInfo: {
            marginLeft: 10
        }
    });

class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {classes} = this.props;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Button
                    variant="outlined"
                    className={classes.button}
                    endIcon={<ExitToAppIcon/>}
                    onClick={this.onLogout.bind(this)}
                >
                    Logout
                </Button>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
            </ul>
        )
        return (
            <div id='navbar'>
                <nav className="navbar navbar-expand-lg navbar-light">
                    {isAuthenticated && <Grid container item xs={12}>
                        <Grid item xs={1}>
                            <Card className={classes.root} variant="outlined">
                                <Link className={classes.logoLink} to={'/'}>
                                    <Avatar src={Logo} alt={'PlayBill'} className={classes.avatar}/>
                                    <div className={classes.info}>PlayBill</div>
                                </Link>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className={classes.profileInfo}>
                            <Card className={classes.root} variant="outlined">
                                <CardHeader
                                    avatar={
                                        <Avatar src={user.avatar} alt={user.name} title={user.name}
                                                className={classes.avatar}/>
                                    }
                                    title={user.firstName + ' ' + user.lastName}
                                    subheader={user.email}
                                    className={classes.header}
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Search label={"Search Job"} search={(string) => this.searchJob(string)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <AdvancedSearch/>
                        </Grid>
                    </Grid>}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
    {
        auth: state.authReducer
    })

export default compose(
    withStyles(styles, {
        name: 'Navbar',
    }),
    connect(mapStateToProps, {logoutUser}
    ),
)(Navbar);
