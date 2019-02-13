import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import firebase from "../base";

// a register action
export const registerUser = (userData, history) => dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res
      });
    })
    .then(() => history.push("/"))
    .catch(err => {
      if (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        });
      }
    });
};

// a login action

// setting a user function

// logging off user
