import {
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  ADD_POST,
  REMOVE_POST,
  RESET_POSTS
} from "../actions/types";

import _ from "underscore";

const initialState = {
  posts: [],
  post: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case POST_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
