import { GET_ERRORS, SET_LOADING_PROFILE, VIEW_PROFILE } from "./types";

import axios from "axios";

// view user profile
export const viewProfile = () => async dispatch => {
  try {
    // make request to our endpoint
    const res = await axios.get("/api/profile/load");
    // get data from res.data
    const { data } = res.data;
    // dispatch our action
    dispatch({
      type: VIEW_PROFILE,
      payload: data.json
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// SET loading profile
export const setLoadingProfile = () => {
  return {
    type: SET_LOADING_PROFILE
  };
};
