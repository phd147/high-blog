import ApiHelper from "../../configs/api/api-helper";

const baseUrl = "http://35.240.173.198";
export default class FavoriteService extends ApiHelper {
  static getList(params) {
    console.log("GET liST");
    const url = `/api/v1/user/favorite-posts?page=${params.page}&pageSize=${params.pageSize}`;
    return this.get(url);
  }
}

// import ApiHelper from "../../configs/api/api-helper";

// export default class PostService extends ApiHelper {
//   static getListPost(data) {
//     const url = `/api/v1/posts?$page=${data.page}&pageSize=${data.pageSize}`;
//     return this.get(url);
//   }
// }
