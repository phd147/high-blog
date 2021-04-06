export const commentFetchReducer = (state, action) => {
  switch (action.type) {
    case "COMMENT_FETCH_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "COMMENT_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "COMMENT_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
