import * as actionTypes from '../action/actionTypes';

const initialState = {
    userName : '',
    role : [],
    name : ''
};


const reducer = (state =initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_USER_INFOR : 
            return {
                ...state, 
                name : action.name , 
                userName : action.userName ,
                role : action.role 
            }
        default : 
            return state ;
    }
};


export default reducer ;

