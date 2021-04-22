import ApiHelper from "../../configs/api/api-helper";

export default class PostService extends ApiHelper {
  // home list posts
  static getListPost(data) {
    const url = `/api/v1/posts?$page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  // favorite list posts
  static getFavoriteListPost(data) {
    const url = `/api/v1/user/favorite-posts?page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  // tag list posts
  static getTagListPost(data) {}
}
