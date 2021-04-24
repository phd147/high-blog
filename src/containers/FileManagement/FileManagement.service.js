import ApiHelper from "../../configs/api/api-helper";
const baseUrl = "https://35.240.173.198";
export default class FileManagementService extends ApiHelper {
  static getImages() {
    const url = `${baseUrl}/api/v1/user/files/images`;
    return this.get(url, null, null, { page: 1, pageSize: 1000 });
  }
  static postImage(data) {
    const url = `${baseUrl}/api/v1/user/files/images`;
    return this.post(url, null, data);
  }
  static deleteImage(id) {
    const url = `${baseUrl}/api/v1/user/files/images/${id}`;
    return this.delete(url);
  }
}
