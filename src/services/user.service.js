import Api from '../configs/api/api-helper';

export function getUserInfor() {
    const url = 'api/v1/me';
    return new Api().get(url);
}

export const checkToken = () => {
    return localStorage.getItem('dut-accessToken') || sessionStorage.getItem('dut-accessToken');
}

export const getTokenFromRefreshToken = () => {
    const url = 'api/v1/token';
    const data = {
        refreshToken : localStorage.getItem('dut-refreshToken')
    }
    return new Api().post(url,null,data);
    
}