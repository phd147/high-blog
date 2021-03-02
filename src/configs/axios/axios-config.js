import axios from 'axios';


import {getTokenFromRefreshToken} from '../../services/user.service';

const instance = axios.create({
    baseURL : 'https://api.example.com'
});

instance.interceptors.response.use(response => response, async err => {
    const originalRequest = err.config ;
    if(err.response.status === 403){
        const newAccessToken = await getTokenFromRefreshToken();

        // store this one to localstorage 
        localStorage.setItem('dut-accessToken',newAccessToken);
        instance(originalRequest);
    }
    return Promise.reject(err);
})

export default instance ;