import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./PostPreview.css";
import CSSHelper from "./helper.js";
import TagsView from "../TagsView";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

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
  postOwner: {},
};

function PostPreview(props) {
  const { postTitle, postContent, postTags, postOwner } = props;

  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    CSSHelper.addCodeLabel();
  }, []);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<h2>${postTitle}</h2>` }} />
      <div className="post-owner">
        <Link to="#">
          <img src={postOwner.avatar} alt="" />
          <span>
            {postOwner.firstName} {postOwner.lastName}
          </span>
        </Link>
        {postOwner.id === userInfo.userId ? (
          <div>
            <Button variant="contained" color="primary">
              Edit
            </Button>
            <Button variant="outlined" color="secondary">
              Delete
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <TagsView tagList={postTags} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;
