import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { FaBook } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setLoading(true);
    try {
      await doSignOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 w-full z-20 fixed top-0 left-0 h-16 border-b bg-gray-200">
      <div className="flex items-center space-x-2">
        <FaBook className="text-2xl text-blue-600" aria-hidden="true" />
        <Link to="/home" className="text-xl font-bold text-blue-600">
          FlipBook App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {userLoggedIn && (
          <>
            {currentUser && (
              <span className="text-sm text-gray-700">
                Welcome, {currentUser.displayName || currentUser.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 underline"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
            {error && (
              <span className="text-sm text-red-500 ml-2">{error}</span>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
