import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import styles from "./WriterInfoCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

WriterInfoCard.propTypes = {
  postOwner: PropTypes.object,
  userMeta: PropTypes.object,
  onFollowClick: PropTypes.func,
};

WriterInfoCard.defaultProps = {
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

  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    if (onFollowClick) {
      if (postWriter.followed) {
        onFollowClick(postWriter.nickName, "UNFOLLOW");
      } else onFollowClick(postWriter.nickName, "FOLLOW");
    }
  };
  return (
    <div>
      <Card className="writer-info__container">
        <CardContent className="writer-info__inner">
          <div className="post-owner">
            <Link to="#">
              <img src={postOwner.avatar} alt="" />
              <span>
                {postOwner.firstName} {postOwner.lastName}
              </span>
            </Link>
          </div>
          <div className="user-intro">
            I am founder/CEO of DEVERO Corporation. Entrepreneur, developer,
            programmer, hacker, designer and blogger from Czechia.
          </div>
          {userInfo.userId !== postOwner.id ? (
            <div>
              <Button
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
