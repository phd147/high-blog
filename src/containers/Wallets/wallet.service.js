
import ApiHelper from "../../configs/api/api-helper";


export default class WalletService extends ApiHelper {
    static getBalance(){
        const url = '/api/v1/user/wallets';
        return this.get(url);
    }

    static getUserTransactions(){
        const url = '/api/v1/user/user-transactions';
        return this.get(url);
    }
}




