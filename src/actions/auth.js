import api from "../helpers/api";
import { types } from "../types/types";

export const login = (user) => {
  return async (dispatch) => {
    const { data } = await api.post("/auth/login", { ...user });
    const { username, token, _id } = data;

    localStorage.setItem("userId", _id);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    dispatch({
      type: types.authLogin,
      payload: {
        username,
        token,
        userId: _id,
      },
    });
  };
};

export const signup = (user) => {
  return async (dispatch) => {
    const { data } = await api.post("/auth/signup", user);
    const { username, token, _id } = data;

    dispatch({
      type: types.authLogin,
      payload: {
        username,
        token,
        userId: _id,
      },
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    dispatch({
      type: types.authLogout,
    });
  };
};

export const setToken = (token) => {
  return (dispatch) => {
    localStorage.setItem("token", token);
    dispatch({
      type: types.authSaveToken,
      payload: {
        token,
      },
    });
  };
};
