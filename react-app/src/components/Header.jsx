import React, { useState, useEffect } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import useHeaderColor from "../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);  // For profile menu toggle
  const { headerColor, contentColor } = useHeaderColor();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(prev => !prev);
  };

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
    <section id="head" className="h-wrapper" style={{ background: headerColor }}>
      <div
        className="flexCenter innerWidth paddings h-container"
        style={{ color: contentColor }}
      >
        {/* Logo */}
        <img src="./logo.png" alt="logo" width={100} />

        {/* Menu */}
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={{ color: contentColor }}>
            <ScrollLink to="mainHome" spy={true} smooth={true} offset={-70} duration={500}>
              Home
            </ScrollLink>

            <ScrollLink to="features" spy={true} smooth={true} offset={-70} duration={500}>
              Waste Marketplace
            </ScrollLink>

            <ScrollLink to="initiatives" spy={true} smooth={true} offset={-70} duration={500}>
              Learn More
            </ScrollLink>

            {!localStorage.getItem('token') ? (
              <button className="button">
                <Link to="/login">Login</Link>
              </button>
            ) : (
              <>
                {/* Profile Button */}
                <div className="profile-menu" onClick={handleProfileMenuToggle}>
                  <img src="./profileImg.png" alt="Profile" className="profile-avatar" />
                  {profileMenuOpen && (
                    <div className="dropdown-menu">
                      <span>{username}</span>
                      <Link to="/my-products">My Products</Link>
                      <Link to="/liked-products">Liked Products</Link>
                      <Link to={`/user-points/${localStorage.getItem('userId')}`}>Points</Link>
                      <Link to="/rewards">Rewards</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </OutsideClickHandler>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} style={{ color: contentColor }} />
        </div>
      </div>
    </section>
  );
};

export default Header;