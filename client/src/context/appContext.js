import React, { useReducer, useContext } from "react";
import { ActionTypes } from "./actions.types";

import reducer from "./reducer";

import axios from "axios";

// set up user to moment application loads
// grab token, user, location from local storage on initial load

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  positon: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer: ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: ActionTypes.DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionTypes.CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: ActionTypes.SETUP_USER_START });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;

      dispatch({
        type: ActionTypes.SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: ActionTypes.SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: ActionTypes.UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/update_user", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      // console.log(error.response);
      if (error.response.status !== 401) {
        dispatch({
          type: ActionTypes.UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: ActionTypes.LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: ActionTypes.HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({
      type: ActionTypes.CLEAR_VALUES,
    });
  };

  const createJob = async () => {
    dispatch({
      type: ActionTypes.CREATE_JOB_BEGIN,
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: ActionTypes.CREATE_JOB_SUCCESS,
      });
      dispatch({
        type: ActionTypes.CLEAR_VALUES,
      });
      clearAlert();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ActionTypes.CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        updateUser,
        logoutUser,
        handleChange,
        clearValues,
        createJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
