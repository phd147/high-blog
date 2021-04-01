import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./PostPreview.css";
import CSSHelper from "./helper.js";
import TagsView from "../TagsView";

PostPreview.propTypes = {
  postTitle: PropTypes.string,
  postContent: PropTypes.string,
  postTags: PropTypes.array,
};

PostPreview.defaultProps = {
  postTitle: "",
  postContent: "",
  postTags: [],
};

function PostPreview(props) {
  const { postTitle, postContent, postTags } = props;
  console.log(postTags);
  useEffect(() => {
    CSSHelper.addCodeLabel();
  }, []);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<h2>${postTitle}</h2>` }} />
      <div>
        <TagsView tagList = {postTags} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;
