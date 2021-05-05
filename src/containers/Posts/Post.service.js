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

  //search
  static getSearchResult(data) {
    const url = `/api/v1/posts/search?keyword=${data.keyword}&page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  static getFollowingPosts(data) {
    const url = `/api/v1/user/posts/subscriptions?categoryId=${data.categoryId}&page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }
}
