import {SET_WALLET,SET_TRANSACTION} from './actionTypes';
import WalletService from "../../containers/Wallets/wallet.service";


export const getWallet = () => {
    return async dispatch => {
        try {
            const res = await WalletService.getBalance();
            console.log(res);
            dispatch(
                {type : SET_WALLET,balance: res.data.balance}
            )
        }
        catch(err){

        }

    }
}


export const getUserTransaction = () => {
    return async dispatch => {
        try {
            const res = await WalletService.getUserTransactions();
            console.log(res);
            const data = res.data ;
            dispatch(
                {type : SET_TRANSACTION,transactionData : data }
            )
        }
        catch(err){

        }

    }
}