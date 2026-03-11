import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import type { ReactElement } from "react";

// Pages
import Landing from "@/pages/Landing";
import Home from "@pages/Home";
import Watch from "@pages/Watch";
import LiveStreams from "@pages/LiveStreams";
import StreamDashboard from "@pages/StreamDashboard";
import GoLiveForm from "@pages/GoLiveForm";

// Protected Route wrapper
function ProtectedRoute({ element }: { element: ReactElement }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    toast.error("Please login first");
    return <Navigate to="/" replace />;
  }

  return element;
}

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Home page - protected */}
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />

        {/* Watch page - protected */}
        <Route
          path="/watch/*"
          element={<ProtectedRoute element={<Watch />} />}
        />

        {/* Go Live form (create a stream) */}
        <Route path="/go-live" element={<GoLiveForm />} />

        {/* Live Streams listing */}
        <Route
          path="/watch-streams"
          element={<ProtectedRoute element={<LiveStreams />} />}
        />

        {/* Stream Dashboard */}
        <Route
          path="/stream/:streamId"
          element={<ProtectedRoute element={<StreamDashboard />} />}
        />
      </Routes>
    </>
  );
}