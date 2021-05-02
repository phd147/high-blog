import ApiHelper from "../../configs/api/api-helper";
import * as actionTypes from "../action/actionTypes";

export const userDetailAction = (userName) => async (dispatch) => {
  const apiHelper = new ApiHelper();
  try {
    const { data } = await apiHelper.get(
      `https://highblog.codes/api/v1/users/${userName}`
    );
    dispatch({ type: "GET_USER_DETAIL", payload: data });
  } catch (error) {
   
  }
};