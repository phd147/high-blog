
import ApiHelper from '../../configs/api/api-helper';


export default class Register extends ApiHelper {

    register(data){
        const url = '/api/v1/register';

        return this.postRegister(url,null, data);
    }
}
