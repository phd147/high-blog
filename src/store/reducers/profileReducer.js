
const newsInitialState = {
    payload:[]
}
export const userDetailsReducer = (state = newsInitialState, action) => {
    switch (action.type) {
        case "GET_USER_DETAIL":
            return {
                ...state,
                payload:action.payload
            };
        default:
            return state
    }
}