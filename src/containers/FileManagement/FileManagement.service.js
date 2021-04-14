import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "http://35.240.173.198";
export default class FileManagementService extends ApiHelper {
  getImages() {
    const url = `${baseUrl}/api/v1/user/files/images`;
    return this.get(url, null, null, { page: 1, pageSize: 1000 });
  }
  postImage(data) {
    const url = `${baseUrl}/api/v1/user/files/images`;
    return this.post(url, null, data);
  }
}
