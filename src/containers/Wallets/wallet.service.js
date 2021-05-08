
import ApiHelper from "../../configs/api/api-helper";


export default class WalletService extends ApiHelper {
    static getBalance(){
        const url = '/api/v1/user/wallets';
        return this.get(url);
    }

    static getUserTransactions(page=1){
        const url = `/api/v1/user/user-transactions?page=${page}&pageSize=10`;
        return this.get(url);
    }
}




