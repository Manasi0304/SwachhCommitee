import React, { useState, useEffect } from "react";
import "./Header2.css";
import { Link, useNavigate } from "react-router-dom";

const Header2 = () => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // To toggle the profile dropdown
  const [username, setUsername] = useState("");  // Default username

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((prev) => !prev); // Toggle profile menu
  }

    useEffect(() => {
        const userId = localStorage.getItem("userId");  // Get the userId from localStorage
        if (userId) {
        // Fetch the user's name using the API route
        fetch(`http://localhost:3000/get-user/${userId}`)
            .then(response => response.json())
            .then(data => {
            if (data.message === "success") {
                setUsername(`${data.user.firstName} ${data.user.lastName}`);
                localStorage.setItem('username', `${data.user.firstName} ${data.user.lastName}`);
            }
            })
            .catch(err => console.error("Error fetching user:", err));
        }
    }, []);

  return (
    <header className="header-wrapper">
      <div className="inner-header">
        {/* Logo */}
        <img src="/logo.png" alt="logo" className="header-logo" />

        {/* Navigation Menu */}
        <nav className="header-menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/marketplace" className="menu-item">Waste Marketplace</Link>
          <Link to="/learn-more" className="menu-item">Learn More</Link>

          {!localStorage.getItem("token") ? (
            <Link to="/login" className="header-button">Login</Link>
          ) : (
            <>
              {/* Profile Menu */}
              <div className="profile-menu" onClick={handleProfileMenuToggle}>
                <img
                  src="/profileImg.png"  // Replace with dynamic avatar path
                  alt="Profile"
                  className="profile-avatar"
                />

                {profileMenuOpen && (
                  <div className="dropdown-menu">
                    <span>{username}</span>
                    <Link to="/my-products" className="dropdown-item">My Products</Link>
                    <Link to="/liked-products" className="dropdown-item">Liked Products</Link>
                    <Link to={`/user-points/${localStorage.getItem('userId')}`}>Points</Link>
                    <Link to="/rewards" className="dropdown-item">Rewards</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header2;