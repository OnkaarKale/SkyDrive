import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import "./styles/StreamPlayer.css";

interface Stream {
  title: string;
  playbackUrl: string;
}

function StreamPlayer() {
  const { streamId } = useParams<{ streamId: string }>();
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod/get-stream?streamId=${streamId}`
        );
        let data: any = await res.json();

        // Handle API Gateway proxy
        if (data.body) data = JSON.parse(data.body);

        setStream({
          title: data.title || "Untitled Stream",
          playbackUrl: data.playbackUrl || "",
        });
      } catch (err) {
        console.error("Failed to fetch stream:", err);
        setStream(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStream();
  }, [streamId]);

  if (loading) return <p>Loading stream...</p>;
  if (!stream || !stream.playbackUrl) return <p>Stream not available</p>;

  return (
    <div className="player-container">
      <h2>{stream.title}</h2>
      <video
        controls
        autoPlay
        src={stream.playbackUrl}
        width="800"
        height="450"
      ></video>
    </div>
  );
}

export default StreamPlayer;