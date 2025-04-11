import React from "react";
import "./GetStarted.css";
import { Link, useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Make Waste Work for You</span>
          <span className="secondaryText">
            Join us in making a difference through effective waste management.
            Discover sustainable practices that reduce waste and promote recycling,
            helping to create a healthier environment for future generations.
          </span>

          <button className="button" onClick={handleClick}>
            Get Started With Recyclo-LinK
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
