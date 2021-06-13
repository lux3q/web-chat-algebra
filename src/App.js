import React, { useState, useEffect } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import setRandomName from "./utilities/SetRandomName";

function App() {
  const [user, setUser] = useState({
    username: setRandomName(),
  });
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const drone = new window.Scaledrone("JGmqrCsbmbemwbQe", {
      data: user,
    });
    setDrone(drone);
    // eslint-disable-next-line
  }, []);
  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }
      const myUsers = users;
      myUsers.push(user);
      setUsers(myUsers);

      const chatUser = { ...user };
      user.id = drone.clientId;
      setUser({ chatUser });

      const chatRoom = drone.subscribe("observable-room");
      chatRoom.on("data", (text, chatUser) => {
        const tempMessages = messages;
        const username = chatUser.clientData.username;
        const chatUserID = chatUser.id;
        const currentChatUser = chatUser;
        const splitMessages = currentChatUser.id === user.id;
        const msgClass= splitMessages ? "my-msg" : "other-msg";
        const date = new Date();
        const time = date.getHours()+":"+date.getMinutes();
        tempMessages.push({ text, username, chatUserID, time, msgClass });
        setMessages([...tempMessages, messages]);
      });
    });
  }

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    
    <div className="App">
      <h1 className="app_name">Galaxy Chat</h1>
      <div className="msger">
        <MessageList messages={messages} />
        
      </div>
      <MessageForm onSendMessage={onSendMessage} users={users} />
    </div>
  );
}
export default App;
