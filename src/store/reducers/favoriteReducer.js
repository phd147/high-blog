import * as actionTypes from "../action/actionTypes";

const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export const favoriteCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FAVORITE_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FAVORITE_CREATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false,
      };
    case actionTypes.FAVORITE_CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case actionTypes.FAVORITE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
