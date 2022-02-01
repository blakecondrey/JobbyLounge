import { ActionTypes } from "./actions.types";

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case ActionTypes.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case ActionTypes.REGISTER_USER_BEGIN:
      return { ...state, isLoading: true };
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User Created. Redirecting...",
      };
    case ActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    default:
      return new Error(`No Such Action :${action.type}`);
  }
};

export default reducer;
