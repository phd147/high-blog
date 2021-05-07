import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ToggleButton from "@material-ui/lab/ToggleButton";
import styles from "./WriterInfoCard.module.css";
import DonationButton from "../DonationButton";

WriterInfoCard.propTypes = {
  followed: PropTypes.bool,
  postOwner: PropTypes.object,
  userMeta: PropTypes.object,
  onFollowClick: PropTypes.func,
  notiStatus: PropTypes.bool,
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
  } = props;

  const [noti, setNoti] = useState(false);

  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    if (onFollowClick) {
      if (postOwner.followed) {
        onFollowClick(postOwner.nickName, "UNFOLLOW");
      } else onFollowClick(postOwner.nickName, "FOLLOW");
    }
  };
  function handleNotiClick() {
    setNoti(!noti);
  }
  function handleDonateClick(amount) {
    if (onDonationSubmit) onDonationSubmit(postOwner.nickName, amount);
  }
  return (
    <div>
      <Card className={styles.container}>
        <CardContent className={styles.inner}>
          <div className={styles.post_owner}>
            <Link to="/view-profile" style={{ width: "100%" }}>
              <Avatar alt="user" src={postOwner.avatar} />
              <div style={{ marginLeft: "10px" }}>
                {postOwner.firstName} {postOwner.lastName}
              </div>
            </Link>
          </div>
          <div className={styles.bio}>
            I am founder/CEO of DEVERO Corporation. Entrepreneur, developer,
            programmer, hacker, designer and blogger from Czechia.
          </div>
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
                  {noti ? (
                    <NotificationsNoneIcon />
                  ) : (
                    <NotificationsActiveIcon />
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

          <div className="user-meta">
            <ul>
              {Object.keys(userMeta).map((key) => (
                <li key={key}>
                  <h5>{key}</h5>
                  <p>{userMeta[key]}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WriterInfoCard;
