import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import BookmarkButton from "../../components/BookmarkButton";
import Discussion from "../../components/Discussion";
import PostLoading from "../../components/PostLoading/PostLoading";
import PostPreview from "../../components/PostPreview";
import SocialButtons from "../../components/SocialButtons";
import Vote from "../../components/Vote";
import WriterInfoCard from "../../components/WriterInfoCard";
import { BASE_URL } from "../../constant.js";
import "./PostDetails.css";
import PostDetailsService from "./PostDetails.service";

PostDetails.propTypes = {};

function PostDetails(props) {
  const postId = props.match.params.id;
  const postTitle = props.match.params.title;
  const userInfo = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const [isDonateLoading, setIsDonateLoading] = useState(false);

  const [listComment, setListComment] = useState([]);

  const [postDetails, setPostDetails] = useState({});

  const history = useHistory();
  const location = useLocation();

  function handleUserLogged() {
    return new Promise((resolve) => {
      if (userInfo.userId === "") {
        setTimeout(() => {
          history.push(`/login?redirect=${location.pathname}`);
          resolve(false);
        }, 1000);
        toast.error("Log in to continue");
      } else resolve(true);
    });
  }

  // useEffect(() => {
  //   if (error === "Post id and title is incompatible") {
  //     setTimeout(() => {
  //       history.replace("/home");
  //     }, 6000);
  //     toast.error("ERROR SUCCESSFUL");
  //   }
  // }, [error, history]);
  const handleCommentSubmit = async (content) => {
    const logged = await handleUserLogged();
    if (logged) {
      const res = await PostDetailsService.postComment(postId, content);
      const newComment = {
        id: res.data,
        content: content,
        numberOfVotes: 0,
        user: {
          id: userInfo.userId,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          //nickname: userInfo.nickName//chua co trong store
        },
      };
      setListComment((oldComments) => [newComment, ...oldComments]);
    }
  };

  const handleReplySubmit = async (commentId, content) => {
    const logged = await handleUserLogged();
    if (logged) {
      const res = await PostDetailsService.postReply(
        postId,
        commentId,
        content
      );
      let editList = [...listComment];
      const idx = editList.findIndex((item) => item.id === commentId);
      let newReply = {
        id: res.data,
        content: content,
        numberOfVotes: 0,
        user: {
          id: userInfo.userId,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          //nickname: userInfo.nickName//chua co trong store
        },
      };

      if (listComment[idx].childComments === undefined)
        editList[idx].childComments = [newReply];
      else
        editList[idx].childComments = [
          newReply,
          ...listComment[idx].childComments,
        ];
      console.log(editList);
      setListComment(editList);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const logged = await handleUserLogged();
    if (logged) {
      await PostDetailsService.deleteComment(commentId);
      let newCommentList = listComment.filter((item) => item.id !== commentId);
      setListComment(newCommentList);
    }
  };

  const handleReplyDelete = async (parentId, replyId) => {
    const logged = await handleUserLogged();
    if (logged) {
      await PostDetailsService.deleteComment(replyId);
      let newCommentList = [...listComment];
      const parentIndex = listComment.findIndex((item) => item.id === parentId);
      let newChildComments = listComment[parentIndex].childComments.filter(
        (item) => item.id !== replyId
      );
      newCommentList[parentIndex].childComments = newChildComments;
      setListComment(newCommentList);
    }
  };

  const handleCommentEdit = async (commentId, content) => {
    const logged = await handleUserLogged();
    if (logged) {
      await PostDetailsService.editComment(commentId, content);
      let editList = [...listComment];
      const editIdx = editList.findIndex((item) => item.id === commentId);
      editList[editIdx].content = content;
      setListComment(editList);
    }
  };
  const handleReplyEdit = async (parentId, replyId, content) => {
    const logged = await handleUserLogged();
    if (logged) {
      await PostDetailsService.editComment(replyId, content);
      let newCommentList = [...listComment];
      const parentIndex = listComment.findIndex((item) => item.id === parentId);
      let replyIndex = listComment[parentIndex].childComments.findIndex(
        (item) => item.id === replyId
      );
      newCommentList[parentIndex].childComments[replyIndex].content = content;
      setListComment(newCommentList);
    }
  };

  const handleFollowWriter = async (nickName, type) => {
    const logged = await handleUserLogged();
    if (logged) {
      if (type === "FOLLOW") {
        await PostDetailsService.postFollow(nickName);
        setPostDetails({
          ...postDetails,
          user: { ...postDetails.user, followed: true },
        });
      } else if (type === "UNFOLLOW") {
        await PostDetailsService.deleteFollow(nickName);
        setPostDetails({
          ...postDetails,
          user: { ...postDetails.user, followed: false },
        });
      }
    }
  };

  const handleSwitchNotification = async (nickName) => {
    await PostDetailsService.postSwitchNotification(nickName);
    setPostDetails({
      ...postDetails,
      user: { ...postDetails.user, notified: !postDetails.user.notified },
    });
  };

  async function handleDonationSubmit(nickName, amount) {
    const logged = await handleUserLogged();
    if (logged) {
      setIsDonateLoading(true);
      await PostDetailsService.postDonation(nickName, amount);
      setIsDonateLoading(false);
    }
  }

  const handleVoteChange = async (value, action) => {
    const logged = await handleUserLogged();
    if (logged) {
      if (action === "CREATE") {
        await PostDetailsService.createVote(postId, value);
        let change = value === "UP" ? 1 : -1;
        setPostDetails({
          ...postDetails,
          numberOfVotes: postDetails.numberOfVotes + change,
          vote: { ...postDetails.vote, voteType: value },
        });
      } else if (action === "UPDATE") {
        await PostDetailsService.updateVote(postId, value);
        let change = value === "UP" ? 2 : -2;
        setPostDetails({
          ...postDetails,
          numberOfVotes: postDetails.numberOfVotes + change,
          vote: { ...postDetails.vote, voteType: value },
        });
      } else if (action === "DELETE") {
        await PostDetailsService.deleteVote(postId, value);
        let change = value === "UP" ? -1 : 1;
        setPostDetails({
          ...postDetails,
          numberOfVotes: postDetails.numberOfVotes + change,
          vote: null,
        });
      }
    }
  };

  const handleBookmarkClick = async (type) => {
    const logged = await handleUserLogged();
    if (logged) {
      if (type === "CREATE") {
        await PostDetailsService.postFavorite(postId);
        setPostDetails({
          ...postDetails,
          addedToFavorite: true,
        });
      } else if (type === "DELETE") {
        await PostDetailsService.deleteFavorite(postId);
        setPostDetails({
          ...postDetails,
          addedToFavorite: false,
        });
      }
    }
  };
  const handlePostDelete = async () => {
    try {
      await PostDetailsService.deletePost(postId);
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  function fetchPostDetails() {
    return new Promise(async (resolve) => {
      try {
        const res = await PostDetailsService.getPostDetails(postId);
        setPostDetails(res.data);
        setIsLoading(false);
        resolve();
      } catch (error) {
        console.log("FETCH POST ERROR: ", error);
        history.push("/404");
      }
    });
  }

  async function fetchComments() {
    try {
      const response = await PostDetailsService.getComments(postId);
      setListComment(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchData() {
      await fetchPostDetails();
      fetchComments();
    }
    fetchData();
  }, []);

  return (
    <Container className="post-details__container" style={{ marginTop: 25 }}>
      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={0} sm={1} md={1}></Grid>
          <Grid item xs={12} sm={8} md={8}>
            <PostLoading />
          </Grid>
          <Grid
            className="writer-info"
            item
            xs={0}
            sm={3}
            md={3}
            style={{ overflow: "hidden " }}
          >
            <PostLoading />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={0} sm={1} md={1}>
            <div className="fixed post-details__reaction">
              <Vote
                current={postDetails.vote ? postDetails.vote : null}
                numberOfVotes={postDetails.numberOfVotes}
                onVoteChange={handleVoteChange}
              />
              <BookmarkButton
                added={postDetails.addedToFavorite}
                onClick={handleBookmarkClick}
              />
              <SocialButtons
                url={`${BASE_URL}/${props.location.pathname}`}
                text={postDetails.summary}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <div className="post-details__content">
              {postDetails.coverImagePath && (
                <img
                  className="post-details__cover-image"
                  src={`${BASE_URL}/${postDetails.coverImagePath}`}
                  alt="cover_image"
                />
              )}

              <PostPreview
                postTitle={postDetails.title}
                postContent={postDetails.content}
                postTags={postDetails.tags}
                postOwner={postDetails.user}
                postDate={postDetails.createdDate}
                onEdit={() => {
                  console.log("EDIT");
                  history.push(`${location.pathname}/edit`);
                }}
                onDelete={handlePostDelete}
              />
            </div>
            <div className="post-details__discussion">
              <Discussion
                comments={listComment}
                onCommentSubmit={handleCommentSubmit}
                onReplySubmit={handleReplySubmit}
                onCommentDelete={handleCommentDelete}
                onCommentEdit={handleCommentEdit}
                onReplyDelete={handleReplyDelete}
                onReplyEdit={handleReplyEdit}
              />
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
                postOwner={postDetails.user}
                onFollowClick={handleFollowWriter}
                onNotiClick={handleSwitchNotification}
                onDonationSubmit={handleDonationSubmit}
                isDonateLoading={isDonateLoading}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default PostDetails;
