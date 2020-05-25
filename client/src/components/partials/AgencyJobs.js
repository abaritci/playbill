import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import JobsList from "./JobsList";
import StaffLogo from '../../assets/staff.png';
import CareerCenterLogo from '../../assets/career_center.png';
import ProfessionalsLogo from '../../assets/professionals.png';
import HRLogo from '../../assets/hr.png';
import JobLogo from '../../assets/job.png';
import JobFinderLogo from '../../assets/jobfinder.png';
import BanksAmJobLogo from '../../assets/banks_am_job.png';
import MyJobLogo from '../../assets/my_job.png';
import HireLogo from '../../assets/hire.png';
import WorkNetLogo from '../../assets/work_net.png';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 545,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: 250
    },
    searchJob: {
        flexGrow: 1
    },
    providerImage: {

    },
}));

export default function AgencyJobs({data, deleteJob, searchJob}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [jobs, setJobs] = React.useState([]);
    useEffect(() => {
        setJobs(data);
    }, [data])
    const agencies = [
        {
            value: 'playbill',
            label : 'PlayBill'
        },
        {
            value: 'staff',
            label: <img className={classes.providerImage} alt={'Career Center'} src={StaffLogo}/>
        },
        {
            value: 'careerCenter',
            label: <img className={classes.providerImage} alt={'Career Center'} src={CareerCenterLogo}/>
        },
        {
            value: 'job_finder',
            label: <img className={classes.providerImage} alt={'Job Finder'} src={JobFinderLogo}/>
        },
        {
            value: 'hr',
            label: <img className={classes.providerImage} alt={'HR'} src={HRLogo}/>
        },
        {
            value: 'job',
            label: <img className={classes.providerImage} alt={'Job'} src={JobLogo}/>
        },
        {
            value: 'professionals',
            label: <img className={classes.providerImage} alt={'Professionals'} src={ProfessionalsLogo}/>
        },
        {
            value: 'my_job',
            label: <img className={classes.providerImage} alt={'My Job'} src={MyJobLogo}/>
        },
        {
            value: 'banks_am_job',
            label: <img className={classes.providerImage} alt={'Banks Am Job'} src={BanksAmJobLogo}/>
        },
        {
            value: 'hire',
            label: <img className={classes.providerImage} alt={'Hire'} src={HireLogo}/>
        },
        {
            value: 'work_net',
            label: <img className={classes.providerImage} alt={'Work Net'} src={WorkNetLogo}/>
        }
    ];
    const handleChange = (event, newValue) => {
        setValue(newValue);
        searchJob(agencies[newValue].value)
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {agencies.map((agency, key) => (
                        <Tab key={key} label={agency.label} {...a11yProps(key)} />
                    ))}
                </Tabs>
                {agencies.map((agency, key) => (
                    <TabPanel key={key} value={value} index={key}>
                        {jobs.length ? <JobsList
                            data={jobs}
                        /> : null}
                    </TabPanel>
                ))}
            </div>
        </React.Fragment>
    );
}
