import ApiHelper from "../../configs/api/api-helper";
import { BASE_URL } from "../../constant";
import * as actionTypes from "../action/actionTypes";

export const getFavorites = (page, pageSize) => async (dispatch) => {
  dispatch({ type: actionTypes.FAVORITE_LIST_REQUEST });
  try {
    const response = await ApiHelper.get(
      `${BASE_URL}/api/v1/user/favorite-posts`,
      null,
      null,
      { page, pageSize }
    );
    dispatch({
      type: actionTypes.FAVORITE_LIST_SUCCESS,
      payload: response.data,
    });
    // dispatch({
    //   type: actionTypes.FAVORITE_LIST_RESET,
    // });
  } catch (error) {
    dispatch({
      type: actionTypes.FAVORITE_LIST_FAILURE,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFavorite = (postId) => async (dispatch) => {
  dispatch({ type: actionTypes.FAVORITE_CREATE_REQUEST });
  try {
    const response = await ApiHelper.post(
      `${BASE_URL}/api/v1/user/favorite-posts`,
      null,
      { postId }
    );
    dispatch({
      type: actionTypes.FAVORITE_CREATE_SUCCESS,
      payload: response.status,
    });
    // dispatch({
    //   type: actionTypes.FAVORITE_CREATE_RESET,
    // });
  } catch (error) {
    dispatch({
      type: actionTypes.FAVORITE_CREATE_FAILURE,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFavorite = (postId) => async (dispatch) => {
  dispatch({ type: actionTypes.FAVORITE_DELETE_REQUEST });
  try {
    const response = await ApiHelper.delete(
      `${BASE_URL}/api/v1/user/favorite-posts`,
      null,
      null,
      { postId }
    );
    console.log("success");
    dispatch({
      type: actionTypes.FAVORITE_DELETE_SUCCESS,
      payload: response.status,
    });
    // dispatch({
    //   type: actionTypes.FAVORITE_DELETE_RESET,
    // });
  } catch (error) {
    dispatch({
      type: actionTypes.FAVORITE_DELETE_FAILURE,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
