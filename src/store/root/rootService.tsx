import { FormInstance, message } from "antd";
import axios from "axios";
import { ErrorProps } from "./rootType";

const setAxiosBaseUrl = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";
};

const resetStore = (): void => {
  const authToken = localStorage.getItem("token");
  authToken && localStorage.removeItem("token");
  authToken && (window.location.href = "/login");
};

export const assignErrorToInput = (
  form: FormInstance,
  errors?: ErrorProps
): void => {
  if (errors?.length) {
    form.setFields(errors);
  }
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

const testAPIStatus = async () => {
  return (await axios.get("/")).data;
};

const initializeApp = () => {
  setAxiosBaseUrl();
  setAxiosInterceptor();
  setNotificationConfig();
};

const rootService = {
  initializeApp,
  testAPIStatus
};
export default rootService;
