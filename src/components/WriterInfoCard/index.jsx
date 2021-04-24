import { Avatar, Button, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./WriterInfoCard.module.css";

WriterInfoCard.propTypes = {
  followed: PropTypes.bool,
  postOwner: PropTypes.object,
  userMeta: PropTypes.object,
  onFollowClick: PropTypes.func,
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
};

function WriterInfoCard(props) {
  const { postWriter, postOwner, userMeta, onFollowClick } = props;

  console.log("FOLLOW RENDER: ", postOwner);

  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    if (onFollowClick) {
      if (postOwner.followed) {
        onFollowClick(postOwner.nickName, "UNFOLLOW");
      } else onFollowClick(postOwner.nickName, "FOLLOW");
    }
  };
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
            <div>
              <Button
                fullWidth={true}
                className="follow-btn"
                variant={postOwner.followed ? "contained" : "outlined"}
                color="primary"
                onClick={handleClick}
              >
                {postOwner.followed ? "Unfollow" : "Follow me"}
              </Button>
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
