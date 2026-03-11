import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatRoom } from "amazon-ivs-chat-messaging";

function StreamDashboard() {

  const { streamId } = useParams();

  const API_BASE =
    "https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod";

  const [stream, setStream] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatRoom, setChatRoom] = useState<any>(null);
  const [videoKey, setVideoKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // -----------------------------
  // Fetch stream details
  // -----------------------------
  const fetchStream = async () => {

    try {

      const res = await fetch(
        `${API_BASE}/get-stream?streamId=${streamId}`
      );

      let data = await res.json();

      if (typeof data.body === "string") {
        data = JSON.parse(data.body);
      }

      setStream(data);

    } catch (err) {
      console.error("Stream fetch error:", err);
    }
  };

  // -----------------------------
  // Refresh button
  // -----------------------------
  const refreshStream = async () => {

    setRefreshing(true);

    await fetchStream();

    setVideoKey(prev => prev + 1);

    setRefreshing(false);
  };

  // -----------------------------
  // Connect to IVS chat
  // -----------------------------
  const connectChat = async () => {

    try {

      const res = await fetch(
        `${API_BASE}/get-chat-token?streamId=${streamId}&userId=viewer`
      );

      let data = await res.json();

      if (typeof data.body === "string") {
        data = JSON.parse(data.body);
      }

      const token = data.token;

      if (!token) {
        console.error("Chat token missing");
        return;
      }

      const room = new ChatRoom({
        region: "us-east-1",
        token: token
      });

      room.on("message", (event: any) => {

        setMessages(prev => [
          ...prev,
          {
            user: event.sender?.userId,
            text: event.content
          }
        ]);

      });

      await room.connect();

      setChatRoom(room);

      console.log("Chat connected");

    } catch (err) {
      console.error("Chat connection error:", err);
    }
  };

  // -----------------------------
  // Send message
  // -----------------------------
  const sendMessage = async () => {

    if (!chatRoom) {
      console.log("Chat not connected yet");
      return;
    }

    if (messageInput.trim() === "") return;

    try {

      await chatRoom.sendMessage(messageInput);

      setMessageInput("");

    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  // -----------------------------
  // Auto scroll chat
  // -----------------------------
  useEffect(() => {

    chatBottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  // -----------------------------
  // Initial load
  // -----------------------------
  useEffect(() => {

    fetchStream();
    connectChat();

    const interval = setInterval(fetchStream, 3000);

    return () => {

      clearInterval(interval);

      if (chatRoom) {
        chatRoom.disconnect();
      }

    };

  }, []);

  if (!stream) return <h2>Loading stream...</h2>;

  return (

    <div style={{ padding: "20px" }}>

      <h1>{stream.title}</h1>

      <h3>Live Preview</h3>

      {stream.playbackUrl ? (

        <video
          key={videoKey}
          src={stream.playbackUrl}
          controls
          autoPlay
          width="700"
        />

      ) : (
        <p>Start streaming from OBS to see preview</p>
      )}

      <br />

      <button onClick={refreshStream} disabled={refreshing}>

        {refreshing ? "Refreshing..." : "Refresh Stream"}

      </button>

      <h3>Stream Details</h3>

      <p><b>Stream ID:</b> {stream.streamId}</p>
      <p><b>RTMP URL:</b> {stream.rtmpUrl}</p>
      <p><b>Stream Key:</b> {stream.streamKey}</p>
      <p><b>Playback URL:</b> {stream.playbackUrl}</p>

      <h3>Live Chat</h3>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        {messages.map((msg, index) => (

          <div key={index}>
            <b>{msg.user}</b>: {msg.text}
          </div>

        ))}

        <div ref={chatBottomRef}></div>

      </div>

      <input
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type message"
        style={{ width: "70%", marginRight: "10px" }}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>

  );

}

export default StreamDashboard;