import * as actionTypes from '../action/actionTypes';

const initialState = {
    userId : '',
    role : [],
    name : ''
};


const reducer = (state =initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_USER_INFOR : 
            return {
                ...state, 
                name : action.name , 
                userId : action.userId ,
                role : action.role 
            }
        default : 
            return state ;
    }
};


export default reducer ;

