import * as actionTypes from '../action/actionTypes';

const initialState = {
    userId : '',
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
                imagePath:  action.imagePath,
                userId : action.userId,
                nickName : action.nickName
            }
        default : 
            return state ;
    }
};


export default reducer ;

