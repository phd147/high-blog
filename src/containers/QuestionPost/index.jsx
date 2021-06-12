import { Container, Grid } from "@material-ui/core";
import React from "react";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import MetaTag from "../../components/MetaTag";
import * as PostType from "../Posts/TypeOfPost";

QuestionPost.propTypes = {};

function QuestionPost(props) {
  return (
    <Container>
      <Grid container spacing={3} direction="row">
        <Grid item xs={false} md={2}>
          <Menu questions />
        </Grid>
        <Grid item xs={12} md={7}>
          <Posts
            type={PostType.QUESTION_TYPE}
            initialParams={{ page: 1, pageSize: 10 }}
          />
        </Grid>
      </Grid>
      <MetaTag>Questions</MetaTag>
    </Container>
  );
}

export default QuestionPost;
