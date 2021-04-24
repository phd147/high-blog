import ApiHelper from "../../configs/api/api-helper";
import { BASE_URL } from "../../constant";
import * as actionTypes from "../action/actionTypes";

export const detailsPost = (postId, postTitle) => async (dispatch) => {
  dispatch({ type: actionTypes.POST_DETAILS_REQUEST, payload: postId });
  try {
    const { data } = await ApiHelper.get(`${BASE_URL}/api/v1/posts/${postId}`);
    const resTitle = data.title.toLowerCase().replaceAll(" ", "-");
    dispatch({ type: actionTypes.POST_DETAILS_SUCCESS, payload: data });
    console.log("RES TITLE: ", resTitle);
    console.log("POST TITLE: ", postTitle);
    // if (resTitle === postTitle) {
    //   dispatch({ type: actionTypes.POST_DETAILS_SUCCESS, payload: data });
    // } else {
    //   dispatch({
    //     type: actionTypes.POST_DETAILS_FAILURE,
    //     error: "Post id and title is incompatible",
    //   });
    // }
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
  try {
    const { data } = await ApiHelper.post(
      `https://35.240.173.198/api/v1/user/posts`,
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
