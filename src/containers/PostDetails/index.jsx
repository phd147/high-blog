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
import { createFavorite } from "../../store/action/favoriteActions.";

PostDetails.propTypes = {};

function PostDetails(props) {
  const postId = props.match.params.id;

  const [listComment, setListComment] = useState([]);
  const [sendReq, setSendReq] = useState(false);

  const postDetails = useSelector((state) => state.postDetails);
  const { payload, isLoading, error } = postDetails;

  const dispatch = useDispatch();

  console.log("POST DETAILS RENDER  ");

  const handleCommentSubmit = async (data) => {
    const postDetailsService = new PostDetailsService();
    try {
      const response = await postDetailsService.postComment(postId, data);
      setSendReq(!sendReq);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReplySubmit = async (commentId, data) => {
    const postDetailsService = new PostDetailsService();
    try {
      const response = await postDetailsService.postReply(
        postId,
        commentId,
        data
      );
      setSendReq(!sendReq);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(detailsPost(postId));
  }, [dispatch, postId, sendReq]);

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
  }, [postId, sendReq]);

  const handleVoteChange = async (value, action) => {
    const postDetailsService = new PostDetailsService();
    try {
      if (action === "CREATE") {
        const { status } = await postDetailsService.createVote(postId, value);
        if (status === 201) setSendReq(!sendReq);
      } else if (action === "UPDATE") {
        const { status } = await postDetailsService.updateVote(postId, value);
        if (status === 204) setSendReq(!sendReq);
      } else if (action === "DELETE") {
        const { status } = await postDetailsService.deleteVote(postId, value);
        if (status === 204) setSendReq(!sendReq);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkClick = () => {
    dispatch(createFavorite(postId));
  };

  return (
    <div className="post-details__container">
      <Grid container spacing={2}>
        <Grid className="post-details__reaction" item xs={1} sm={1} md={1}>
          <div className="fixed">
            <Vote
              vote={payload.numberOfVotes}
              onVoteChange={handleVoteChange}
            />
            <BookmarkButton onClick={handleBookmarkClick} />
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
            <Discussion
              comments={listComment}
              onCommentSubmit={handleCommentSubmit}
              onReplySubmit={handleReplySubmit}
            />
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
