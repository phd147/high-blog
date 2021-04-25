import ApiHelper from "../../configs/api/api-helper";

export default class UserProfileApi extends ApiHelper {

    static getUserDetail(nickname){
        const url = `api/v1/users/${nickname}`;
        return this.get(url);
    }

    static putUserDetail(data){
        const url = 'api/v1/user';
        return this.put(url,null,data);
    }

    static putAvatarImage(data){
        const url = 'api/v1/user/avatar';
        return this.put(url,null,data);
    }

    static putBackgroundImage(data){
        const url = 'api/v1/user/background';
        return this.put(url,null,data);
    }
}