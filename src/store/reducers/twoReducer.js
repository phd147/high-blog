
import * as actionTypes from '../action/actionTypes';

const initialState = {
    bool : true 
};


export const twoReducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.CHANGE_BOOL : 
            return {
                ...state , 
                bool : !state.bool 
            };
        default : 
            return state ; 
    }

};