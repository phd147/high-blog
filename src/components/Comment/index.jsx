//TODO: wait userInfo de setVisible cho edit, remove button
import React, {useState} from "react";
import PropTypes from "prop-types";
import "./Comment.css";
import {Link} from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import {Avatar, Button, IconButton, TextareaAutosize,} from "@material-ui/core";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useSelector} from "react-redux";

Comment.propTypes = {
  parentId: PropTypes.number,
  owner: PropTypes.object,
  content: PropTypes.string,
  id: PropTypes.number,
  numberOfVotes: PropTypes.number,
  numberOfReply: PropTypes.number,
  onReplySubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

Comment.defaultProps = {
  parentId: null,
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
  onDelete: null,
  onEdit: null,
};

function Comment(props) {
  const {
    parentId,
    owner,
    id,
    content,
    numberOfVotes,
    numberOfReply,
    onReplySubmit,
    onDelete,
    onEdit,
  } = props;
  const [isReply, setIsReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const userInfo = useSelector((state) => state.user);

  const handleSubmitClick = () => {
    if (onReplySubmit) onReplySubmit(id, replyText);
    setReplyText("");
    setIsReply(false);
  };
  const handleDelete = () => {
    console.log("delete comment id: ", id);
    if (onDelete) onDelete(parentId, id);
  };
  const handleEdit = () => {
    console.log("edit comment id: ", id);
    if (onEdit) onEdit(parentId, id, editText);
    setIsEdit(false);
  };
  console.log("COMMENT RENDER");
  return (
    <div className="comment__container">
      <Link to="#">
        <Avatar alt="user" src="" />
      </Link>
      <div className="comment__inner">
        <div className="comment__card">
          <div className="comment__card-header">
            <div>
              <Link to="#">
                <span className="comment__owner">
                  {owner.firstName} {owner.lastName}
                </span>
              </Link>
              {/* {"\u2022"} */}
            </div>
            {userInfo.userId === owner.id ? (
              !isEdit ? (
                <div style={{ minWidth: "80px", textAlign: "right" }}>
                  <IconButton
                    style={{ padding: "4px", fontSize: "10px" }}
                    onClick={() => {
                      setIsEdit(true);
                      setEditText(content);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton style={{ padding: "4px" }} onClick={handleDelete}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={handleEdit}
                  >
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEdit(false)}>
                    Discard
                  </Button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
          {!isEdit ? (
            <p>{content}</p>
          ) : (
            <TextareaAutosize
              rowsMax={3}
              className="edit__textfield"
              onChange={(e) => setEditText(e.target.value)}
            >
              {content}
            </TextareaAutosize>
          )}
        </div>

        <div className="comment__reaction">
          <div className="comment__reaction-favorite">
            <IconButton>
              <FavoriteBorderOutlinedIcon />
              <span className="comment__reaction-count">{numberOfVotes}</span>
            </IconButton>
          </div>
          {onReplySubmit ? (
            <div className="comment__reaction-reply">
              <IconButton onClick={() => setIsReply(!isReply)}>
                <ModeCommentOutlinedIcon />
                <span className="comment__reaction-count">{numberOfReply}</span>
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </div>
        {isReply ? (
          <div className="reply__container">
            <Avatar alt="user" src="" />
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
          <></>
        )}
      </div>
    </div>
  );
}

export default Comment;
