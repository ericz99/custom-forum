import {
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_TOPIC,
  REMOVE_TOPIC,
  VIEW_TOPIC,
  VIEW_ALL_TOPIC,
  TOPIC_LOADING
} from "./types";

import axios from "axios";

// add topic
export const addTopic = formData => async dispatch => {
  try {
    // get the response of the data after submitting
    const res = await axios.post("/api/topic/create-topic", formData);
    // get the actual data from the res.data
    const { data } = res.data;
    // dispatch to our reducer
    dispatch({
      type: ADD_TOPIC,
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

// view all topics
export const viewAllTopic = () => async dispatch => {
  try {
    // set topic to loading state => after we successfuly make a full request we render our topics
    dispatch(setTopicLoading());
    const res = await axios.get("/api/topic/fetch-all");
    const { data } = res.data;
    dispatch({
      type: VIEW_ALL_TOPIC,
      payload: data
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    }
  }
};

// view topic
export const viewTopic = topicId => async dispatch => {
  try {
    // set topic loading
    dispatch(setTopicLoading());
    // get data response from server
    const res = await axios.get(`/api/topic/fetch/:${topicId}`);
    // get data destructured
    const { data } = res.data;
    // dispatch data to reducer
    dispatch({
      type: VIEW_TOPIC,
      payload: data
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    }
  }
};

// remove topic
export const removeTopic = topicId => async dispatch => {
  try {
    // get data from server
    const res = await axios.delete(`/api/topic/delete/:${topicId}`);
    // get data by desc es6
    const { data } = res.data;
    // dispatch our payload data to our reducer
    dispatch({
      type: REMOVE_TOPIC,
      payload: data
    });
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: null
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

// topic loading
export const setTopicLoading = () => {
  return {
    type: TOPIC_LOADING
  };
};
