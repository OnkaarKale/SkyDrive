import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import type { ReactElement } from "react";

import Landing from "@/pages/Landing";
import Home from "@pages/Home";
import Watch from "@pages/Watch";

function ProtectedRoute({ element }: { element: ReactElement }) {
  const { isAuthenticated, isLoading } = useUser();

  // Wait until auth state is determined
  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path="/watch/*"
          element={<ProtectedRoute element={<Watch />} />}
        />
      </Routes>
    </>
  );
}
