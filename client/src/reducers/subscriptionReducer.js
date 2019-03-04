import { FETCH_USER_SUBSCRIPTIONS } from "../actions/types";

const initialState = {
  subscriptions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload
      };
    default:
      return state;
  }
}
