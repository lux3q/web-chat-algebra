import React, { useState } from "react";

export default function MessageForm(props) {
  const [message, setMessage] = useState({
    text: "",
  });

  const onChangeMessage = (e) => {
    setMessage({ text: e.target.value });
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (typeof props.onNewMessage === "function") {
      props.onNewMessage(message.text);
    }
    setMessage({ text: "" });
  };

  return (
    <div>
      <form className="msger-inputarea " onSubmit={onSubmitMessage}>
        <input
          className="input"
          type="text"
          value={message.text}
          onChange={onChangeMessage}
        />
        <button className="msger-send-btn" type="submit" disabled={!message.text}>
          Send
        </button>
      </form>
    </div>
  );
}
