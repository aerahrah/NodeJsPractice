import Axios from "axios";
import { getCookie } from "./cookieUtils";

Axios.interceptors.request.use((config) => {
  const savedToken = getCookie("token"); // Retrieve the token from the cookie
  config.headers.Authorization = `Bearer ${savedToken}`;
  return config;
});

export default Axios;