import { useEffect, useState } from "react";

interface Stream {
  title: string;
  username: string;
  playbackUrl: string;
}

function LiveStreams() {
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const res = await fetch("/api/live-streams"); // backend endpoint
      const data = await res.json();
      setStreams(data);
    };
    fetchStreams();
  }, []);

  return (
    <div>
      <h2>Live Now</h2>
      {streams.length === 0 && <p>No streams currently live</p>}
      {streams.map((s, i) => (
        <div key={i}>
          <h3>{s.title}</h3>
          <p>Streamer: {s.username}</p>
          <video controls autoPlay src={s.playbackUrl}></video>
        </div>
      ))}
    </div>
  );
}

export default LiveStreams;