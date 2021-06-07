import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppBar, Box, Button, Card, CardContent, Grid, Tab, Tabs } from "@material-ui/core";
import "./Personal.css";
import { getUserDataByNickName, uploadImage } from "./Personal.service";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constant";
import { updateUserAvatar } from "../../store/action/userAction";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  CakeOutlined,
  LanguageOutlined,
  LocationOnOutlined,
} from "@material-ui/icons";
import { Container } from "react-bootstrap";
import ToggleButton from '@material-ui/lab/ToggleButton';
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import TypographyIcon from "../../components/TypographyIcon/TypographyIcon";
import moment from "moment";
import PostDetailsService from "../PostDetails/PostDetails.service";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import HttpStatus from "../../constants/HttpStatus";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MaleIcon from '@material-ui/icons/Male';
import FemaleIcon from '@material-ui/icons/Female';


Personal.propTypes = {};



function Personal(props) {

    let DefaultAvatar = "/default/default_user_avatar.png";
    let nickName = props.match.params.nickName;
    let dispatch = useDispatch();
    let [userData, setUserData] = useState({});
    let history = useHistory();
    let [value,setValue] = useState(0)
    const handleTabs = (e,val)=>{
      setValue(val);
    }

    //const personalNickName = useSelector(state => state.userReducer.nickName)


    useEffect(() => {
        console.log("Get user data");

    async function fetchData() {
      let userData = await getUserDataByNickName(nickName);

      if (userData == null) {
        history.push("/404");
      }

      setUserData(userData);
    }

    fetchData();
  }, []);

  let submitFile = useCallback(
    (event) => {
      let file = event.target.files[0];
      let targetName = event.target.name;
      uploadImage(targetName, file).then((newPath) => {
        if (targetName === "avatar") {
          console.log(userData);
          setUserData({ ...userData, imagePath: newPath });
          dispatch(updateUserAvatar(newPath));
        } else if (targetName === "background") {
          setUserData({ ...userData, backgroundPath: newPath });
        }
      });
    },
    [userData]
  );

  let currentUserProfile = useSelector((state) => state.user);
  let isCurrentLoginedUser = currentUserProfile.nickName === nickName;

  let avatarInputRef = useRef(null);
  let backgroundInputRef = useRef(null);
  let btnEditAvatar = null;
  let btnEditBackground = null;

  if (isCurrentLoginedUser) {
    btnEditAvatar = (
      <div>
        <EditIcon
          onClick={() => {
            avatarInputRef.current.click();
          }}
          className="personal__header__avatar__btn-edit"
          style={{ fontSize: 40 }}
        />
        <input
          type="file"
          hidden={true}
          name="avatar"
          ref={avatarInputRef}
          onChange={submitFile}
        />
      </div>
    );

    btnEditBackground = (
      <div className="personal__header__btn-edit-background">
        <Button
          variant="outlined"
          onClick={() => {
            backgroundInputRef.current.click();
          }}
          style={{
              backgroundColor: "rgba(255,255,255,0.8)"
          }}
        >
          <EditIcon style={{ paddingRight: 5 }} />
          Change
        </Button>
        <input
          type="file"
          hidden={true}
          name="background"
          ref={backgroundInputRef}
          onChange={submitFile}
        />
      </div>
    );
  }
  // console.log("bbb"+ userData.followed)
  // setPostDetails({...postDetails,user: {...postDetails.user, followed: userData.followed}});
  const location = useLocation();
  function handleUserLogged() {
    return new Promise((resolve) => {
      if (currentUserProfile.userId === "") {
        setTimeout(() => {
          history.push(`/login?redirect=${location.pathname}`);
          resolve(false);
        }, 1000);
        toast.error("Log in to continue");
      } else resolve(true);
    });
  }
  const handleFollowWriter = async (nickName, type) => {
    const logged = await handleUserLogged();
    if (logged) {
      if (type === "FOLLOW") {
        let result = await PostDetailsService.postFollow(nickName);
        if(result.status === HttpStatus.CREATED)
            setUserData({...userData, followed: true});
      } else if (type === "UNFOLLOW") {
        let result = await PostDetailsService.deleteFollow(nickName);
        
        if(result.status === HttpStatus.NO_CONTENT)
            setUserData({...userData, followed: false});
      }
    }
  };
  const handleSwitchNotification = async (nickName) => {
    await PostDetailsService.postSwitchNotification(nickName);
    setUserData({...userData, notified: !userData.notified});
  };
  {new Date(userData.createdDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
  return (
    <div>
      <div
        className="personal__header"
        style={{
          backgroundImage: `url("${
            userData.backgroundPath
              ? BASE_URL + "/" + userData.backgroundPath
              : DefaultAvatar
          }")`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="personal__header__avatar"
          style={{
            backgroundImage: `url("${
              userData.imagePath
                ? BASE_URL + "/" + userData.imagePath
                : DefaultAvatar
            }")`,
            backgroundSize: "cover",
          }}
        >
          {btnEditAvatar}
        </div>
        {btnEditBackground}
      </div>
      <div className="personal__header__info">
        <Typography variant="h6" align="center">
          @{userData.nickName}
        </Typography>
        <Typography variant="h4" align="center">
          {userData.firstName + " " + userData.lastName}
        </Typography>
        {!isCurrentLoginedUser && currentUserProfile.userId ? (
          <div style={{textAlign: "center", marginBottom: 10}}>
            <Button
              variant={userData.followed ? "contained" : "outlined"}
              color="primary"
              onClick={
                userData.followed
                  ? () => {
                      handleFollowWriter(userData.nickName, "UNFOLLOW");
                    }
                  : () => {
                      handleFollowWriter(userData.nickName, "FOLLOW");
                    }
              }
            >
              {userData.followed ? "Unfollow" : "Follow me"}
            </Button>
            {userData.followed && (
                <ToggleButton
                  style={{
                    height: "100%",
                    border: "none",
                    borderRadius: "50%",
                    marginLeft:3,
                  }}
                  value="notification"
                  selected={userData.notified}
                  onChange={()=>{handleSwitchNotification(userData.nickName)}}
                >
                  {userData.notified ? (
                    <NotificationsActiveIcon color="primary" />
                  ) : (
                    <NotificationsNoneIcon />
                  )}
                </ToggleButton>
              )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Container>
        <Grid container direction="row" justify="space-between" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  Introduce
                </Typography>
                {userData.bio && (
                  <Typography style={{ paddingTop: 7, paddingBottom: 7 }}>
                    {userData.bio}
                  </Typography>
                )}
                {userData.websiteUrl && (
                  <TypographyIcon iconComponent={<LanguageOutlined />}>
                    <a href={userData.websiteUrl}>{userData.websiteUrl}</a>
                  </TypographyIcon>
                )}
                {userData.location && (
                  <TypographyIcon iconComponent={<LocationOnOutlined />}>
                    {userData.location}
                  </TypographyIcon>
                )}
                {userData.genderType && (
                  userData.genderType === "MALE" ? (
                  <TypographyIcon iconComponent={<MaleIcon/>}>
                    Male
                  </TypographyIcon>
                ):(<TypographyIcon iconComponent={<FemaleIcon/>}>
                    Female
              </TypographyIcon>)
                )}
                <TypographyIcon iconComponent={<CakeOutlined />}>
                  Joined on {moment(userData.createdDate).format("YYYY-MM-DD")}
                </TypographyIcon>
                {userData.numberOfFollowers > 0 && (
                  <TypographyIcon iconComponent={<GroupAddIcon/>}>
                    Follower {userData.numberOfFollowers}
                  </TypographyIcon>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
          <AppBar position="static" color = "black"  style={{ background: '#ffffff', boxShadow: 'none'}}>
            <Tabs value = {value} onChange = {handleTabs} TabIndicatorProps={{style: {background:'blue'}}}>
              <Tab label = "Post"/>
              <Tab label = "Question"/>
            </Tabs>
          </AppBar>
            <TabPanel value = {value} index = {0}>
              <Posts
                type={PostType.PERSONAL_TYPE}
                initialParams={{ page: 1, pageSize: 10, nickName }}
              />
            </TabPanel>
            {/* <TabPanel value = {value} index = {2}>Item 3</TabPanel> */}
            <TabPanel value = {value} index = {1}>
              <Posts
                type={PostType.PERSONAL_QUESTION_TYPE}
                initialParams={{ page: 1, pageSize: 10, nickName }}
              />
            </TabPanel>
            
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function TabPanel(props){
  const {children, value, index} = props;
  return (
    <>
      {
        value === index && (
          <Typography> 
            <Box pt = {1}/>
           {children} 
          </Typography>
        )
      }
    </>
  )
}

export default Personal;