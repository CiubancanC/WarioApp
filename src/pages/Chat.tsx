import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import "./Chat.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: "user", text: "Hello! How can I assist you today?" },
    { from: "bot", text: "Hi! I need some help with my project." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { from: "user", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <>
      <IonContent>
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.from}`}>
              {message.text}
            </div>
          ))}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonInput
              placeholder="Type a message..."
              value={newMessage}
              onIonChange={(e) => setNewMessage(e.detail.value!)}
            ></IonInput>
            <IonButton slot="end" onClick={sendMessage}>
              Send
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default Chat;
