import ApiHelper from "../../configs/api/api-helper";
import * as actionTypes from "../action/actionTypes";

export const createFavorite = (postId) => async (dispatch) => {
  dispatch({ type: actionTypes.FAVORITE_CREATE_REQUEST });
  const apiHelper = new ApiHelper();
  try {
    const response = await apiHelper.post(
      `http://35.240.173.198/api/v1/user/favorite-posts`,
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
