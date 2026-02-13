import ChatMessage from "./ChatMessage";
import "./styles/LiveChat.css";



export const chatMessages = [
  { user: "Piyush", message: "This stream is fire 🔥" },
  { user: "Onkar", message: "Nice UI bro!" },
  { user: "React", message: "Whats u looking at " },
  { user: "Onkar", message: "F*#k Nooo! 😭" },
  { user: "Piyush", message: "Hahaha 😂" },
];



export default function LiveChat() {
  return (
    <div className="live-chat">
      <div className="header">
        <h1>Live Chat</h1>
        <span className="material-symbols-outlined">group</span>
        <h2>18.2K</h2>
      </div>

      <div className="chat-messages">
        {chatMessages.map((msg, i) => (
          <ChatMessage key={i} {...msg} />
        ))}
      </div>

      <div className="message-box">
        <input placeholder="Chat..." />
        <span className="material-symbols-outlined">send</span>
      </div>
    </div>
  );
}
