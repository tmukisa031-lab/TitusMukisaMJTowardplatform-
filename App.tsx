import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MediaPage from "./pages/MediaPage";
import AdminPage from "./pages/AdminPage";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default route → redirect to /login if not logged in */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/media" /> : <Navigate to="/login" />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Media page (for logged in users only) */}
        <Route path="/media" element={isLoggedIn ? <MediaPage /> : <Navigate to="/login" />} />

        {/* Admin page (admin-only, simple check for now) */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback for invalid routes */}
        <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;