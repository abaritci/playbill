import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => (
  {
    root: {
      display: 'flex',
      alignItems: 'center',
      width: 350,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }));

export default function Search({search, label}) {
  const classes = useStyles();
  const [string, setString] = useState('');
  const changeString = (event) => {
    setString(event.target.value);
    search(event.target.value);
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={label}
        inputProps={{'aria-label': 'search google maps'}}
        onChange={changeString}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          search(string)
        }}>
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
}
