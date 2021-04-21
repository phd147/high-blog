import ApiHelper from "../../configs/api/api-helper";

export default class PostService extends ApiHelper {

    static getListPost(data){
        const url = `/api/v1/posts?$page=${data.page}&pageSize=${data.pageSize}`;
        return this.get(url);
    }
}