import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function JobFilter({title, data, initialState}) {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState);

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };
    useEffect(() => {
        return () => {
            setState(initialState);
        }
    }, [title, data, initialState])

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{title}</FormLabel>
                <FormGroup>
                    {data.map((item, key) => (
                        <FormControlLabel
                            key={key}
                            control={<Checkbox checked={state[item.name]} onChange={handleChange} name={item.name}/>}
                            label={item.label}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    );
}
