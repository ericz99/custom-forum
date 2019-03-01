import { SET_LOADING_PROFILE, VIEW_PROFILE } from "../actions/types";

const initialState = {
  profile: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_PROFILE:
      return {
        ...state,
        isLoading: true
      };
    case VIEW_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
