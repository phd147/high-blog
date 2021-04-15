import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";
export default class PostDetailsService extends ApiHelper {
  getComments(postId) {
    const url = `${baseUrl}/api/v1/comments`;
    return this.get(url, null, null, { postId: postId });
  }
  postComment(postId, content) {
    const url = `${baseUrl}/api/v1/user/comments`;
    return this.post(url, null, { postId, content });
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
  // getTags() {
  //   const url = `${baseUrl}/api/v1/tags`;
  //   return this.get(url);
  // }
  // postImage(data) {
  //   const url = `${baseUrl}/api/v1/user/files/images`;
  //   return this.post(url, null, data);
  // }
}
