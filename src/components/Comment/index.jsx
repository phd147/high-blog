import React from "react";
import PropTypes from "prop-types";
import "./Comment.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { IconButton } from "@material-ui/core";
Comment.propTypes = {
  commentOwner: PropTypes.object,
  commentMeta: PropTypes.object,
};

Comment.defaultProps = {
  commentOwner: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
  commentMeta: {
    createAt: "4 thg 4",
    content:
      "Last week I got a React website to talk to Mailchimp. I have gone to school and studied there. After that, we, I and my friends playing soccer at the local stadium ",
  },
};

function Comment(props) {
  const { commentOwner, commentMeta } = props;
  return (
    <div className="comment__container">
      <Link to="#">
        <img className="comment__avatar" src={commentOwner.avatar} alt="" />
      </Link>
      <div className="comment__inner">
        <div className="comment__card">
          <div className="comment__card-header">
            <Link to="#">
              <span className="comment__owner">{commentOwner.username}</span>
            </Link>
            {"\u2022"}
            <span className="comment__date">{commentMeta.createAt}</span>
          </div>
          <p>{commentMeta.content}</p>
        </div>

        <div className="comment__reaction">
          <div className="comment__reaction-favorite">
            <IconButton>
              <FavoriteBorderOutlinedIcon />
              <span className="comment__reaction-count">3</span>
            </IconButton>
          </div>
          <div className="comment__reaction-reply">
            <IconButton>
              <ModeCommentOutlinedIcon />
              <span className="comment__reaction-count">1</span>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
