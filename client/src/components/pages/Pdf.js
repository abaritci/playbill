import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Navbar from "../partials/Navbar";
import {ReactReader, EpubView} from "react-reader";
import EPUBFile from '../../assets/AChristmasCarolAudioBook.epub';

const styles = (theme) => (
    {});

class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            epubcifi : "epubcfi(/6/2[cover]!/6)"
        }
    }

    render() {
        const {epubcifi} = this.state;
        return (
            <div id={'pdf'}>
                <Navbar
                    searchJob={(string) => {}}
                />
                <div style={{height: 550, width: 700}}>
                    <ReactReader
                        url={EPUBFile}
                        title={"Alice in wonderland"}
                        location={epubcifi}
                        locationChanged={epubcifi => {
                            this.setState({epubcifi});
                            console.log(epubcifi)
                        }}
                        swipeable={true}
                    />
                </div>
            </div>
        );
    }
}

Pdf.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.authReducer,
        errors: state.errorReducer,
    });

export default compose(
    withStyles(styles, {
        name: 'Pdf',
    }),
    connect(mapStateToProps, {}
    ),
)(Pdf);
