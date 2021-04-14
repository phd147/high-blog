import axios from 'axios';

import {getTokenFromRefreshToken} from '../../services/user.service';

const instance = axios.create({
    baseURL : 'http://35.240.173.198'
});

instance.interceptors.response.use(response => response, async err => {
    const originalRequest = err.config ;
    if(err.response.status === 403 && err.response.mess === "expired token"){
        try {
            // call api get new access token from refresh token
            const newAccessToken = await getTokenFromRefreshToken();

            // store this one to local storage
            localStorage.setItem('dut-accessToken',newAccessToken);

        }catch(error){
            console.log(error);
            return Promise.reject(error);
        }
               
        instance(originalRequest);
    }
    return Promise.reject(err);
})

export default instance ;
