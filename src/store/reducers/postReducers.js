import * as actionTypes from "../action/actionTypes";

const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export const postDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POST_DETAILS_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false,
      };
    case actionTypes.POST_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const postCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POST_CREATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false,
      };
    case actionTypes.POST_CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case actionTypes.POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
