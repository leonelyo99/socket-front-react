import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { SOCKET_URL } from "../helpers/api";
import getErrorMessage from "../helpers/errors.helper";
import { store } from "../store/store";
import { logout } from "../actions/auth";
import { useEffect, useRef } from "react";
import { setNewNotification, setReceiveMessage } from "../actions/page";

const useSocket = () => {
  const socket = io(SOCKET_URL);

  const subscriptionListenMessage = useRef(null);
  const subscriptionListenError = useRef(null);
  const subscriptionListenNotification = useRef(null);

  /**
   * Listen to messages from a specific room and before listening, check if there was already a previous instance to unsubscribe
   */
  const listenMessage = (room) => {
    if (!!subscriptionListenMessage.current) {
      subscriptionListenMessage.current.disconnect();
    }
    subscriptionListenMessage.current = socket.on(`message-${room}`, (resp) => {
      if (!resp.error) {
        store.dispatch(setReceiveMessage(resp.data));
      }
    });
  };

  /**
   * listen to error for the logged in user
   */
  subscriptionListenError.current = socket.on(`error`, (error) => {
    Swal.fire("Error", getErrorMessage(error.data.message), "error");
    if (error && error.data.status === 401) {
      store.dispatch(logout());
    }
  });

  /**
   * Emit the messages to the back
   */
  const newMessage = (message) => {
    socket.emit("new-message", message);
  };

  /**
   * listen to notifications for the logged in user
   */
  const listenNotification = (userId) => {
    subscriptionListenNotification.current = socket.on(
      `notification-${userId}`,
      (resp) => {
        store.dispatch(setNewNotification(resp.data));
      }
    );
  };

  useEffect(
    () => () => {
      if (!!subscriptionListenMessage.current?.connected) {
        subscriptionListenMessage.current.disconnect();
      }

      if (!!subscriptionListenError.current?.connected) {
        subscriptionListenError.current.disconnect();
      }

      if (!!subscriptionListenNotification.current?.connected) {
        subscriptionListenNotification.current.disconnect();
      }
    },
    []
  );

  return {
    newMessage,
    listenMessage,
    listenNotification,
  };
};

export default useSocket;
