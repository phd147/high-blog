import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./MyComment.css";
import "./MyCommentHelper.js";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import cssAction from "./MyCommentHelper.js";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constant";

MyComment.propTypes = {
  currentUser: PropTypes.object,
  onCommentSubmit: PropTypes.func,
};
MyComment.defaultProps = {
  currentUser: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
  onCommentSubmit: null,
};

function MyComment(props) {
  const { currentUser, onCommentSubmit } = props;
  const userInfo = useSelector((state) => state.user);
  const [numRow, setNumRow] = useState(2);
  const [commentText, setCommentText] = useState("");
  console.log("RENDER MY COMMENT");
  const handleSubmitClick = () => {
    if (onCommentSubmit) onCommentSubmit(commentText);
    setCommentText("");
  };

  const handleTextField = () => {
    setNumRow(5);
  };

  useEffect(() => {
    console.log("CSS ACTION");
    cssAction();
  }, []);

  return (
    <div className="mycomment__container">
      <Avatar alt="user" src={`${BASE_URL}/${userInfo.imagePath}`} />
      <div className="mycomment__inner">
        <div className="mycomment__card">
          <TextareaAutosize
            onFocus={handleTextField}
            rowsMax={9}
            id="textfield"
            className="mycomment__textfield"
            aria-label="minimum height"
            rowsMin={numRow}
            placeholder="Add to the discussion"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="buffer"></div>
          <div className="mycomment__toolbar">
            <Button onClick={handleSubmitClick}>Submit</Button>
          </div>
        </div>

        <div className="button"></div>
      </div>
    </div>
  );
}

export default MyComment;
