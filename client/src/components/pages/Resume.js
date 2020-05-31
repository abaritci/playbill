import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import CV from 'react-cv'

const styles = (theme) => (
    {});

class Resume extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='resume'>
                <CV
                    personalData={{
                        name: 'Aren Amirjanyan',
                        title: 'Senior Software Engineer',
                        image: 'https://avatars2.githubusercontent.com/u/6552538',
                        contacts: [
                            {type: 'email', value: 'amirjanyan.aren@gmail.com'},
                            {type: 'phone', value: '+374(94)-49-87-98'},
                            {type: 'website', value: 'http://bluemagenta.me'},
                            {type: 'linkedin', value: 'https://www.linkedin.com/in/aren-amirjanyan-928386144/'},
                            {type: 'twitter', value: 'https://twitter.com/ArenAmirjanyan'},
                            {type: 'github', value: 'https://github.com/abaritci'}
                        ]
                    }}
                    sections={[
                        {
                            type: 'text',
                            title: 'Career Profile',
                            content: 'I am a Full Stack Engineer with industry experience building websites and web applications.Working with Node, React, Vue, Angular and PHP.',
                            icon: 'usertie'
                        },
                        {
                            type: 'common-list', // Available values ['text', 'common-list', 'projects-list', 'tag-list']
                            title: 'Education',
                            icon: 'graduation', // Available values ['graduation', 'book', 'comments', 'tasks', 'archive', 'rocket', 'language', 'cubes', 'usertie'] or FontAwesome SVG Icon
                            items: [ // Array of Objects(type:common-list) or Array of Strings(type:tag-list)
                                {
                                    title: 'Computer Systems and Informatics',
                                    authority: 'State Engineering University of Armenia',
                                    authorityMeta: 'Master\'s degree',
                                    authorityWebSite: 'https://polytech.am/',
                                    rightSide: '2005-2011'
                                }
                            ]
                        },
                        {
                            type: 'common-list', // Available values ['text', 'common-list', 'projects-list', 'tag-list']
                            title: 'Experience',
                            icon: 'cubes', // Available values ['graduation', 'book', 'comments', 'tasks', 'archive', 'rocket', 'language', 'cubes', 'usertie'] or FontAwesome SVG Icon
                            items: [ // Array of Objects(type:common-list) or Array of Strings(type:tag-list)
                                {
                                    title: 'Full Stack Engineer',
                                    authority: 'Preezma',
                                    authorityMeta: 'Yerevan, Armenia',
                                    authorityWebSite: 'https://preezma.com/',
                                    rightSide: 'Aug 2018 - Present'
                                },
                                {
                                    title: 'Full Stack Developer',
                                    authority: 'Flux Technologies',
                                    authorityMeta: 'Yerevan, Armenia',
                                    authorityWebSite: 'https://fluxtech.me',
                                    rightSide: 'Sep 2017 - May 2018'
                                },
                                {
                                    title: 'Web Programmer Team Lead',
                                    authority: 'Iguan Systems LLC',
                                    authorityMeta: 'Yerevan, Armenia',
                                    authorityWebSite: 'https://www.iguansystems.com/',
                                    rightSide: 'Jul 2014 - Sep 2017'
                                },
                                {
                                    title: 'Web Developer',
                                    authority: 'BigBrain',
                                    authorityMeta: 'Yerevan, Armenia',
                                    authorityWebSite: 'https://www.tidepoollabs.com/',
                                    rightSide: 'Sep 2013 - Jun 2014'
                                }
                            ]
                        },
                        {
                            type: 'projects-list', // Available values ['text', 'common-list', 'projects-list', 'tag-list']
                            title: 'Projects',
                            icon: 'book', // Available values ['graduation', 'book', 'comments', 'tasks', 'archive', 'rocket', 'language', 'cubes', 'usertie'] or FontAwesome SVG Icon
                            groups: [ // Array of Object, if type is only projects-list
                                { // Schema of single group object
                                    sectionHeader: 'My Jobs',
                                    description: 'Optional',
                                    items: [
                                        {
                                            title: 'iArmenia.am',
                                            projectUrl: 'http://iarmenia.am/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'iRent.am',
                                            projectUrl: 'http://irent.am/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'revolution.am',
                                            projectUrl: 'https://revolution.am/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'liberty.am',
                                            projectUrl: 'http://liberty.am/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'tirar-travel.com',
                                            projectUrl: 'http://tirar-travel.com/',
                                            description: 'Optional'
                                        },
                                    ]
                                },
                                { // Schema of single group object
                                    sectionHeader: 'Preezma',
                                    description: 'Optional',
                                    items: [
                                        {
                                            title: '3tailer.com',
                                            projectUrl: 'https://3tailer.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'Fupe.io',
                                            projectUrl: 'https://beta.fupe.io/',
                                            description: 'Optional'
                                        },
                                    ]
                                },
                                { // Schema of single group object
                                    sectionHeader: 'Flux',
                                    description: 'Optional',
                                    items: [
                                        {
                                            title: 'MMS',
                                            projectUrl: 'http://snabbmedia.se/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'esports-tickets.com',
                                            projectUrl: 'http://esports-tickets.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'audit.ngft.com',
                                            projectUrl: 'http://audit.ngft.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'onlymanuals.com',
                                            projectUrl: 'https://www.onlymanuals.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'ticketfairy.com',
                                            projectUrl: 'https://www.ticketfairy.com/',
                                            description: 'Optional'
                                        }
                                    ]
                                },
                                { // Schema of single group object
                                    sectionHeader: 'Iguan',
                                    description: 'Optional',
                                    items: [
                                        {
                                            title: 'Content Analytics',
                                            projectUrl: 'https://www.syndigo.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'playtagg.com',
                                            projectUrl: 'https://www.playtagg.com/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'bklabourhire.com',
                                            projectUrl: 'https://www.bklabourhire.com.au/',
                                            description: 'Optional'
                                        },
                                        {
                                            title: 'nzp-pro.com',
                                            projectUrl: 'https://nzp-pro.com/',
                                            description: 'Optional'
                                        },
                                    ]
                                },
                                { // Schema of single group object
                                    sectionHeader: 'BigBrain',
                                    description: 'Optional',
                                    items: [
                                        {
                                            title: 'mdsave.com',
                                            projectUrl: 'https://mdsave.com/',
                                            description: 'Optional'
                                        },
                                    ]
                                },
                            ],
                        },
                        {
                            type: 'tag-list',
                            title: 'Languages',
                            icon: 'language',
                            items: ['Armenian', 'Russian', 'English'
                            ]
                        },
                        {
                            type: 'tag-list',
                            title: 'Skills',
                            icon: 'rocket',
                            items: ['PHP', 'JavaScript', 'MySQL', 'PgSQL', 'MongoDB', 'React', 'Node', 'Angular']
                        }
                    ]}
                />
            </div>
        );
    }
}

Resume.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.authReducer,
        errors: state.errorReducer,
    });

export default compose(
    withStyles(styles, {
        name: 'Resume',
    }),
    connect(mapStateToProps, {}
    ),
)(Resume);
