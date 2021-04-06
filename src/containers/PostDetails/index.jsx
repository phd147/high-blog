import React, { useEffect, useState } from "react";
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
import {
  createFavorite,
  deleteFavorite,
} from "../../store/action/favoriteActions.";
import { useHistory } from "react-router";
import ToastContainerConfig from "../../configs/toast/ToastContainerConfig";
import { toast } from "react-toastify";

PostDetails.propTypes = {};

function PostDetails(props) {
  const postId = props.match.params.id;
  const postTitle = props.match.params.title;

  const [listComment, setListComment] = useState([]);
  const [sendReq, setSendReq] = useState(0);

  const postDetails = useSelector((state) => state.postDetails);
  const { payload, isLoading, error } = postDetails;

  const history = useHistory();

  useEffect(() => {
    if (error === "Post id and title is incompatible") {
      setTimeout(() => {
        history.replace("/home");
      }, 6000);
      toast.error("ERROR SUCCESSFUL");
    }
  }, [error, history]);

  const dispatch = useDispatch();

  const handleCommentSubmit = async (data) => {
    const postDetailsService = new PostDetailsService();
    try {
      await postDetailsService.postComment(postId, data);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };
  const handleReplySubmit = async (commentId, data) => {
    const postDetailsService = new PostDetailsService();
    try {
      await postDetailsService.postReply(postId, commentId, data);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const postDetailsService = new PostDetailsService();
    try {
      await postDetailsService.deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEdit = async (commentId, content) => {
    const postDetailsService = new PostDetailsService();
    try {
      await postDetailsService.editComment(commentId, content);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollowWriter = async (nickName, type) => {
    const postDetailsService = new PostDetailsService();
    try {
      if (type === "FOLLOW") {
        await postDetailsService.postFollow(nickName);
      } else if (type === "UNFOLLOW") {
        await postDetailsService.deleteFollow(nickName);
      }

      fetchPostDetails();
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchPostDetails() {
    console.log("[REDUX] DETAILS POST");
    dispatch(detailsPost(postId, postTitle));
    console.log(postTitle);
  }

  async function fetchComments() {
    console.log("[API] FETCH COMMENT");
    const postDetailsService = new PostDetailsService();
    try {
      const response = await postDetailsService.getComments(postId);
      setListComment(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
      fetchPostDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkClick = async (type) => {
    console.log("handle bookmark from parent");
    if (type === "CREATE") {
      await dispatch(createFavorite(postId));
    } else if (type === "DELETE") {
      await dispatch(deleteFavorite(postId));
    }
    fetchPostDetails();
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="post-details__container">
      <ToastContainerConfig />
      {false ? (
        <div>Loading ...</div>
      ) : (
        <Grid container spacing={2}>
          <Grid className="post-details__reaction" item xs={0} sm={1} md={1}>
            <div className="fixed">
              <Vote
                vote={payload.numberOfVotes}
                onVoteChange={handleVoteChange}
              />
              <BookmarkButton onClick={handleBookmarkClick} />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
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
                postOwner={payload.user}
              />
            </div>
            <div className="post-details__discussion">
              <Discussion
                comments={listComment}
                onCommentSubmit={handleCommentSubmit}
                onReplySubmit={handleReplySubmit}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
              />
              {/* )} */}
            </div>
          </Grid>
          <Grid
            className="writer-info"
            item
            xs={0}
            sm={3}
            md={3}
            style={{ overflow: "hidden " }}
          >
            <div className="fixed post-details__writer-info">
              <WriterInfoCard
                postOwner={payload.user}
                onFollowClick={handleFollowWriter}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default PostDetails;
