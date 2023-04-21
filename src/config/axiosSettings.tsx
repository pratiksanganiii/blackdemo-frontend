import axios from "axios";

export const setAxiosInterceptor = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";
};
