import "./styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="item active">
        <span className="material-symbols-outlined">home</span>
        <h1>Home</h1>
      </div>
      <div className="item">
        <span className="material-symbols-outlined">sensors</span>
        <h1>Live</h1>
      </div>
      
      <span className="seperator" />

      <h2>Library</h2>

      <div className="item">
        <span className="material-symbols-outlined">bookmark_star</span>
        <h1>Saved</h1>
      </div>
      <div className="item">
        <span className="material-symbols-outlined">thumb_up</span>
        <h1>Liked</h1>
      </div>
      <div className="item">
        <span className="material-symbols-outlined">history</span>
        <h1>History</h1>
      </div>

      <span className="seperator" />
      
      <h2>Following</h2>

      <div className="following item live">
        <div className="avatar">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt=""
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        </div>
        <span />
        <div>
          <h1>User abc</h1>
          <h2>Live now</h2>
        </div>
      </div>

      <div className="following item">
        <div className="avatar">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/men/2.jpg"
            alt=""
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        </div>
        <span />
        <div>
          <h1>User qwe</h1>
          <h2>Live now</h2>
        </div>
      </div>

      <div className="following item live">
        <div className="avatar">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt=""
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        </div>
        <span />
        <div>
          <h1>User xyz</h1>
          <h2>Live now</h2>
        </div>
      </div>

    </div>
  );
}
