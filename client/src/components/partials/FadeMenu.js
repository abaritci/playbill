import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Link} from 'react-router-dom';
import '../../assets/scss/FadeMenu.scss';

export default function FadeMenu({classes, user, onLogout}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
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
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem><Link className={classes.menuItem} to="/jobs">Jobs</Link></MenuItem>
                <MenuItem><Link className={classes.menuItem} to="/resume">Resume</Link></MenuItem>
                <MenuItem>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        endIcon={<ExitToAppIcon/>}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
}
