import axios_config from '../axios/axios-interceptors-config';

import { checkToken } from "../../services/user.service";



export default class ApiHelper {


    static custom(method,url,headers = null,data = null,params = null){
        const config = {
            method ,
            url ,
            headers : {
                ...headers ,
                Authorization :   checkToken() ? 'Bearer ' + checkToken() : null
            },
            data,
            params
        };
        return axios_config(config);
    }
    static customLogin(method,url,headers =null,data,params=null){
        const config = {
            method ,
            url ,
            headers : {
                ...headers
            },
            data,
            params
        }
        return axios_config(config)
    }
    static customRegister(method,url,headers =null,data,params=null){
        const config = {
            method ,
            url ,
            headers : {
                ...headers
            },
            data,
            params
        }
        return axios_config(config)
    }

    static get(url, headers = null, data =null, params = null){
        return this.custom('get',url,headers,data,params);
    }

    static post(url, headers = null, data =null, params = null){
        return this.custom('post',url,headers,data,params);
    }

    static put(url, headers = null, data =null, params = null){
        return this.custom('put',url,headers,data,params);
    }

    static delete(url, headers = null, data =null, params = null){
        return this.custom('delete',url,headers,data,params);
    }

    static postLogin(url,headers =null,data =null, params= null){
        return this.customLogin('post',url,headers,data,params);
    }
    static postRegister(url,header = null ,data = null,params = null){
        return this.customRegister('post',url,header,data,params);
    }

}
