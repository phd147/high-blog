
import * as actionTypes from '../actionTypes'

export const changeBool = () => {
    return dispatch => {

        dispatch({type : actionTypes.CHANGE_BOOL});
    
    }
};


export const changeCount = () => {
    return dispatch => {
        dispatch({type :actionTypes.CHANGE_COUNT})
    }
}