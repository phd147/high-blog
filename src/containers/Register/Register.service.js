import ApiHelper from '../../configs/api/api-helper';


export default class Register extends ApiHelper {

    static register(data) {
        console.log('register class service');
        const url = '/api/v1/register';

        return this.postRegister(url, null, data);
    }
}
