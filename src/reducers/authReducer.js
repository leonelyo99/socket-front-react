import { types } from "../types/types";

const initialState = {
  token: !!localStorage.getItem("token") ? localStorage.getItem("token") : null,
  username: !!localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null,
  userId: !!localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
      };

    case types.authLogout:
      return {
        token: null,
        username: null,
        userId: null,
      };

    case types.authSaveToken:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
