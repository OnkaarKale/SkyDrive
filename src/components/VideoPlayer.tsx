import { useNavigate } from "react-router-dom";
import video from "@assets/node_assets/nvideo.mp4";
import "./styles/VideoPlayer.css";

export default function VideoPlayer() {
  const navigate = useNavigate();

  return (
    <div className="video-player">
      <video
        controls
        autoPlay
        poster="https://picsum.photos/1280/720"
      >
        <source src={video} />
      </video>

      <span className="material-symbols-outlined back" onClick={() => navigate("/")}>arrow_back</span>
    </div>
  );
}
