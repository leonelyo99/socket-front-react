import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Chat } from "../components/Chat.js";
import { Contacts } from "../components/Contacts.js";
import FRIENDS_IMAGE from "../../../assets/icons/friends.svg";
import MESSAGES_IMAGE from "../../../assets/icons/messages.svg";
import useSocket from "../../../hooks/useSocket.js";

export const PageView = () => {
  const { loading, room, contacts, selectedUser, notifications, messages } =
    useSelector((state) => state.page);
  const { userId, token, username } = useSelector((state) => state.auth);

  const [seeContacts, setSeeContacts] = useState(false);
  
  const { listenNotification, listenMessage, newMessage } = useSocket();

  const handleSeeContacts = () => {
    setSeeContacts(!seeContacts);
  };

  useEffect(() => {
    !!userId && listenNotification(userId);
  }, [userId]);

  useEffect(() => {
    !!selectedUser._id && listenMessage(room);
  }, [selectedUser]);

  return (
    <>
      <div className={`d-flex flex-row ${loading && "d-none"}`}>
        <FloatButton className="d-block d-md-none" onClick={handleSeeContacts}>
          {seeContacts ? (
            <img alt="friends" src={FRIENDS_IMAGE} className="figure-img img-fluid" />
          ) : (
            <img  alt="messages" src={MESSAGES_IMAGE} className="figure-img img-fluid" />
          )}
        </FloatButton>
        <div
          className={`col-12 col-md-4 border-end ${
            !seeContacts ? "d-block" : "d-none d-md-block"
          }`}
        >
          <Contacts
            userId={userId}
            contacts={contacts}
            selectedUser={selectedUser}
            notifications={notifications}
          />
        </div>
        {!!room && !!room.length && (
          <div
            className={`col-12 col-md-8 ${
              seeContacts ? "d-block" : "d-none d-md-block"
            }`}
          >
            <Chat
              room={room}
              messages={messages}
              token={token}
              userId={userId}
              username={username}
              newMessage={newMessage}
            />
          </div>
        )}
      </div>
      {loading && (
        <SpinnerContainer>
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </SpinnerContainer>
      )}
    </>
  );
};

const FloatButton = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 100;
  bottom: 50px;
  right: 24px;
  cursor: pointer;
  filter: invert(30%);
`;

const SpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
