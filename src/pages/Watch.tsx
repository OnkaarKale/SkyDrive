import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import VideoCard from "@/components/VideoCard";
import "@/pages/styles/Watch.css";



const videos = [
  {
    thumbnail: "https://picsum.photos/640/360?2",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    title: "Late Night Chill Music",
    channelName: "LoFi Beats",
    category: "Music",
    watching: "9.4K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?3",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    title: "Live Football Match Commentary",
    channelName: "Sports Hub",
    category: "Sports",
    watching: "32.1K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?4",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    title: "Valorant Tournament Finals",
    channelName: "Esports Arena",
    category: "Esports",
    watching: "45.8K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?5",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    title: "Speedrun World Record Attempt",
    channelName: "GameRush",
    category: "Gaming",
    watching: "12.7K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?6",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    title: "DJ Set – EDM Live Mix",
    channelName: "Bass Nation",
    category: "Music",
    watching: "21.3K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?7",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    title: "Cricket Match Analysis",
    channelName: "CricTalks",
    category: "Sports",
    watching: "15.9K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?8",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    title: "CS2 Pro Scrims Live",
    channelName: "FragZone",
    category: "Esports",
    watching: "28.4K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?9",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "Minecraft Hardcore Survival",
    channelName: "BlockVerse",
    category: "Gaming",
    watching: "7.6K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?10",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    title: "Acoustic Covers Live",
    channelName: "Soul Strings",
    category: "Music",
    watching: "11.2K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?11",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "NBA Game Night",
    channelName: "Hoops Live",
    category: "Sports",
    watching: "19.5K",
    isLive: true,
  },
  {
    thumbnail: "https://picsum.photos/640/360?12",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    title: "League of Legends Ranked",
    channelName: "SummonerX",
    category: "Esports",
    watching: "34.6K",
    isLive: true,
  },
];



export default function Watch() {
  return (
    <div className="watch-page">
      <Navbar />

      <div className="watch-body">
        <div className="left-container">
          <VideoPlayer />

          <div className="video-details">
            <p className="title">Never Gonna Give You Up !!!</p>

            <div className="top-row">
              <div className="channel-info">
                <div className="avatar">
                  <img
                    className="avatar"
                    src={"https://randomuser.me/api/portraits/men/1.jpg"}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.remove();
                    }}
                  />
                </div>

                <div className="channel-text">
                  <p className="channel-name">NightOwlGamer</p>
                  <p className="meta">1.2M followers • Gaming</p>
                </div>
              </div>

              <div className="actions">
                <button className="icon-btn">
                  <span className="material-symbols-outlined">thumb_up</span>
                  24K
                </button>
                <button className="icon-btn">
                  <span className="material-symbols-outlined">thumb_down</span>
                </button>
                <button className="icon-btn">
                  <span className="material-symbols-outlined">share</span>
                  Share
                </button>
                <button className="icon-btn follow-btn">
                  Follow
                </button>
              </div>
            </div>

            <div className="description">
              <div className="live-info">
                <span className="watching">24.5K watching now • </span>
                <span className="live-text">Started streaming 2 hours ago</span>
              </div>

              <p>
                Welcome to my late night gaming stream! Tonight we're diving deep into
                Cyberpunk 2077's Phantom Liberty DLC. Join the community, chat, and
                enjoy the ride! 🎮
              </p>
            </div>
          </div>

          <div className="header">
            <h1>Related Streams</h1>
          </div>

          <div className="video-grid">
            {videos.map((video, i) => (
              <VideoCard
                key={i}
                thumbnail={video.thumbnail}
                avatar={video.avatar}
                title={video.title}
                channelName={video.channelName}
                category={video.category}
                watching={video.watching}
                isLive={video.isLive}
              />
            ))}
          </div>
        </div>

        <LiveChat />
      </div>


    </div>
  );
}
