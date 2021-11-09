import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { getContacts, setSelectedContactAndRom } from "../../../actions/page";
import { logout } from "../../../actions/auth";

export const Contacts = ({userId, contacts, selectedUser, notifications}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    !!userId && dispatch(getContacts(notifications, userId));
  }, [userId, dispatch]);

  const haveNotification = (id) =>
    notifications.some((notified) => notified === id);

  const handleSetContact = (contact) => {
    dispatch(setSelectedContactAndRom(contact, notifications, userId));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {!!contacts.length && (
        <div className="list-group px-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-3 mb-3">Contactos</h3>
            <Logout onClick={handleLogout} className="link-secondary pointer">
              Salir
            </Logout>
          </div>
          {contacts.map((contact) => (
            <SelectedContact
              selectedContact={selectedUser._id === contact._id}
              onClick={() => handleSetContact(contact)}
              type="button"
              disabled={selectedUser._id === contact._id}
              className="list-group-item list-group-item-action d-flex align-items-center"
              key={contact._id}
            >
              {contact.username}
              {haveNotification(contact._id) && (
                <Notification className="ms-auto"></Notification>
              )}
            </SelectedContact>
          ))}
        </div>
      )}
    </>
  );
};

Contacts.propTypes = {
  userId: PropTypes.string,
  contacts: PropTypes.array,
  selectedUser: PropTypes.object,
  notifications: PropTypes.array,
};

Contacts.defaultProps = {
  userId: "",
  contacts: [],
  selectedUser: {
    username: "",
    _id: "",
  },
  notifications: [],
};

const Logout = styled.span`
  text-decoration: underline;
`

const Notification = styled.div`
  width: 8px;
  height: 8px;
  background-color: #0d6efd;
  border-radius: 100%;
`;

const SelectedContact = styled.button`
  ${(props) =>
    props.selectedContact &&
    css`
      background-color: #cff4fc !important; ;
    `}
`;
