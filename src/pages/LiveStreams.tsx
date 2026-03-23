import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import "./styles/LiveStreams.css";

interface Stream {
  streamId: string;
  title: string;
  username: string;
  category?: string;
  thumbnailUrl?: string;
  playbackUrl: string;
}

function LiveStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  // Fetch live streams from backend
  const fetchStreams = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod/live-streams"
      );
      let data: any = await res.json();

      // If using API Gateway proxy, parse body
      if (data.body) data = JSON.parse(data.body);

      if (!Array.isArray(data)) data = [];

      const mappedStreams: Stream[] = data.map((s: any) => ({
        streamId: s.streamId || s.id || "",
        title: s.title || "Untitled Stream",
        username: s.username || s.userId || "Anonymous",
        category: s.category || "General",
        thumbnailUrl: s.thumbnailUrl || "/placeholder.jpg",
        playbackUrl: s.playbackUrl || "", // already included
      }));

      setStreams(mappedStreams);
    } catch (err) {
      console.error("Failed to fetch streams:", err);
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(fetchStreams, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Open stream for playback
  const openStream = (stream: Stream) => {
    if (!stream.playbackUrl) {
      alert("This stream cannot be played right now.");
      return;
    }
    setSelectedStream(stream);
  };

  // HLS.js playback
  useEffect(() => {
    if (selectedStream?.playbackUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedStream.playbackUrl);
        hls.attachMedia(videoRef.current);
       hls.on(Hls.Events.ERROR, (_, data) => {
  console.error("HLS.js error:", data);
});
        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = selectedStream.playbackUrl;
      }
    }
  }, [selectedStream]);

  return (
    <div className="container">
      <h2>Live Now</h2>
      {loading && <p>Loading streams...</p>}
      {!loading && streams.length === 0 && <p>No streams currently live</p>}

      {/* Stream cards */}
      {!selectedStream && (
        <div className="stream-grid">
          {streams.map((s, i) => (
            <div
              key={i}
              className="stream-card"
              onClick={() => openStream(s)}
            >
              <img
                src={s.thumbnailUrl}
                alt={s.title}
                className="stream-thumbnail"
              />
              <div className="stream-info">
                <h3>{s.title}</h3>
                <p className="category">{s.category}</p>
                <p>Streamer: {s.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stream player */}
      {selectedStream && (
        <div className="player-container">
          <button className="back-btn" onClick={() => setSelectedStream(null)}>
            ← Back to streams
          </button>
          <h2>{selectedStream.title}</h2>
          <video
            ref={videoRef}
            controls
            autoPlay
            width="800"
            height="450"
          />
          <p>Streamer: {selectedStream.username}</p>
          <p>Category: {selectedStream.category}</p>
        </div>
      )}
    </div>
  );
}

export default LiveStreams;