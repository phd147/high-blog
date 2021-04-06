import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import "./PostDetails.css";
import { samplePost } from "./samplePost";
import PostPreview from "../../components/PostPreview";
import Vote from "../../components/Vote";
import BookmarkButton from "../../components/BookmarkButton";
import WriterInfoCard from "../../components/WriterInfoCard";
import Discussion from "../../components/Discussion";
PostDetails.propTypes = {};

function PostDetails(props) {

  const handleVoteChange = (value) => {
    console.log("VOTE: ", value);
  }
  return (
    <div className="post-details__container">
      <Grid container spacing={2}>
        <Grid className="post-details__reaction" item xs={1} sm={1} md={1}>
          <Vote onVoteChange={handleVoteChange} />
          <BookmarkButton />
        </Grid>
        <Grid item xs={9} sm={7} md={8}>
          <div className="post-details__content">
            <img
              className="post-details__cover-image"
              src={samplePost.coverImagePath}
              alt="cover_image"
            />
            <PostPreview
              postTitle={samplePost.title}
              postContent={samplePost.content}
              postTags={samplePost.tags}
            />
          </div>
          <div className="post-details__discussion">
            <Discussion />
          </div>
        </Grid>
        <Grid item xs={2} sm={3} md={3}>
          <WriterInfoCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default PostDetails;
