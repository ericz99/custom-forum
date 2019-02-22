/***
 *  FILE: store.js
 *  MODULE: This is our redux storage => basically store our state
 */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import topicReducer from "./topicReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  topic: topicReducer
});
