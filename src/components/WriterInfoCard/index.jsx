import { Avatar, Button, Card, CardContent, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ToggleButton from "@material-ui/lab/ToggleButton";
import styles from "./WriterInfoCard.module.css";
import DonationButton from "../DonationButton";
import moment from "moment";
import TypographyIcon from "../../components/TypographyIcon/TypographyIcon";
import { CakeOutlined, LanguageOutlined, LocationOnOutlined } from "@material-ui/icons";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MaleIcon from '@material-ui/icons/Male';
import FemaleIcon from '@material-ui/icons/Female';

WriterInfoCard.propTypes = {
  followed: PropTypes.bool,
  postOwner: PropTypes.object,
  userMeta: PropTypes.object,
  onFollowClick: PropTypes.func,
  notiStatus: PropTypes.bool,
  onNotiClick: PropTypes.func,
  onDonationSubmit: PropTypes.func,
  isDonateLoading: PropTypes.bool,
};

WriterInfoCard.defaultProps = {
  followed: false,
  postOwner: {},
  userMeta: {
    work: "CEO, software engineer at Devero",
    location: "Prague, CZE",
    education: "self-taught",
    joined: "4 thg 7, 2020",
  },
  onFollowClick: null,
  notiStatus: false,
  onNotiClick: null,
  onDonationSubmit: null,
  isDonateLoading: false,
};

function WriterInfoCard(props) {
  const {
    postWriter,
    postOwner,
    userMeta,
    onFollowClick,
    notiStatus,
    onDonationSubmit,
    isDonateLoading,
    onNotiClick,
  } = props;

  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    if (onFollowClick) {
      if (postOwner.followed) {
        onFollowClick(postOwner.nickName, "UNFOLLOW");
      } else onFollowClick(postOwner.nickName, "FOLLOW");
    }
  };

  function handleNotiClick() {
    if (onNotiClick) onNotiClick(postOwner.nickName);
  }
  function handleDonateClick(amount) {
    if (onDonationSubmit) onDonationSubmit(postOwner.nickName, amount);
  }
  return (
    <div>
      <Card className={styles.container}>
        <CardContent className={styles.inner}>
          <div className={styles.post_owner}>
            <Link
              to={`/user/personal/${userInfo.nickName}`}
              style={{ width: "100%" }}
            >
              <Avatar alt="user" src= {postOwner.imagePath ? ("https://highblog.codes/" + postOwner.imagePath): ("")}/>
              <div style={{ marginLeft: "10px" }}>
                {postOwner.firstName} {postOwner.lastName}
              </div>
            </Link>
          </div>
          {postOwner.bio && (
          <div className={styles.bio}>
            {postOwner.bio}
          </div>)}
          {userInfo.userId !== postOwner.id ? (
            <div className={styles.btn_group}>
              <Button
                className={styles.btn}
                variant={postOwner.followed ? "contained" : "outlined"}
                color="primary"
                onClick={handleClick}
              >
                {postOwner.followed ? "Unfollow" : "Follow me"}
              </Button>
              {postOwner.followed && (
                <ToggleButton
                  style={{
                    height: "100%",
                    border: "none",
                    borderRadius: "50%",
                  }}
                  value="notification"
                  selected={notiStatus}
                  onChange={handleNotiClick}
                >
                  {postOwner.notified ? (
                    <NotificationsActiveIcon color="primary" />
                  ) : (
                    <NotificationsNoneIcon />
                  )}
                </ToggleButton>
              )}

              <DonationButton
                onDonateClick={handleDonateClick}
                isDonateLoading={isDonateLoading}
              />
            </div>
          ) : (
            <></>
          )}

          {/* <div className="user-meta">
            <ul>
              {Object.keys(userMeta).map((key) => (
                <li key={key}>
                  <h5>{key}</h5>
                  <p>{userMeta[key]}</p>
                </li>
              ))}
            </ul>
          </div> */}
                {postOwner.websiteUrl && (
                  <TypographyIcon iconComponent={<LanguageOutlined />}>
                    <a href={postOwner.websiteUrl}>{postOwner.websiteUrl}</a>
                  </TypographyIcon>
                )}
                {postOwner.location && (
                  <TypographyIcon iconComponent={<LocationOnOutlined />}>
                    {postOwner.location}
                  </TypographyIcon>
                )}
                {postOwner.genderType && (
                  postOwner.genderType === "MALE" ? (
                  <TypographyIcon iconComponent={<MaleIcon/>}>
                    Male
                  </TypographyIcon>
                ):(<TypographyIcon iconComponent={<FemaleIcon/>}>
                    Female
              </TypographyIcon>)
                )}
                <TypographyIcon iconComponent={<CakeOutlined />}>
                  Joined on {moment(postOwner.createdDate).format("YYYY-MM-DD")}
                </TypographyIcon>
                {postOwner.numberOfFollowers > 0 && (
                  <TypographyIcon iconComponent={<GroupAddIcon/>}>
                    Follower {postOwner.numberOfFollowers}
                  </TypographyIcon>
                )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WriterInfoCard;
