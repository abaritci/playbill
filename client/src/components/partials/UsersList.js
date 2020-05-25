import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "../../assets/scss/UserLists.scss";
import {Link} from 'react-router-dom';
import Search from "./Search";
import AddUser from "./AddUser";

const useStyles = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
            maxWidth: 350,
            margin: 'auto',
            width: '100%'
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }));

export default function UsersList({data, deleteUser, searchUser}) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [actions, setActions] = useState({});
    const showActions = (userId) => {
        setActions({[userId]: !actions[userId]});
    };

    useEffect(() => {
        setUsers(data);
    }, [data]);

    return (
        <div id="users-list" className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" className={classes.title}>
                        Users
                    </Typography>
                    <div className={classes.demo}>
                        <div id="search-user">
                            <Search label={"Search User"} search={(string) => searchUser(string)}/>
                        </div>
                        <List>
                            {users.map((user, key) => (
                                <ListItem key={key}>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={user.firstName + ' ' + user.lastName}
                                    />
                                    <ListItemSecondaryAction>
                                        {actions[user._id] &&
                                        <IconButton edge="end" aria-label="delete" component={Link}
                                                    to={'/edit-user/' + user._id}>
                                            <EditIcon/>
                                        </IconButton>}
                                        {actions[user._id] &&
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user._id)}>
                                            <DeleteIcon/>
                                        </IconButton>}
                                        <IconButton edge="end" aria-label="delete"
                                                    onMouseEnter={() => showActions(user._id)}
                                                    onMouseDown={() => showActions(user._id)}
                                        >
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <AddUser/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
