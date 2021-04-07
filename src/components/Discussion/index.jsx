import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import Comment from "../Comment";
import './Discussion.css';
import MyComment from "../MyComment";

Discussion.propTypes = {};

function Discussion(props) {
  return (
    <div>
      <Card className="discussion__container">
        <CardContent className="discussion__inner">
          <h2>Discussion (12)</h2>
          <div className="discussion__mycomment">
            <MyComment />
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </CardContent>
      </Card>
    </div>
  );
}

export default Discussion;
