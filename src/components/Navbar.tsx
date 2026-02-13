import icon from "@assets/SkyStream-logo.png";
import "./styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={icon} alt="logo" className="logo" />
        <h1>Sky</h1>
        <h2>Stream</h2>
      </div>

      <div className="nav-center">
        <div className="search-bar">
          <input placeholder="Search" />
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>

      <div className="nav-right">
        <button>
          <span className="material-symbols-outlined">videocam</span>
          Go live
        </button>
        <span className="notifications material-symbols-outlined">notifications</span>
        <div className="avatar">
          <img
            className="avatar"
            src="https://randomuser.me/api/portraits/men/0.jpg"
            alt=""
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        </div>
      </div>
    </div>
  );
}
