import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: import.meta.env.VITE_AXIOS_AUTH_TOKEN,
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.axios = Axios;
  },
};
