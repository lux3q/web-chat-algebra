import React, { useState, useEffect } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import setRandomName from "./utilities/SetRandomName";

function App() {
  const [user, setUser] = useState({
    username: setRandomName(),
  });
  const [newMessage, setNewMessage] = useState([]);
  const [connect, setConnect] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const connect = new window.Scaledrone("JGmqrCsbmbemwbQe", {
      data: user,
    });
    setConnect(connect);
    // eslint-disable-next-line
  }, []);
  if (connect) {
    connect.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }
      const myUser = users;
      myUser.push(user);
      setUsers(myUser);

      const chatUser = { ...user };
      user.id = connect.clientId;
      setUser({ chatUser });

    

      const chatRoom = connect.subscribe("observable-room");
      chatRoom.on("data", (text, chatUser) => {
        const messages = newMessage;
        const username = chatUser.clientData.username;
        const chatUserID = chatUser.id;
        const currentChatUser = chatUser;
        const splitMessages = currentChatUser.id === user.id;
        const msgClass= splitMessages ? "my-msg" : "other-msg";
        const date = new Date();
        const time = date.getHours()+":"+date.getMinutes();
        messages.push({ text, username, chatUserID, time, msgClass });
        setNewMessage([...newMessage, messages]);
      });
    });
  }

  const onNewMessage = (message) => {
    connect.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    
    <div className="App">
      <h1 className="app_name">Galaxy Chat</h1>
      <div className="msger">
        <MessageList newMessage={newMessage} />
        
      </div>
      <MessageForm onNewMessage={onNewMessage} users={users} />
    </div>
  );
}
export default App;
