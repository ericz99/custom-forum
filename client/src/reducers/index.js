/***
 *  FILE: store.js
 *  MODULE: This is our redux storage => basically store our state
 */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import topicReducer from "./topicReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";
import alertReducer from "./alertReducer";
import subscriptionReducer from "./subscriptionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  topic: topicReducer,
  post: postReducer,
  profile: profileReducer,
  alert: alertReducer,
  subscription: subscriptionReducer
});
