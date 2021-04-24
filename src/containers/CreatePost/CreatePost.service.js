import ApiHelper from "../../configs/api/api-helper";
import { BASE_URL } from "../../constant";
export default class PostCreateService extends ApiHelper {
  static getCategories() {
    const url = `${BASE_URL}/api/v1/user/categories`;
    return this.get(url);
  }
  static getTags() {
    const url = `${BASE_URL}/api/v1/tags`;
    return this.get(url);
  }
  static postImage(data) {
    const url = `${BASE_URL}/api/v1/user/files/images`;
    return this.post(url, null, data);
  }
  static postPost(postObj) {
    const url = `${BASE_URL}/api/v1/user/posts`;
    return this.post(url, null, postObj);
  }
}
