import ApiHelper from '../../configs/api/api-helper';

export default class Login extends ApiHelper {

    static loginHandle(username,password){
        const usernameReq = username.trim();
        const passwordReq = password.trim();
        const url = 'api/v1/auth/login';
        return this.postLogin(url,null,{username : usernameReq,password : passwordReq});
    }

}