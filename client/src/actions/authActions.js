import { GET_ERRORS, SET_CURRENT_USER } from "./types";

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// a register action
export const registerUser = (userData, history) => async dispatch => {
  try {
    // get the response first
    const res = await axios.post("/api/users/register", userData);
    // just checking status of 200
    if (res.data.statusCode === 200) {
      // push to login page
      history.push("/login");
    }
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// a login action
export const loginUser = userData => async dispatch => {
  try {
    // get user res when loggin in
    const res = await axios.post("/api/users/login", userData);
    const token = res.data.data.token;
    // save token to ls
    localStorage.setItem("jwtToken", token);
    // setauthtoken => for our header
    setAuthToken(token);
    // decode token to get user data
    const decoded = jwt_decode(token);
    // set as current user
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// setting a user function
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// logging off user
export const logoutUser = () => dispatch => {
  // remove local storage
  localStorage.removeItem("jwtToken");
  // set auth false
  setAuthToken(false);
  // setCurrent user nothing => which set to authenticated false
  dispatch(setCurrentUser({}));
  // redirect user back to login
  window.location.href = "/login";
};
