import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import '../../assets/scss/AdvancedSearch.scss';
import JobFilter from "./JobFilter";

const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    },
});
const theme = createMuiTheme({
    palette: {
        primary: green,
    }
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
             role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            {
                [
                    {
                        title: 'Filter by specialist level',
                        data: [
                            {
                                name: 'student',
                                label: 'Student',
                                value: false
                            },
                            {
                                name: 'junior',
                                label: 'Junior',
                                value: false
                            },
                            {
                                name: 'mid_level',
                                label: 'Mid Level',
                                value: false
                            },
                            {
                                name: 'senior',
                                label: 'Senior',
                                value: false
                            },
                            {
                                name: 'c_level',
                                label: 'C Level',
                                value: false
                            },
                        ],
                        initialState: {
                            student: false,
                            junior: false,
                            mid_level: false,
                            senior: false,
                            c_level: false,
                        }
                    },
                    // {
                    //     title: 'Filter by job category',
                    //     data: [
                    //         {
                    //             name: 'student',
                    //             label: 'Student'
                    //         },
                    //         {
                    //             name: 'junior',
                    //             label: 'Junior'
                    //         },
                    //         {
                    //             name: 'mid_level',
                    //             label: 'Mid Level'
                    //         },
                    //         {
                    //             name: 'senior',
                    //             label: 'Senior'
                    //         },
                    //         {
                    //             name: 'c_level',
                    //             label: 'C Level'
                    //         },
                    //     ],
                    //     initialState: {
                    //         student: false,
                    //         junior: false,
                    //         mid_level: false,
                    //         senior: false,
                    //         c_level: false,
                    //     }
                    // },
                    {
                        title: 'Filter by job types',
                        data: [
                            {
                                name: 'full_time',
                                label: 'Full time'
                            },
                            {
                                name: 'part_time',
                                label: 'Part Time'
                            },
                            {
                                name: 'training',
                                label: 'Training'
                            },
                            {
                                name: 'fixed_term_contract',
                                label: 'Fixed term contract'
                            },
                            {
                                name: 'tender',
                                label: 'Tender'
                            },
                            {
                                name: 'internship',
                                label: 'Internship'
                            },
                            {
                                name: 'other',
                                label: 'Other'
                            },
                        ],
                        initialState: {
                            full_time: false,
                            part_time: false,
                            training: false,
                            fixed_term_contract: false,
                            tender: false,
                            internship: false,
                            other: false,
                        }
                    },
                    {
                        title: 'Filter by job terms',
                        data: [
                            {
                                name: 'permanent',
                                label: 'Permanent'
                            },
                            {
                                name: 'temporary',
                                label: 'Temporary'
                            },
                            {
                                name: 'freelance',
                                label: 'Freelance'
                            },
                            {
                                name: 'contract',
                                label: 'Contract'
                            },
                            {
                                name: 'internship',
                                label: 'Internship'
                            },
                            {
                                name: 'other',
                                label: 'Other'
                            }
                        ],
                        initialState: {
                            permanent: false,
                            temporary: false,
                            freelance: false,
                            contract: false,
                            internship: false,
                            other: false,
                        }
                    },
                    {
                        title: 'Filter by job cities',
                        data: [
                            {
                                name: 'yerevan',
                                label: 'Yerevan'
                            },
                            {
                                name: 'gyumri',
                                label: 'Gyumri'
                            },
                            {
                                name: 'abovyan',
                                label: 'Abovyan'
                            },
                            {
                                name: 'aparan',
                                label: 'Aparan'
                            },
                            {
                                name: 'armenia',
                                label: 'Armenia'
                            },
                            {
                                name: 'ashtarak',
                                label: 'Ashtarak'
                            },
                            {
                                name: 'ejmiatsin',
                                label: 'Ejmiatsin'
                            },
                            {
                                name: 'kotayk',
                                label: 'Kotayk'
                            },
                        ],
                        initialState: {
                            yerevan: false,
                            gyumri: false,
                            abovyan: false,
                            aparan: false,
                            armenia: false,
                            ashtarak: false,
                            ejmiatsin: false,
                            kotayk: false,
                        }
                    }
                ].map((item, key) => (
                    <React.Fragment key={key}>
                        <JobFilter title={item.title} data={item.data} initialState={item.initialState}/>
                        <Divider/>
                    </React.Fragment>
                ))
            }
        </div>
    );

    return (
        <div id="advanced-search">
            <ThemeProvider theme={theme}>
                <Button
                    onClick={toggleDrawer('right', true)}
                    variant="contained"
                    color="primary"
                    startIcon={<FindReplaceIcon/>}
                >
                    Advanced Search
                </Button>
            </ThemeProvider>
            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
            </Drawer>
        </div>
    );
}
