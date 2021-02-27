import * as actionTypes from '../action/actionTypes';

const intialState = {
    count : 0
};


export const oneReducer = (state = intialState, action) => {
    switch(action.type){
        case (actionTypes.CHANGE_COUNT) : 
            return {
                ...state , 
                count : state.count +1 
            } ;
        default : 
            return state ;
    }
};