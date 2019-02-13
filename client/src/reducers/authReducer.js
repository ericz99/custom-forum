import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenicated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenicated: true,
        user: action.payload
      };
    default:
      return state;
  }
}
