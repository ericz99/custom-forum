import { GET_ERRORS, CLEAR_ERRORS } from "./types";
import axios from "axios";

/**
 *
 * TODO: ALERT USER - NOTIFY USER IF THEY LOGGED OUT OR ANY ERROR
 */

// alert user

// clear all errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
