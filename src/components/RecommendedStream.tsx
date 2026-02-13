import VideoCard from "./VideoCard";



export const videos = Array.from({ length: 6 }).map((_, i) => ({
  thumbnail: `https://picsum.photos/400/225?random=${i}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  title: "Live Stream Example",
  channelName: "CodeLive",
  category: "Programming",
  watching: Math.floor(Math.random() * 20000),
  isLive: true,
}));



export default function RecommendedStream() {
  return (
    <div className="recommended">
      <h3>Recommended</h3>

      <div className="recommended-list">
        {videos.map((video, i) => (
          <VideoCard key={i} {...video} />
        ))}
      </div>
    </div>
  );
}
