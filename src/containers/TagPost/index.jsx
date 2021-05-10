import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";

TagPost.propTypes = {};

function TagPost(props) {
  let { tagId } = useParams();
  return (
    <Container>
      <Grid container spacing={3} direction="row">
        <Grid item xs={false} md={2}>
          <Menu tags />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant = "h4" style = {{marginBottom: 5}}>
              # {props.match.params.tagName}
          </Typography>
            <Posts
            type={PostType.TAG_TYPE}
            initialParams={{ tagId: tagId, page: 1, pageSize: 10 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default TagPost;
