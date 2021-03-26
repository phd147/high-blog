
import ApiHelper from '../../configs/api/api-helper';


export default class Login extends ApiHelper {


    
    loginHandle(username,password){
        const url = 'http://35082772e937.ngrok.io/api/v1/auth/login';
        return this.post(url,null,{username,password});
    }


}