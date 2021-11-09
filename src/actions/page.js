import api from "../helpers/api";
import { types } from "../types/types";

export const getContacts = (notifications, userId) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const { error, data } = await api.get("/user/users");

    const contacts = data.filter((user) => user._id !== userId);
    dispatch(setLoading());
    if (!error) {
      dispatch({
        type: types.pageContacts,
        payload: { contacts },
      });
      dispatch(setSelectedContactAndRom(contacts[0], notifications, userId));
    }
  };
};

export const setSelectedContactAndRom = (
  selectedUser,
  notifications,
  userId
) => {
  return async (dispatch) => {
    dispatch(setLoading());
    const values = {
      users: [{ id: selectedUser._id }, { id: userId }],
    };
    const { error, data } = await api.post("/user/messages", values);

    if (!error) {
      const notificationsFiltered = notifications.filter(
        (userId) => userId !== selectedUser._id
      );
      dispatch({
        type: types.pageReceiveMessageNewChat,
        payload: {
          room: data.room,
          messages: data.messages,
          selectedUser: selectedUser,
          notifications: notificationsFiltered,
        },
      });
    }
    dispatch(setLoading());
  };
};

export const setReceiveMessage = (data) => {
  return async (dispatch) => {
    dispatch({
      type: types.pageReceiveMessage,
      payload: {
        message: data,
      },
    });
  };
};

export const setNewNotification = (notification) => {
  return async (dispatch,getState) => {
      const state = getState();
      state.page.selectedUser._id !== notification &&
      dispatch({
        type: types.pageNewNotifications,
        payload: {
          notification,
        },
      });
  };
};

export const setLoading = () => {
  return {
    type: types.pageLoading,
  };
};
