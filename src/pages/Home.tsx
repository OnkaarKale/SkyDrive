import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import "@pages/styles/Home.css";



const videos = [
  {
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0_yD3ZkGf1I-YeEnSxMToHKWn3Y5dSihPQ&s",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    title: "Only This Video Works",
    channelName: "SkyStream",
    category: "Stream",
    watching: "18.2K",
    isLive: true,
  },
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



function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <div className="home-body">
        <Sidebar />

        <div className="videos">
          <div className="filter">
            <button className="active">All</button>
            <button className="">Gaming</button>
            <button className="">Music</button>
            <button className="">Sports</button>
            <button className="">Esports</button>
          </div>

          <div className="header">
            <span />
            <h1>Live Now</h1>            
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
      </div>
    </div>
  );
}

export default Home;
