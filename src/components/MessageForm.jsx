import React, { useState } from "react";

function MessageForm(props) {
  const [message, setMessage] = useState({ text: "" });

  const onChangeMessage = (e) => {
    setMessage({ text: e.target.value });
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    props.onSendMessage(message.text);
    setMessage({ text: "" });
  };

  return (
    <div>
      <form className="messengerInputarea" onSubmit={onSubmitMessage}>
        <input
          className="input"
          type="text"
          value={message.text}
          onChange={onChangeMessage}
        />
        <button
          className="messengerSendButton"
          type="submit"
          disabled={!message.text}
        >
          Send
        </button>
      </form>
    </div>
  );
}
export default MessageForm;
