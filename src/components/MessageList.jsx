import React, { useEffect, useRef } from "react";

export default function MessageCreator(props) {
  const message = props.newMessage;
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [message]);

  return (
    <div className="messageList">
       
      {props.newMessage.map((message) => (
        <div
          className={message.msgClass}
          key={props.newMessage.indexOf(message)}
        >
          
          <div className="username">{message.username}</div>
          <div className="time">{message.time}</div>
          <div className="msg">
            {message.text}
            
          </div>
          </div>
      
      
      ))}
      
      <div ref={messageEndRef} />
      
      </div>
  );
}
