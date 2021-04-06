import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./PostPreview.css";
import CSSHelper from "./helper.js";
import TagsView from "../TagsView";
import { Link } from "react-router-dom";

PostPreview.propTypes = {
  postTitle: PropTypes.string,
  postContent: PropTypes.string,
  postTags: PropTypes.array,
  postOwner: PropTypes.object,
};

PostPreview.defaultProps = {
  postTitle: "",
  postContent: "",
  postTags: [],
  postOwner: {
    username: "Garen",
    avatar:
      "https://cdn-thethao247.com/upload/trong/2020/03/14/huong-dan-choi-garen-lam-chu-duong-tren-voi-suc-manh-cua-demacia.jpg",
  },
};

function PostPreview(props) {
  const { postTitle, postContent, postTags, postOwner } = props;
  console.log(postTags);
  useEffect(() => {
    CSSHelper.addCodeLabel();
  }, []);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<h2>${postTitle}</h2>` }} />
      <div className="post-owner">
        <Link to="#">
          <img src={postOwner.avatar} alt="" />
          <span>{postOwner.username}</span>
        </Link>
      </div>
      <div>
        <TagsView tagList={postTags} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;
