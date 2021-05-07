import * as actionTypes from '../action/actionTypes';

const initialState = {
    userId: '',
    roles: [],
    firstName: '',
    lastName: '',
    imagePath: ''
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_USER_INFOR :
            return {
                ...state,
                roles: action.roles,
                firstName: action.firstName,
                lastName: action.lastName,
                userId: action.userId,
                nickName: action.nickName,
                imagePath: action.imagePath,
            }
        case actionTypes.UPDATE_USER_AVATAR:
            console.log("Previous state: ", state);
            console.log(action.imagePath);
            return {
                ...state,
                imagePath: action.imagePath,
            };
        default :
            return state

    }
};


export default reducer;

