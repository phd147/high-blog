import ApiHelper from "../../configs/api/api-helper";
import * as actionTypes from "../action/actionTypes";

export const detailsPost = (postId) => async (dispatch) => {
  dispatch({ type: actionTypes.POST_DETAILS_REQUEST, payload: postId });
  const apiHelper = new ApiHelper();
  try {
    const { data } = await apiHelper.get(
      `http://35.240.173.198/api/v1/posts/${postId}`
    );
    dispatch({ type: actionTypes.POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.POST_DETAILS_FAILURE,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (postObj) => async (dispatch) => {
  dispatch({ type: actionTypes.POST_CREATE_REQUEST });
  const apiHelper = new ApiHelper();
  try {
    const { data } = await apiHelper.post(
      `http://35.240.173.198/api/v1/user/posts`,
      null,
      postObj
    );
    console.log(data);
    dispatch({
      type: actionTypes.POST_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("highblog/new");
    dispatch({
      type: actionTypes.POST_CREATE_RESET,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.POST_CREATE_FAILURE,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
