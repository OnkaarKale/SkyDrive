import { useNavigate } from "react-router-dom";
import "./styles/VideoCard.css";

type VideoCardProps = {
  thumbnail?: string;
  avatar?: string;
  title: string;
  channelName: string;
  category: string;
  watching: number | string;
  isLive?: boolean;
};

export default function VideoCard({
  thumbnail,
  avatar,
  title,
  channelName,
  category,
  watching = 0,
  isLive = false,
}: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className={`video-card ${isLive ? "live" : ""}`}
      onClick={() => navigate(`/watch/${channelName}`)}
    >
      <div className="thumbnail">
        <img
          className="thumbnail-img"
          src={thumbnail}
          alt=""
          onError={(e) => {
            e.currentTarget.remove();
          }}
        />
      </div>

      <div className="video-info">
        <div className="avatar">
          <img
            className="avatar"
            src={avatar}
            alt=""
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        </div>

        <span />

        <div className="text">
          <p className="title">{title}</p>
          <p className="channel">{channelName}</p>
          <p className="meta">{category} • {watching} watching</p>
        </div>
      </div>
    </div>
  );
}
