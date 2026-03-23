import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visibility] = useState("public");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://2bjtydde2g.execute-api.us-east-1.amazonaws.com/prod";

  // ✅ Get username from Cognito sessionStorage
  const getUsername = () => {
    try {
      const key = Object.keys(sessionStorage).find((k) =>
        k.startsWith("oidc.user")
      );
      if (!key) return "";

      const session = JSON.parse(sessionStorage.getItem(key) || "{}");
      const payload = JSON.parse(atob(session.id_token.split(".")[1]));

      return (
        payload["preferred_username"] ||
        payload["cognito:username"] ||
        payload.email ||
        ""
      );
    } catch (err) {
      console.error("Error getting username:", err);
      return "";
    }
  };

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  // Poll stream until RTMP is ready
  const pollStream = (streamId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/get-stream?streamId=${streamId}`);
        let data = await res.json();
        if (typeof data.body === "string") data = JSON.parse(data.body);

        if (data && data.rtmpUrl) {
          clearInterval(interval);
          navigate(`/stream/${streamId}`);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
  };

  const createStream = async () => {
    if (!title.trim() || !category.trim()) {
      alert("Title and category required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/create-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          visibility,
          userId: username || "demo-user",
        }),
      });

      let data = await res.json();
      if (typeof data.body === "string") data = JSON.parse(data.body);

      const streamId = data.streamId;
      if (!streamId) {
        alert("Stream creation failed");
        setLoading(false);
        return;
      }

      // ✅ Removed chat creation completely

      pollStream(streamId);
    } catch (err) {
      console.error("Create stream error:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>SkyStream</h1>
      <p>Welcome, {username}</p>

      <h2>Start a Stream</h2>
      <input
        placeholder="Stream title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />
      <button onClick={createStream} disabled={loading}>
        {loading ? "Creating Stream..." : "Create Stream"}
      </button>
      <br /><br />
      <button
        className="secondary-btn"
        onClick={() => navigate("/watch-streams")}
      >
        Watch Streams
      </button>
    </div>
  );
}

export default Home;