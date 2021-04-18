import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import Comment from "../Comment";
import "./Discussion.css";
import MyComment from "../MyComment";

Discussion.propTypes = {
  comments: PropTypes.array,
  onCommentSubmit: PropTypes.func,
  onReplySubmit: PropTypes.func,
  onCommentDelete: PropTypes.func,
  onCommentEdit: PropTypes.func,
};

Discussion.defaultProps = {
  comments: [],
  onCommentSubmit: null,
  onReplySubmit: null,
  onCommentDelete: null,
  onCommentEdit: null,
};

function Discussion(props) {
  console.log("Discussion");
  const {
    comments,
    onCommentSubmit,
    onReplySubmit,
    onCommentDelete,
    onCommentEdit,
  } = props;
  const handleCommentSubmit = (data) => {
    if (onCommentSubmit) onCommentSubmit(data);
  };
  const handleReplySubmit = (commentId, data) => {
    if (onReplySubmit) onReplySubmit(commentId, data);
  };
  const handleCommentDelete = (commentId) => {
    if (onCommentDelete) onCommentDelete(commentId);
  };
  const handleCommentEdit = (commentId, content) => {
    if (onCommentEdit) onCommentEdit(commentId, content);
  };
  return (
    <div>
      <Card className="discussion__container">
        <CardContent className="discussion__inner">
          <h2>Discussion ({comments.length})</h2>
          <div className="discussion__mycomment">
            <MyComment onCommentSubmit={handleCommentSubmit} />
          </div>
          {comments.map((e) => (
            <div>
              <Comment
                key={e.id}
                owner={e.user}
                content={e.content}
                id={e.id}
                numberOfVotes={e.numberOfVotes}
                numberOfReply={e.childComments ? e.childComments.length : 0}
                onReplySubmit={handleReplySubmit}
                onDelete={handleCommentDelete}
                onEdit={handleCommentEdit}
              />
              <div style={{ marginLeft: "40px" }}>
                {e.childComments &&
                  e.childComments.map((reply) => (
                    <Comment
                      key={reply.id}
                      owner={reply.user}
                      content={reply.content}
                      id={reply.id}
                      numberOfVotes={reply.numberOfVotes}
                      onDelete={handleCommentDelete}
                    />
                  ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Discussion;
