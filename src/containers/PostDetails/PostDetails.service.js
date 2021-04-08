import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";
export default class PostDetailsService extends ApiHelper {
  getComments(postId) {
    const url = `${baseUrl}/api/v1/comments`;
    return this.get(url, null, null, { postId: postId });
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
