import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";
export default class PostDetailsService extends ApiHelper {
  getComments(postId) {
    const url = `${baseUrl}/api/v1/comments?page=1&pageSize=1000`;
    return this.get(url, null, null, { postId: postId });
  }
  postComment(postId, content) {
    const url = `${baseUrl}/api/v1/user/comments`;
    return this.post(url, null, { postId, content });
  }
  editComment(commentId, content) {
    const url = `${baseUrl}/api/v1/user/comments/${commentId}`;
    return this.put(url, null, { content });
  }
  deleteComment(commentId) {
    const url = `${baseUrl}/api/v1/user/comments/${commentId}`;
    return this.delete(url);
  }
  postReply(postId, parentId, content) {
    const url = `${baseUrl}/api/v1/user/comments`;
    return this.post(url, null, { postId, parentId, content });
  }
  createVote(postId, voteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.post(url, null, { postId, voteType });
  }
  updateVote(postId, voteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.put(url, null, { postId, voteType });
  }
  deleteVote(postId, previousVoteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.delete(url, null, { postId, previousVoteType });
  }
  postFollow(nickName) {
    const url = `${baseUrl}/api/v1/user/subscriptions/users/${nickName}`;
    return this.post(url);
  }
  deleteFollow(nickName) {
    const url = `${baseUrl}/api/v1/user/subscriptions/users/${nickName}`;
    return this.delete(url);
  }
  // getTags() {
  //   const url = `${baseUrl}/api/v1/tags`;
  //   return this.get(url);
  // }
  // postImage(data) {
  //   const url = `${baseUrl}/api/v1/user/files/images`;
  //   return this.post(url, null, data);
  // }
}
