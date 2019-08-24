import React from 'react';
import { Grid } from '@material-ui/core';


export default class About extends React.Component {
    render() {
        return (
            <div className="input-middle-paper">
            <Grid container direction="column" style={{paddingTop: '5%'}} alignItems="center">
                <h1 className="about-header">How does it work?</h1>
                <p className="about-text">
                </p>
                </Grid>
            </div>
        )
    }
}