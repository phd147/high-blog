import ApiHelper from "../../configs/api/api-helper";

export default class VerifyRegisterService extends ApiHelper {
    static verify(id, code) {
        const url = '/api/v1/register/activation/' + id + `?code=${code}`;
        return this.post(url);

    }
}


