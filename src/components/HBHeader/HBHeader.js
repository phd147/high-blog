import React, { useCallback, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";

// material ui
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  Grid,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

import classnames from "./HBHeader.module.css";

import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";

import cs from "classnames";

// react router
import { checkPathIsIncludeHeader } from "../../utils/HeaderUtil";
import SideBar from "../SideBar/SideBar";

import DefaultAvatar from "../../../public/default/default_user_avatar.png";
import { BASE_URL } from "../../constant";
import { removeToken } from "../../services/user.service";
import NotificationMenuList from "../Notification/NotificationMenuList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    height: "auto",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HBHeader(props) {
  const history = useHistory();

  const location = useLocation();

  const classes = useStyles();

  const userNickName = useSelector((state) => state.user.nickName);

  const userId = useSelector((state) => state.user.userId);

  const userRoles = useSelector((state) => state.user.roles);

  const imagePath = useSelector((state) => state.user.imagePath);

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = useCallback(() => {
    setDrawerState((oldState) => !oldState);
  }, []);

  // Popover
  const [anchorUserAvatar, setAnchorUserAvatar] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorUserAvatar(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorUserAvatar(null);
  };

  const handleNotificationClose = () => {
    setAnchorNotification(null);
  };

  const avatarOpen = Boolean(anchorUserAvatar);
  const avatarId = avatarOpen ? "avatar-popover" : undefined;
  const notificationOpen = Boolean(anchorNotification);
  const notificationId = notificationOpen ? "notification-popover" : undefined;
  //

  const searchRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value;
    console.log(searchValue);
    history.push(`/search?q=${searchValue}`);
  };

  const logoutHandler = () => {
    removeToken();
    history.push("/login");
  };

  return (
    <div>
      {!checkPathIsIncludeHeader(location) ? (
        <div className={classnames.hb_header}>
          <Drawer
            className={cs(classnames.hb_sidebar_container)}
            anchor="left"
            open={drawerState}
            onClose={toggleDrawer}
          >
            <SideBar />
          </Drawer>

          <Container className={classnames.hb_header_container}>
            {/* eslint-disable-next-line react/style-prop-object */}
            <Grid
              className={classnames.grid_header}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid
                item
                className={cs(
                  classnames.hb_header_left,
                  classnames.hb_header_item
                )}
              >
                <IconButton
                  style={{ marginLeft: "-12px" }}
                  className={cs(
                    classnames.hb_header_icon,
                    classnames.hb_header_menu_icon
                  )}
                >
                  <MenuIcon onClick={toggleDrawer} />
                </IconButton>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/")}
                >
                  <img
                    src="/img/highblog_logo.png"
                    alt="ko hien thi"
                    style={{ width: 150 }}
                  />
                </div>
              </Grid>
              <Grid
                item
                className={cs(
                  classnames.hb_header_item,
                  classnames.hb_header_right
                )}
              >
                <div
                  className={cs(classes.search, classnames.search_container)}
                >
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <form noValidate onSubmit={submitHandler}>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      inputRef={searchRef}
                    />
                  </form>
                </div>
                {userId ? (
                  <Button
                    className={cs(classnames.hb_header_button)}
                    onClick={() => history.push("/editor")}
                  >
                    Write a post
                  </Button>
                ) : null}

                <IconButton
                  className={cs(
                    classnames.hb_header_search_icon_xs,
                    classnames.hb_header_icon
                  )}
                >
                  <SearchIcon />
                </IconButton>

                {userId ? (
                  <div>
                    <IconButton onClick={handleNotificationClick}>
                      <NotificationsNoneOutlinedIcon
                        className={classnames.hb_header_icon}
                      />
                    </IconButton>
                    <Popover
                      id={notificationId}
                      open={notificationOpen}
                      anchorEl={anchorNotification}
                      onClose={handleNotificationClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <NotificationMenuList />
                    </Popover>
                  </div>
                ) : null}
                {!userId ? (
                  <Button onClick={() => history.push("/login")}>
                    {" "}
                    Sign In
                  </Button>
                ) : (
                  <div>
                    <IconButton
                      aria-describedby={avatarId}
                      onClick={handleAvatarClick}
                    >
                      <Avatar
                        alt="user avatar"
                        src={
                          imagePath ? BASE_URL + "/" + imagePath : DefaultAvatar
                        }
                      />
                    </IconButton>

                    <Popover
                      id={avatarId}
                      open={avatarOpen}
                      anchorEl={anchorUserAvatar}
                      onClose={handleAvatarClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            history.push(`/user/personal/${userNickName}`)
                          }
                        >
                          <div>
                            <Typography>Your page</Typography>
                            <Typography style={{ color: "#ccc" }}>
                              @{userNickName}
                            </Typography>
                          </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => history.push("/wallet")}>
                          Wallet
                        </MenuItem>
                        <MenuItem onClick={() => history.push("/edit-profile")}>
                          Edit profile
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </MenuList>
                    </Popover>
                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : // {userId ? (
      //   <Button
      //     className={cs(classnames.hb_header_button)}
      //     onClick={() => history.push("/editor")}
      //   >
      //     Write a post
      //   </Button>
      // ) : null}

      // <IconButton
      //   className={cs(
      //     classnames.hb_header_search_icon_xs,
      //     classnames.hb_header_icon
      //   )}
      // >
      //   <SearchIcon />
      // </IconButton>

      // {userId ? (
      //   <IconButton>
      //     <NotificationsNoneOutlinedIcon
      //       className={classnames.hb_header_icon}
      //     />
      //   </IconButton>
      // ) : null}
      // {!userId ? (
      //   <Button onClick={() => history.push("/login")}>
      //     {" "}
      //     Sign In
      //   </Button>
      // ) : (
      //   <IconButton
      //     onClick={() =>
      //       history.push(`/user/personal/${userNickName}`)
      //     }
      //   >
      //     <Avatar
      //       alt="user avatar"
      //       src={
      //         imagePath ? BASE_URL + "/" + imagePath : DefaultAvatar
      //       }
      //     />
      //   </IconButton>
      // )}
      // </Grid>
      // </Grid>
      // </Container>
      // </div>
      null}
    </div>
  );
}
