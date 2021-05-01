import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TagsView from "../TagsView";
import CSSHelper from "./helper.js";
import styles from "./PostPreview.module.css";

PostPreview.propTypes = {
  postTitle: PropTypes.string,
  postContent: PropTypes.string,
  postTags: PropTypes.array,
  postOwner: PropTypes.object,
  postDate: PropTypes.number,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

PostPreview.defaultProps = {
  postTitle: "",
  postContent: "",
  postTags: [],
  postOwner: {},
  postDate: 0,
  onDelete: null,
  onEdit: null,
};

function PostPreview(props) {
  const {
    postTitle,
    postContent,
    postTags,
    postOwner,
    postDate,
    onDelete,
    onEdit,
  } = props;

  const userInfo = useSelector((state) => state.user);

  const handleDelete = () => {
    if (onDelete) onDelete();
  };
  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  useEffect(() => {
    CSSHelper.addCodeLabel();
  }, []);
  return (
    <div>
      <div>
        <h2 style={{ color: "black" }}>{postTitle}</h2>
      </div>
      <div className={styles.post_owner}>
        <Link to="#">
          <Avatar alt="user" src={postOwner.avatar} />
          <div style={{ marginLeft: "10px" }}>
            {postOwner.firstName} {postOwner.lastName}
          </div>
        </Link>
        <time style={{ margin: "0px 10px" }}>
          {new Date(postDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {postOwner.id === userInfo.userId ? (
          <div>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <TagsView tagList={postTags} />
      </div>
      <div align="justify" dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}

export default PostPreview;
