import axios from "axios";
import * as actionTypes from "../action/actionTypes";
export const detailsPost = (postId) => async (dispatch) => {
  dispatch({ type: actionTypes.POST_DETAILS_REQUEST, payload: postId });
  try {
    const header = {
      "X-CSRF-TOKEN": "CSRF-Token",
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTc4ODkzMjIzMjkiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTc4ODkzMjIsInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTc4OTc5NjJ9.g88Yu1egUhu85zlIXmM5AFOUMPSdlfqJVg8WOh_iXPNeKO8T7KpS9QSxmBV7fsrSgQE86HZZqCAW3rer6ZKp2g",
    };
    const { data } = await axios.get(
      `http://35.240.173.198/api/v1/posts/${postId}`,
      {
        headers: header,
      }
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
  dispatch({ type: actionTypes.POST_CREATE_REQUEST, payload: postObj });
  try {
    const header = {
      "X-CSRF-TOKEN": "CSRF-Token",
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwic3ViIjoiMTE2MTc4ODkzMjIzMjkiLCJpc3MiOiJoaWdoYmxvZy5jb20iLCJpYXQiOjE2MTc4ODkzMjIsInVzZXJfaWQiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InVzZXIiLCJleHAiOjE2MTc4OTc5NjJ9.g88Yu1egUhu85zlIXmM5AFOUMPSdlfqJVg8WOh_iXPNeKO8T7KpS9QSxmBV7fsrSgQE86HZZqCAW3rer6ZKp2g",
    };
    const response = await axios.post(
      "http://35.240.173.198/api/v1/user/posts",
      postObj,
      {
        headers: header,
      }
    );
    dispatch({
      type: actionTypes.POST_CREATE_SUCCESS,
      payload: response.status,
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
