import ApiHelper from "../../../configs/api/api-helper";

export default class PostService extends ApiHelper {
  static save(data) {
    const url = "/api/v1/user/favorite-posts";
    return this.post(url, null, data);
  }

  static unsave(params) {
    const url = `/api/v1/user/favorite-posts?postId=${params}`;
    return this.delete(url);
  }
}
