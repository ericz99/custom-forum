import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenicated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
