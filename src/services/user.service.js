import Api from '../configs/api/api-helper';

export function getUserInfor() {
    const url = 'api/v1/me';
    return new Api().get(url);
}

export const checkToken = () => {
    return localStorage.getItem('dut-accessToken') || sessionStorage.getItem('dut-accessToken');
}