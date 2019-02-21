import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // else apply it to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
