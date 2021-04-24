import ApiHelper from "../../configs/api/api-helper";
import { BASE_URL } from "../../constant.js";
const baseUrl = BASE_URL;
export default class PostDetailsService extends ApiHelper {
  static getPostDetails(postId) {
    const url = `${baseUrl}/api/v1/posts/${postId}`;
    return this.get(url);
  }
  static deletePost(postId) {
    const url = `${baseUrl}/api/v1/user/posts/${postId}`;
    return this.delete(url);
  }
  static postFavorite(postId) {
    const url = `${baseUrl}/api/v1/user/favorite-posts`;
    return this.post(url, null, { postId });
  }
  static deleteFavorite(postId) {
    const url = `${baseUrl}/api/v1/user/favorite-posts`;
    return this.delete(url, null, null, { postId });
  }
  static getComments(postId) {
    const url = `${baseUrl}/api/v1/comments?page=1&pageSize=1000`;
    return this.get(url, null, null, { postId: postId });
  }
  static postComment(postId, content) {
    const url = `${baseUrl}/api/v1/user/comments`;
    return this.post(url, null, { postId, content });
  }
  static editComment(commentId, content) {
    const url = `${baseUrl}/api/v1/user/comments/${commentId}`;
    return this.put(url, null, { content });
  }
  static deleteComment(commentId) {
    const url = `${baseUrl}/api/v1/user/comments/${commentId}`;
    return this.delete(url);
  }
  static postReply(postId, parentId, content) {
    const url = `${baseUrl}/api/v1/user/comments`;
    return this.post(url, null, { postId, parentId, content });
  }
  static createVote(postId, voteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.post(url, null, { postId, voteType });
  }
  static updateVote(postId, voteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.put(url, null, { postId, voteType });
  }
  static deleteVote(postId, previousVoteType) {
    const url = `${baseUrl}/api/v1/user/posts-votes`;
    return this.delete(url, null, { postId, previousVoteType });
  }
  static postFollow(nickName) {
    const url = `${baseUrl}/api/v1/user/subscriptions/users/${nickName}`;
    return this.post(url);
  }
  static deleteFollow(nickName) {
    const url = `${baseUrl}/api/v1/user/subscriptions/users/${nickName}`;
    return this.delete(url);
  }
}
