import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItemDivider,
  IonButton as IonMenuButtonItem,
  IonMenuToggle,
} from "@ionic/react";
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
      <IonMenu side="start" contentId="main-content">
        <IonContent>
          <IonList>
            <IonItemDivider>Menu</IonItemDivider>
            <IonMenuToggle>
              <IonMenuButtonItem>Item 1</IonMenuButtonItem>
              <IonMenuButtonItem>Item 2</IonMenuButtonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Chat</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  /* Do nothing */
                }}
              >
                Button
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

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
      </IonPage>
    </>
  );
};

export default Chat;
