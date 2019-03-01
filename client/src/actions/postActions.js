import {
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  ADD_POST,
  REMOVE_POST,
  RESET_POSTS
} from "./types";

import axios from "axios";

// add post
export const addPost = (formData, topicId) => async dispatch => {
  try {
    // make request
    const res = await axios.post(`/api/post/topic/${topicId}/create`, formData);
    // get data
    const { data } = res.data;
    // dispatch data
    dispatch({
      type: ADD_POST,
      payload: data
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

// delete post
export const deletePost = (postId, topicId) => async dispatch => {
  try {
    // request backend
    await axios.delete(`/api/post/topic/${topicId}/delete/${postId}`);
    // dispatch result
    dispatch({
      type: REMOVE_POST,
      payload: postId
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// view post
export const viewPost = (topicId, postId) => async dispatch => {
  try {
    // set loading post
    dispatch(setPostLoading());
    // request backend
    const res = await axios.get(`/api/post/${topicId}/${postId}/view`);
    // get data
    const { data } = res.data;
    // dispatch action data
    dispatch({
      type: GET_POST,
      payload: data.json
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// view all posts of a topic
export const viewAllPost = id => async dispatch => {
  try {
    // make request
    const res = await axios.get(`/api/topic/${id}/posts/all`);
    // load post
    dispatch(setPostLoading());
    // get data
    const { data } = res.data;
    // dispatch data
    dispatch({
      type: GET_POSTS,
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

// like post
export const likePost = postId => async dispatch => {
  try {
    // like the post
    await axios.get(`/api/post/${postId}/like`);
  } catch (error) {
    if (error) {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// unlike post
export const unlikePost = postId => async dispatch => {
  try {
    // unlike the post
    await axios.get(`/api/post/${postId}/unlike`);
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    }
  }
};

// load post
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// resetting post
export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POSTS,
    payload: []
  });
};

// clear all errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
