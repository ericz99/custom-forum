import { GET_ERRORS, INFO_MESSAGE, ERROR_MESSAGE } from "./types";
import axios from "axios";

export const requestPasswordChange = () => async dispatch => {
  try {
    const res = await axios.get("/api/users/change-password");
    const { data } = res.data;
    if (res.status === 200) {
      dispatch({
        type: INFO_MESSAGE,
        payload: data
      });
    } else {
      dispatch({
        type: ERROR_MESSAGE,
        payload: data
      });
    }
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};
