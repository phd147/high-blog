import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Comment.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import MyComment from "../MyComment";
Comment.propTypes = {
  owner: PropTypes.object,
  content: PropTypes.string,
  id: PropTypes.number,
  numberOfVotes: PropTypes.number,
  numberOfReply: PropTypes.number,
  onReplySubmit: PropTypes.func,
};

Comment.defaultProps = {
  owner: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
  content: "",
  id: null,
  numberOfVotes: 0,
  numberOfReply: 0,
  onReplySubmit: null,
};

function Comment(props) {
  const {
    owner,
    id,
    content,
    numberOfVotes,
    numberOfReply,
    onReplySubmit,
  } = props;
  const [isReply, setIsReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmitClick = () => {
    if (onReplySubmit) onReplySubmit(id, replyText);
    setReplyText("");
    setIsReply(false);
  };
  return (
    <div className="comment__container">
      <Link to="#">
        <img className="comment__avatar" src={owner.avatar} alt="" />
      </Link>
      <div className="comment__inner">
        <div className="comment__card">
          <div className="comment__card-header">
            <Link to="#">
              <span className="comment__owner">
                {owner.firstName} {owner.lastName}
              </span>
            </Link>
            {/* {"\u2022"} */}
            <span className="comment__date">{"date here"}</span>
          </div>
          <p>{content}</p>
        </div>

        <div className="comment__reaction">
          <div className="comment__reaction-favorite">
            <IconButton>
              <FavoriteBorderOutlinedIcon />
              <span className="comment__reaction-count">{numberOfVotes}</span>
            </IconButton>
          </div>
          <div className="comment__reaction-reply">
            <IconButton onClick={() => setIsReply(!isReply)}>
              <ModeCommentOutlinedIcon />
              <span className="comment__reaction-count">{numberOfReply}</span>
            </IconButton>
          </div>
        </div>
        {isReply ? (
          <div className="reply__container">
            <img className="reply__avatar" src="" alt="" />
            <div className="reply__inner">
              <div className="reply__card">
                <TextareaAutosize
                  id="reply-textfield"
                  className="reply__textfield"
                  aria-label="minimum height"
                  rowsMax={5}
                  rowsMin={2}
                  placeholder="Reply this comment ..."
                  defaultValue={`@${owner.firstName} ${owner.lastName} `}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="buffer"></div>
                <div className="reply__toolbar">
                  <IconButton className="img-upload-btn" aria-label="image">
                    <ImageRoundedIcon />
                  </IconButton>
                  <Button onClick={handleSubmitClick}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Comment;
