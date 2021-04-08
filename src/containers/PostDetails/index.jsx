import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import "./PostDetails.css";
import PostPreview from "../../components/PostPreview";
import Vote from "../../components/Vote";
import BookmarkButton from "../../components/BookmarkButton";
import WriterInfoCard from "../../components/WriterInfoCard";
import Discussion from "../../components/Discussion";
import { useDispatch, useSelector } from "react-redux";
import { detailsPost } from "../../store/action/postActions";
import PostDetailsService from "./PostDetails.service";

PostDetails.propTypes = {};

function PostDetails(props) {
  const postId = props.match.params.id;

  const [listComment, setListComment] = useState([]);

  const postDetails = useSelector((state) => state.postDetails);
  const { payload, isLoading, error } = postDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    async function fetchComments() {
      const postDetailsService = new PostDetailsService();
      try {
        const response = await postDetailsService.getComments(postId);
        setListComment(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  }, []);

  const handleVoteChange = (value) => {
    console.log("VOTE: ", value);
  };
  return (
    <div className="post-details__container">
      <Grid container spacing={2}>
        <Grid className="post-details__reaction" item xs={1} sm={1} md={1}>
          <div className="fixed">
            <Vote onVoteChange={handleVoteChange} />
            <BookmarkButton />
          </div>
        </Grid>
        <Grid item xs={9} sm={7} md={8}>
          <div className="post-details__content">
            {payload.coverImagePath && (
              <img
                className="post-details__cover-image"
                src={`http://35.240.173.198/${payload.coverImagePath}`}
                alt="cover_image"
              />
            )}

            <PostPreview
              postTitle={payload.title}
              postContent={payload.content}
              postTags={payload.tags}
            />
          </div>
          <div className="post-details__discussion">
            <Discussion comments={listComment} />
          </div>
        </Grid>
        <Grid item xs={2} sm={3} md={3} style={{ overflow: "hidden " }}>
          <div className="fixed post-details__writer-info">
            <WriterInfoCard />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PostDetails;
