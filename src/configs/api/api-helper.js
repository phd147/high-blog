import axios_config from '../axios/axios-config';

import { checkToken } from "../../services/user.service";



export default class ApiHelper {
    custom(method,url,headers = null,data = null,params = null){
        const config = {
            method ,
            url ,
            headers : {
                ...headers ,
                Authorization : 'Bearer ' + checkToken()
            },
            data,
            params
        };
        return axios_config(config);
    }

    get(url, headers = null, data =null, params = null){
        return this.custom('get',url,headers,data,params);
    }

    post(url, headers = null, data =null, params = null){
        return this.custom('post',url,headers,data,params);
    }

    put(url, headers = null, data =null, params = null){
        return this.custom('put',url,headers,data,params);
    }

    delete(url, headers = null, data =null, params = null){
        return this.custom('delete',url,headers,data,params);
    }


    
}