

const newsInitialState = {
    payload:[]
}
export const newsFeedReducer = (state = newsInitialState, action) => {
    switch (action.type) {
        case "FETCH_LIST_POST":
            console.log('day la reducer' + action.payload)
            return {
                ...state,
                payload:action.payload
            };
        default:
            return state
    }
}