import * as actionTypes from '../action/actionTypes';

const initialState = {
    roles : [],
    firstName : '',
    lastName  : '',
    imagePath : ''
};


const reducer = (state =initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_USER_INFOR : 
            return {
                ...state, 
                roles : action.roles ,
                firstName: action.firstName  ,
                lastName : action.lastName ,
                imagePath:  action.imagePath
            }
        default : 
            return state ;
    }
};


export default reducer ;

