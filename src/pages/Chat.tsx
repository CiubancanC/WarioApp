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
import {
  generateMemeImage,
  generateMemeText,
} from "../components/scripts/GenerateMeme";
// import { invokeModel } from "../components/scripts/GenerateMeme";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = useCallback(
    async ({ message }: { message: string }) => {
      if (message.trim() !== "") {
        setMessages([...messages, { from: "user", text: message }]);

        try {
          const memeObj: Record<string, any> = {};
          try {
            const memeText = await generateMemeText(message);
            memeObj.text = memeText;
          } catch (error) {
            console.error("Error generating meme text: ", error);
          }
          try {
            const memeImage = await generateMemeImage(memeObj.text);
            memeObj.image = memeImage;
          } catch (error) {
            console.error("Error generating meme image: ", error);
          }
          if (memeObj.text && memeObj.image) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { from: "bot", text: memeObj.text },
              {
                from: "bot",
                text: `![meme image](data:image/png;base64,${memeObj.image})`,
              },
            ]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                from: "bot",
                text: "Sorry, I couldn't generate a meme for that.",
              },
            ]);
          }
        } catch (error) {
          console.error("Error generating meme: ", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              from: "bot",
              text: "Sorry, there was an error processing your request.",
            },
          ]);
        }
        setNewMessage("");
      }
    },
    [messages]
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
              {message.text.startsWith("![meme image]") ? (
                <img
                  src={message.text.slice(14, -1)}
                  alt="meme"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "data:image/png;base64,placeholder_image")
                  }
                />
              ) : (
                message.text
              )}
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
                onIonChange={(e) => setNewMessage(e.detail.value!)}
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
