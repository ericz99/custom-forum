import { INFO_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from "../actions/types";

const initialState = {
  infoMessage: {},
  errorMessage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INFO_MESSAGE:
      return {
        ...state,
        infoMessage: action.payload
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
