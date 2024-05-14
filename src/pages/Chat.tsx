import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonToolbar,
} from "@ionic/react";
import React, { useCallback, useState } from "react";
import "./Chat.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: "user", text: "Hello! How can I assist you today?" },
    { from: "bot", text: "Hi! I need some help with my project." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = useCallback(
    ({ message }: { message: string }) => {
      if (message.trim() !== "") {
        setMessages([...messages, { from: "user", text: message }]);
        setNewMessage("");
      }
    },
    [messages, newMessage]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const message = (event.currentTarget[0] as HTMLInputElement).value;
    event.preventDefault();
    sendMessage({ message });
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
          <IonItem lines="none">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", width: "100%" }}
            >
              <IonInput
                placeholder="Type a message..."
                value={newMessage}
                style={{ flex: 1 }}
              />
              <IonButton type="submit" slot="end">
                Send
              </IonButton>
            </form>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default Chat;
