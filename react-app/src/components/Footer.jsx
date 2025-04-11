import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="/logo.png" alt="logo" width={120} />
          <span className="sec">
          Our vision is to lead a recycling revolution, turning waste into resources  <br />
          and creating a sustainable future for everyone.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Recyclo-LinK</span>
          <span className="sec">Pune , Maharashtra</span>
          <div className="flexCenter f-menu">
            <span>Recycling</span>
            <span>Sustainable Products</span>
            <span>Waste Collection</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
