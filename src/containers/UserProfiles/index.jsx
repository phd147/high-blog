import React from 'react';
import {Grid} from '@material-ui/core';
import ScrollableTabsButtonAuto from './Tabs';
import AvatarProfile from '../../components/AvatarProfile';

function UserProfile() {

    return (
        <Grid container spacing={2}>
          <Grid  item xs={12} ms ={12} md = {12} >
            <AvatarProfile/>
          </Grid>
          <Grid container justify = "center">
            <Grid item xs={12} ms = {12} md ={10}>
            <ScrollableTabsButtonAuto/>
            </Grid>
          </Grid>
        </Grid>
    )
}

export default UserProfile
