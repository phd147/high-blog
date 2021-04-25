import ApiHelper from '../../configs/api/api-helper';

export default class Login extends ApiHelper {

    static loginHandle(username,password){
        const url = 'api/v1/auth/login';
        return this.postLogin(url,null,{username,password});
    }

}