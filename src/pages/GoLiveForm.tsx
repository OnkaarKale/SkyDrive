import { useState } from "react";
import "./styles/GoLiveForm.css";

function GoLiveForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [rtmpInfo, setRtmpInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE =
    "https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod";

  // Poll GET API until stream details exist
  const pollStreamDetails = (streamId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/get-stream?streamId=${streamId}`
        );

        let data = await res.json();

        if (typeof data.body === "string") {
          data = JSON.parse(data.body);
        }

        console.log("GET STREAM RESPONSE:", data);

        if (data && data.rtmpUrl) {
          setRtmpInfo(data);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching stream:", err);
      }
    }, 3000);
  };

  const submitForm = async () => {
    if (!title || !category) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setRtmpInfo(null);

    try {
      const res = await fetch(`${API_BASE}/create-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          visibility,
          userId: "demo-user"
        })
      });

      let data = await res.json();

      // Handle API Gateway response format
      if (typeof data.body === "string") {
        data = JSON.parse(data.body);
      }

      console.log("CREATE STREAM RESPONSE:", data);

      if (!data.streamId) {
        alert("StreamId not returned from API");
        setLoading(false);
        return;
      }

      // Start polling for RTMP details
      pollStreamDetails(data.streamId);

    } catch (err) {
      console.error(err);
      alert("Server connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="golive-container">
      <h2 className="golive-title">Go Live</h2>

      <div className="form-container">
        <label>
          Stream Title *
          <input
            placeholder="Enter stream title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Category *
          <input
            placeholder="Gaming, Music, Coding..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Visibility
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>

        <button onClick={submitForm} disabled={loading}>
          {loading ? "Creating Stream..." : "Create Stream"}
        </button>
      </div>

      {rtmpInfo && (
        <div className="rtmp-info">
          <h3>Streaming Details</h3>

          <p><strong>Stream ID:</strong> {rtmpInfo.streamId}</p>
          <p><strong>RTMP URL:</strong> {rtmpInfo.rtmpUrl}</p>
          <p><strong>Stream Key:</strong> {rtmpInfo.streamKey}</p>

          <p>
            <strong>Playback URL:</strong>{" "}
            <a href={rtmpInfo.playbackUrl} target="_blank" rel="noreferrer">
              {rtmpInfo.playbackUrl}
            </a>
          </p>

          <p>Use RTMP URL + Stream Key in OBS.</p>
        </div>
      )}
    </div>
  );
}

export default GoLiveForm;