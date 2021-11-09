import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "../../../hooks/useForm";

export const Chat = ({ room, messages, token, userId, username, newMessage }) => {

  const [formChatValues, handleFormChatValues, reset] = useForm({
    messageInput: "",
  });
  const { messageInput } = formChatValues;

  const handleSend = (event) => {
    if (!!messageInput && !!room && event.which === 13) {
      newMessage({
        message: messageInput,
        room,
        user: {
          token,
          username,
        },
      });
      reset({ messageInput: "" });
    }
  };

  return (
    <MessagesContainer>
      <Messages className="px-4 py-4 d-flex flex-column">
        {!!messages.length &&
          messages.map((message, index) => (
            <Message
              key={`message-${index}`}
              myMessage={message?.user === userId}
              className={`card col-6 col-sm-5 col-md-4 col-lg-3 mt-4 ${
                message?.user === userId && "ms-auto"
              }`}
            >
              <div className="card-body">{message?.data}</div>
            </Message>
          ))}
        <div className="clearfix"></div>
      </Messages>
      <div className="px-4">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Mensaje..."
          aria-label="Mensaje..."
          minLength="2"
          value={messageInput}
          onChange={handleFormChatValues}
          name="messageInput"
          onKeyUp={handleSend}
        />
      </div>
    </MessagesContainer>
  );
};

Chat.propTypes = {
  newMessage: PropTypes.func.isRequired, 
  room: PropTypes.string,
  messages: PropTypes.array,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

Chat.defaultProps = {
  room: "",
  messages: [],
  token: "",
  userId: "",
  username: "",
};

const MessagesContainer = styled.div`
  height: 100vh;
  background-color: #cff4fc;
`;

const Messages = styled.div`
  height: calc(100vh - 56px);
  overflow-y: scroll;
`;

const Message = styled.div`
  ${(props) =>
    props.myMessage &&
    css`
      background-color: #d2f4ea;
    `};
`;
