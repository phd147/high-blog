import ApiHelper from "../../configs/api/api-helper";
export default class FileManagementService extends ApiHelper {
  static getImages() {
    const url = `/api/v1/user/files/images`;
    return this.get(url, null, null, { page: 1, pageSize: 1000 });
  }
  static postImage(data) {
    const url = `/api/v1/user/files/images`;
    return this.post(url, null, data);
  }
  static deleteImage(id) {
    const url = `/api/v1/user/files/images/${id}`;
    return this.delete(url);
  }
}
