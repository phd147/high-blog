
import ApiHelper from '../../configs/api/api-helper';


export default class Login extends ApiHelper {


    
    loginHandle(username,password){
        const url = 'http://35.240.173.198/api/v1/auth/login';
        return this.postLogin(url,null,{username,password});
    }


}