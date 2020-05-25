import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => (
    {}));

export default function AddUser() {
    const classes = useStyles();
    return (
        <div id="add-user">
            <Button
                component={Link}
                variant="outlined"
                className={classes.button}
                startIcon={<AddIcon/>}
                to={'/register'}
            >
                Add Workspace
            </Button>
        </div>
    );
}
