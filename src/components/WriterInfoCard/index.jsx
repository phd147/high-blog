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
import "./WriterInfoCard.css";
import { Link } from "react-router-dom";

WriterInfoCard.propTypes = {
  postWriter: PropTypes.object,
  postOwner: PropTypes.object,
  userMeta: PropTypes.object,
  onFollowClick: PropTypes.func,
};

WriterInfoCard.defaultProps = {
  postWriter: {},
  postOwner: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
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
                {postWriter.firstName} {postWriter.lastName}
              </span>
            </Link>
          </div>
          <div className="user-intro">
            I am founder/CEO of DEVERO Corporation. Entrepreneur, developer,
            programmer, hacker, designer and blogger from Czechia.
          </div>
          <div>
            <Button
              className="follow-btn"
              variant={postWriter.followed ? "contained" : "outlined"}
              color="primary"
              onClick={handleClick}
            >
              {postWriter.followed ? "Unfollow" : "Follow me"}
            </Button>
          </div>
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
