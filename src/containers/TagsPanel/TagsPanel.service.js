import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";

export default class TagsService extends ApiHelper {
  static getTags() {
    const url = `/api/v1/tags`;
    return this.get(url);
  }
}
