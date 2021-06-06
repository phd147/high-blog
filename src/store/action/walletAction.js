import {SET_WALLET, SET_TRANSACTION} from './actionTypes';
import WalletService from "../../containers/Wallets/wallet.service";
import {toast} from "react-toastify";


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
            console.log(err);
            toast.error(err.response.data.message);
        }

    }
}

export const getUserTransaction = (page) => {
    return async dispatch => {
        try {
            const res = await WalletService.getUserTransactions(page);
            const data = res.data ;
            dispatch(
                {type : SET_TRANSACTION,transactionData : data }
            )
        }
        catch(err){
            console.log(err.response);
            toast.error(err.response.message);
        }
    }

}


export const withDrawalAction = data => {
    return async dispatch => {
        try {
            const res = await WalletService.withDrawal(data);
            dispatch(getWallet());
            dispatch(getUserTransaction())
            toast.success('Success');
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
}