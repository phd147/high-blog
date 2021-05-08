import {SET_WALLET, SET_TRANSACTION} from '../action/actionTypes';

const initialState = {
    balance : 0 ,
    transactions : [],
    page: 0,
    pageSize: 0,
    totalItems: 0,
    totalPage: 0 }

const   walletReducer = (state = initialState , action) => {

    switch (action.type){

        case SET_WALLET :
            return {
                ...state,
                balance: action.balance
            }

        case SET_TRANSACTION :
            return {
                ...state,
                transactions: action.transactionData.items,
                page : action.transactionData.page ,
                pageSize : action.transactionData.pageSize ,
                totalItems:  action.transactionData.totalItems ,
                totalPage:  action.transactionData.totalPage,
            }

        default :
            return state ;
    }
};


export default walletReducer;