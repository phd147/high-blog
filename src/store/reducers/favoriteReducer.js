import * as actionTypes from "../action/actionTypes";

const initialState = {
  payload: [],
  isLoading: false,
  error: {},
};

export const favoriteListReducer = (
  state = { favorites: [], isLoading: true, error: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.FAVORITE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.concat(action.payload.items),
        page: action.payload.page,
        isLoading: false,
      };
    case actionTypes.FAVORITE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case actionTypes.FAVORITE_LIST_RESET:
      return {
        favorites: [],
      };
    default:
      return state;
  }
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

export const favoriteDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FAVORITE_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FAVORITE_DELETE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false,
      };
    case actionTypes.FAVORITE_DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case actionTypes.FAVORITE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
