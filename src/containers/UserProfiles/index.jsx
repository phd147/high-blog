import React, { useEffect } from 'react';
import {Grid} from '@material-ui/core';
import ScrollableTabsButtonAuto from '../../components/UserProfileContent';
import AvatarProfile from '../../components/AvatarProfile';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailAction } from '../../store/action/profileAction';

function UserProfile(props) {
  const nickName = props.match.params.nickname
  const userDetail = useSelector((state) => state.userDetails);
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(userDetailAction(nickName));
  },[dispatch]);
    return (
        <Grid container spacing={2}>
          <Grid  item xs={12} ms ={12} md = {12} >
            <AvatarProfile 
            background = {userDetail.payload.backgroundPath}
            avatar = {userDetail.payload.imagePath}
            nickName = {userDetail.payload.nickName}
            />
          </Grid>
          <Grid container justify = "center">
            <Grid item xs={7} ms = {9} md ={10}>
            <ScrollableTabsButtonAuto/>
            </Grid>
          </Grid>
        </Grid>
    )
}

export default UserProfile
