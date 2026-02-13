import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLogin = () => auth.signinRedirect();

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", textAlign:"center" }}>
      <h1>Welcome to Sky Stream</h1>
      <p>Please sign in to continue.</p>
      <button onClick={handleLogin} style={{ marginTop:20, padding:"12px 24px", fontSize:16, cursor:"pointer", borderRadius:6 }}>
        Sign In
      </button>
    </div>
  );
}
