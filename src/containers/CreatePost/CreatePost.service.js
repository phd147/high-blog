import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";
export default class PostCreateService extends ApiHelper {
  getCategories() {
    const url = `${baseUrl}/api/v1/user/categories`;
    return this.get(url);
  }
  getTags() {
    const url = `${baseUrl}/api/v1/tags`;
    return this.get(url);
  }
  postImage(data) {
    const url = `${baseUrl}/api/v1/user/files/images`;
    return this.post(url, null, data);
  }
}
