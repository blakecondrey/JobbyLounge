import { ActionTypes } from "./actions.types";
import { initialState } from "./appContext";

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
    case ActionTypes.SETUP_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case ActionTypes.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case ActionTypes.LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: null,
        jobLocation: null,
      };
    case ActionTypes.UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated",
      };
    case ActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case ActionTypes.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ActionTypes.CLEAR_VALUES:
      const clearValuesState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobType: "full-time",
        status: "pending",
      };
      return {
        ...state,
        ...clearValuesState,
      };
    case ActionTypes.CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New Job Added",
      };
    case ActionTypes.CREATE_JOB_ERROR:
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
