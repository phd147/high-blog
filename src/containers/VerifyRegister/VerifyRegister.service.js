import ApiHelper from "../../configs/api/api-helper";

export default class VerifyRegisterService extends ApiHelper {
    verify(id,code){
       const url = '/api/v1/register/activation/' + id + `?code=${code}`;
       return this.post(url);

    }
}


