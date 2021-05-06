import ApiHelper from "../../configs/api/api-helper";

export default class PostService extends ApiHelper {
  // home list posts
  static getListPost(data) {
    const url = `/api/v1/posts?page=${data.page}&pageSize=${data.pageSize}&categoryId=1`;
    return this.get(url);
  }

  // favorite list posts
  // Khong categoryId
  static getFavoritePosts(data) {
    const url = `/api/v1/user/favorite-posts?page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  //search
  static getSearchResult(data) {
    console.log("DATA in service: ", data);
    const url = `/api/v1/posts/search?keyword=${data.keyword}&page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  static getFollowingPosts(data) {
    const url = `/api/v1/user/posts/subscriptions?categoryId=${data.categoryId}&page=${data.page}&pageSize=${data.pageSize}`;
    return this.get(url);
  }

  static getQuestionPosts(data) {
    const url = `/api/v1/posts?page=${data.page}&pageSize=${data.pageSize}&categoryId=2`;
    return this.get(url);
  }
  static getTagPosts(data) {
    const url = `/api/v1/posts?page=${data.page}&pageSize=${data.pageSize}&categoryId=1&tagId=${data.tagId}`;
    return this.get(url);
  }
}
