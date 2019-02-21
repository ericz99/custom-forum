import {
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_TOPIC,
  REMOVE_TOPIC,
  VIEW_TOPIC,
  VIEW_ALL_TOPIC,
  GET_POSTS,
  GET_POST,
  POST_LOADING
} from "./types";

import axios from "axios";

// add topic
export const addTopic = data => async dispatch => {
  try {
    // get the response of the data after submitting
    const res = await axios.post("/api/topic/create-topic", data);
    // dispatch to our reducer
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// clear all errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
