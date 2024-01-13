import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: import.meta.env.VITE_AXIOS_AUTH_TOKEN,
    "Content-Type": "application/json",
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.axios = Axios;
  },
};
