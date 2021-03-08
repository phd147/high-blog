
import * as actionTypes from '../actionTypes';

// import {toast} from 'react-toastify';


export const changeBool = () => {
    return dispatch => {
        dispatch({type : actionTypes.CHANGE_BOOL});
        // const notify = () => toast('test some thing');
        // notify();
    }
};


export const changeCount = () => {
    return dispatch => {
        dispatch({type :actionTypes.CHANGE_COUNT});
        // const notify = () => toast('test some thing');
        // notify();
    }
}