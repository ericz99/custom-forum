import {
  ADD_TOPIC,
  REMOVE_TOPIC,
  VIEW_TOPIC,
  VIEW_ALL_TOPIC,
  TOPIC_LOADING
} from "../actions/types";

const initialState = {
  topics: [],
  topic: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOPIC_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TOPIC:
      return {
        ...state,
        topics: [action.payload, ...state.topics]
      };
    case REMOVE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter(topic => topic._id !== action.payload)
      };
    case VIEW_ALL_TOPIC:
      return {
        ...state,
        topics: action.payload,
        isLoading: false
      };
    case VIEW_TOPIC:
      return {
        ...state,
        topic: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
