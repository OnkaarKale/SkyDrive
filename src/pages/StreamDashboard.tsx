import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/StreamDashboard.css";

function StreamDashboard() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const API_BASE = "https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod";

  const [stream, setStream] = useState<any>(null);
  const [videoKey, setVideoKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [viewerCount, setViewerCount] = useState<number>(0);

  // -----------------------------
  // Fetch stream details
  // -----------------------------
  const fetchStream = async () => {
    try {
      const res = await fetch(`${API_BASE}/get-stream?streamId=${streamId}`);
      let data = await res.json();
      if (typeof data.body === "string") data = JSON.parse(data.body);
      setStream(data);

      if (data.viewerCount !== undefined) setViewerCount(data.viewerCount);
    } catch (err) {
      console.error("Stream fetch error:", err);
    }
  };

  // -----------------------------
  // Refresh Stream
  // -----------------------------
  const refreshStream = async () => {
    setRefreshing(true);
    await fetchStream();
    setVideoKey(prev => prev + 1);
    setRefreshing(false);
  };

  // -----------------------------
  // Delete Stream
  // -----------------------------
  // -----------------------------
// Delete Stream
// -----------------------------
const deleteStream = async () => {
  if (!window.confirm("Are you sure you want to delete this stream?")) return;

  try {
    const res = await fetch(`${API_BASE}/delete-stream`, {
      method: "POST",           // Keep POST as per your API
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ streamId }) // Send the streamId in body
    });

    // Lambda always returns JSON
    const data = await res.json();

    if (res.ok) {
      alert("Stream deleted successfully");
      navigate("/home"); // redirect to home page
    } else {
      alert("Failed to delete stream: " + (data.message || data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting stream");
  }
};

  // -----------------------------
  // Copy to Clipboard
  // -----------------------------
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard"))
      .catch(err => console.error("Copy failed:", err));
  };

  // -----------------------------
  // Auto refresh
  // -----------------------------
  useEffect(() => {
    fetchStream();
    const interval = setInterval(fetchStream, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stream) return <h2>Loading stream...</h2>;

  return (
    <div className="container">
      <h1>{stream.title}</h1>

      <h3>Live Preview</h3>
      <div className="video-container">
        {stream.playbackUrl ? (
          <video key={videoKey} src={stream.playbackUrl} controls autoPlay width="700" />
        ) : (
          <p>Start streaming from OBS to see preview</p>
        )}
      </div>

      <button onClick={refreshStream} disabled={refreshing}>
        {refreshing ? "Refreshing..." : "Refresh Stream"}
      </button>

      <button
        onClick={deleteStream}
        style={{ backgroundColor: "#e53935", marginLeft: "10px" }}
      >
        Delete Stream
      </button>

      <h3>Stream Details</h3>
      <div className="details">
        <p>
          <b>Stream ID:</b> {stream.streamId}
          <button onClick={() => copyToClipboard(stream.streamId)} style={{ marginLeft: "5px" }}>Copy</button>
        </p>
        <p>
          <b>RTMP URL:</b> {stream.rtmpUrl}
          <button onClick={() => copyToClipboard(stream.rtmpUrl)} style={{ marginLeft: "5px" }}>Copy</button>
        </p>
        <p>
          <b>Stream Key:</b> {stream.streamKey}
          <button onClick={() => copyToClipboard(stream.streamKey)} style={{ marginLeft: "5px" }}>Copy</button>
        </p>
        <p>
          <b>Playback URL:</b> {stream.playbackUrl}
          <button onClick={() => copyToClipboard(stream.playbackUrl)} style={{ marginLeft: "5px" }}>Copy</button>
        </p>
      </div>

      <div className="live-count">
        Live Viewers: {viewerCount}
      </div>
    </div>
  );
}

export default StreamDashboard;