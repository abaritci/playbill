import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "../../assets/scss/UserLists.scss";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange} from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import "../../assets/scss/Jobs.scss";

const useStyles = makeStyles((theme) => (
    {
        root: {
            flexGrow: 1,
            minWidth: 700,
            maxWidth: 700,
            height: 520,
            overflowY: 'scroll'
        },
        paper: {
            padding: theme.spacing(1),
            border: '1px solid #e0e4ec',
            marginBottom: 3,
            cursor: 'pointer',
            '&:hover': {
                background: '#dde9f3'
            },
        },
        image: {
            width: 60,
            height: 60,
        },
        img: {
            margin: 'auto',
            display: 'block !important',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        avatarContent: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
            textAlign: 'center'
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            paddingTop: 17,
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }));

export default function JobsList({data}) {
    const classes = useStyles();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        setJobs(data);
    }, [data]);
    return (
        <div className={classes.root}>
            {jobs.map((job, key) => (
                <React.Fragment key={key}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                {job.company.logo ? <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt={job.company.name} src={job.company.logo}/>
                                    </ButtonBase> :
                                    <div className={classes.avatarContent}>
                                        <Avatar className={classes.orange}
                                                alt={job.company.name}
                                        >{job.company.name.replace(/[&/\\#,«+()$~%.'":*?<>{}]/g, '').substring(0, 1)}</Avatar>
                                    </div>}
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {job.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {job.company.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item style={{textAlign: 'right'}}>
                                    {job.deadline ? <Typography variant="body2">
                                        <EventAvailableIcon color={'error'}/> {job.deadline}
                                    </Typography> : <Typography variant="body2">
                                        <DateRangeIcon color={'error'}/> Opened </Typography>}
                                    <Typography variant="body2" color="textSecondary">
                                        <LocationOnIcon color={'secondary'}/> {job.location}
                                    </Typography>
                                    <Typography variant="body2">
                                        <Link href={job.page} target={'_blank'}>
                                            <VisibilityIcon color={'secondary'} titleAccess={job.page}/>
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </React.Fragment>
            ))}
        </div>
    );
}
