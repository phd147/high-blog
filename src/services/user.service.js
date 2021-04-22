import Api from '../configs/api/api-helper';

export function getUserInfor() {
    const url = 'api/v1/profiles';
    return Api.get(url);
}

export function removeToken(){
    localStorage.removeItem('dut-accessToken');
    sessionStorage.removeItem('dut-accessToken');
}


export const checkToken = () => {
    return localStorage.getItem('dut-accessToken') 
}

export const getTokenFromRefreshToken = () => {
    const url = '/api/v1/auth/refresh';
    const data = {
        refreshToken : localStorage.getItem('dut-refreshToken')
    }
    return Api.post(url,null,data);
    
}