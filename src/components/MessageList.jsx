import React, { useEffect, useRef } from "react";

function MessageList(props) {
  const messages = props.messages;
  const lastMsg = useRef(null);
  const scroll = () => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scroll, [messages]);

  return (
    <div className="messageList">

      {messages.map((message) => (
        <div
          className={message.msgClass}
          key={messages.indexOf(message)}
        >

          <div className="username">{message.username}</div>
          <div className="msg">{message.text}</div>
          <div className="time">{message.time}</div>
        </div>
      ))}

      <div ref={lastMsg} />

    </div>
  );
}
export default MessageList;