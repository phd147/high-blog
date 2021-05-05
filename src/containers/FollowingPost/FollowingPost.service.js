import ApiHelper from "../../configs/api/api-helper";
import { BASE_URL } from "../../constant";
export default class FollowingPostService extends ApiHelper {
  static getCategories() {
    const url = `${BASE_URL}/api/v1/user/categories`;
    return this.get(url);
  }
}
