import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { userRef, authRef } from "../base";

// a register action
export const registerUser = (userData, history) => dispatch => {
  authRef
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(res => {
      userRef(res.user.uid).set({
        fullName: userData.name,
        email: userData.email
      });
    })
    .then(() => history.push("/dashboard"))
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
