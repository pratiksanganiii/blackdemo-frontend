import { message } from "antd";
import axios from "axios";

const setAxiosBaseUrl = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";
};

const resetStore = (): void => {
  const authToken = localStorage.getItem("token");
  authToken && localStorage.removeItem("token");
  authToken && (window.location.href = "/login");
  localStorage.getItem("project") && localStorage.removeItem("project");
  localStorage.getItem("company") && localStorage.removeItem("company");
  localStorage.getItem("stackModule") && localStorage.removeItem("stackModule");
  localStorage.getItem("viewCompanyAsId") &&
    localStorage.removeItem("viewCompanyAsId");
};

const setAxiosInterceptor = () => {
  axios.interceptors.request.use((config) => {
    let header: any = config.headers;
    header = {
      ...header,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const authToken = localStorage.getItem("token");
    header = authToken
      ? {
          ...header,
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        }
      : {
          ...header,
          Accept: "application/json",
        };
    config.headers = header;
    /** In dev, intercepts request and logs it into console for dev */
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.message) {
        message.success(response.data.message);
      }
      return response;
    },
    (e) => {
      if (e.response) {
        if (e.response.data?.message) {
          message.error(e.response.data.message);
        }
        if (e.response.status === 401) {
          resetStore();
        }

        return Promise.reject(e.response);
      } else {
        message.error("Network issue");
        return Promise.reject({
          data: [],
          message: "Network issue",
        });
      }
    }
  );
};

const setNotificationConfig = (): void => {
  message.config({
    maxCount: 1,
    duration: 5,
  });
};

const initializeApp = () => {
  setAxiosBaseUrl();
  setAxiosInterceptor();
  setNotificationConfig();
};

const rootService = {
  initializeApp,
};
export default rootService;
