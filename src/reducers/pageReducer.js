import { types } from "../types/types";

const initialState = {
  room: "",
  selectedUser: {
    username: "",
    _id: "",
  },
  messages: [],
  contacts: [],
  notifications: [],
  loading: false,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.pageReceiveMessageNewChat:
      return {
        ...state,
        ...action.payload,
      };

    case types.pageReceiveMessage:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };

    case types.pageNotifications:
      return {
        ...state,
        ...action.payload,
      };

    case types.pageNewNotifications:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification],
      };

    case types.pageContacts:
      return {
        ...state,
        ...action.payload,
      };

    case types.pageLoading:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};
