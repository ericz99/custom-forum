import {
  ADD_TOPIC,
  REMOVE_TOPIC,
  VIEW_TOPIC,
  VIEW_ALL_TOPIC,
  GET_POSTS,
  GET_POST,
  POST_LOADING
} from "./types";

const initialState = {
  topics: [],
  topic: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TOPIC:
      return {
        ...state,
        isLoading: true,
        topics: [action.payload, ...state.topics]
      };
    default:
      return state;
  }
}
