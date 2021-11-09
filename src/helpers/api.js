import axios from "axios";
// import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import getErrorMessage from "./errors.helper";
import { store } from "../store/store";
import { logout, setToken } from "../actions/auth";

export const SOCKET_URL = "http://localhost:9090";
export const API_URL = "http://localhost:9090/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (req) {
    return addAuthenticationToken(req);
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (resp) {
    if (!!resp.headers && !!resp.headers["X-Token"]) {
      const token = resp.headers["X-Token"];
      store.dispatch(setToken(token));
    }
    return resp.data;
  },
  function (error) {
    Swal.fire(
      "Error",
      getErrorMessage(error.response.data.message),
      "error"
    ).then(() => {
      if (error && error.response.status === 401) {
        store.dispatch(logout());
        window.location.replace("/");
      }
    });
    return Promise.reject(error);
  }
);

const addAuthenticationToken = (request) => {
  const state = store.getState()
  const token  = state?.auth?.token
  if (!token) {
    return request;
  } else if (request.url.match(/localhost\//)) {
    return request;
  } else {
    request.headers["Authorization"] = "Bearer " + token;
    return request;
  }
};

export default api;
