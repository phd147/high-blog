import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import Comment from "../Comment";
import "./Discussion.css";
import MyComment from "../MyComment";

Discussion.propTypes = {
  comments: PropTypes.array,
};

Discussion.defaultProps = {
  comments: [],
};

function Discussion(props) {
  const { comments } = props;
  return (
    <div>
      <Card className="discussion__container">
        <CardContent className="discussion__inner">
          <h2>Discussion (12)</h2>
          <div className="discussion__mycomment">
            <MyComment />
          </div>
          {comments.map((e) => (
            <Comment
              commentOwner={e.user}
              commentMeta={{
                content: e.content,
                id: e.id,
                numberOfVotes: e.numberOfVotes,
              }}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Discussion;
