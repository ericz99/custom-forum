/***
 *  FILE: store.js
 *  MODULE: This is our redux storage => basically store our state
 */

import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer
});
