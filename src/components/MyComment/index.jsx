import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./MyComment.css";
import "./MyCommentHelper.js";
import { Button, IconButton } from "@material-ui/core";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import useScript from "../../hook/useScript";
import cssAction from "./MyCommentHelper.js";
import axios from "axios";

MyComment.propTypes = {
  currentUser: PropTypes.object,
};
MyComment.defaultProps = {
  currentUser: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
};

function MyComment(props) {
  const { currentUser } = props;
  const [numRow, setNumRow] = useState(2);

  const commentImgRef = React.createRef();

  const handleTextField = () => {
    setNumRow(5);
  };

  useEffect(() => {
    console.log("CSS ACTION");
    cssAction();
  }, []);

  return (
    <div>
      <div className="mycomment__container">
        <img className="mycomment__avatar" src={currentUser.avatar} alt="" />
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
            />
            <div className="buffer"></div>
            <div className="mycomment__toolbar">
              <IconButton className="img-upload-btn" aria-label="image">
                <ImageRoundedIcon />
              </IconButton>
              <Button>Submit</Button>
            </div>
          </div>

          <div className="button"></div>
        </div>
      </div>
    </div>
  );
}

export default MyComment;
