import React from "react";
import "./Initiatives.css";
import { Link } from 'react-router-dom';

const initiativesData = [
  {
    img: "/waste_exchange.png",
    title: "Waste Exchange",
    description: "With Recyclo-LinK, users can easily upload a photo of their old items along with a description. Buyers can browse and purchase these products, promoting the recycling of reusable waste in our community.",
    link: "/waste-exchange" // Specific link for Waste Exchange
  },
  {
    img: "/events.png",
    title: "Event Waste Coordination",
    description: "For effective waste management during events, Recyclo-LinK will coordinate with waste collection vehicles. Users will receive timely notifications to ensure a smooth pickup process, making events more sustainable.",
    link: "/event-waste-coordination" // Specific link for Event Waste Coordination
  },
  {
    img: "/purchase.png",
    title: "Purchase Recycled Products",
    description: "Recyclo-LinK offers a marketplace where buyers can browse and purchase products from uploaded waste donations, contributing to a sustainable future.",
    link: "/purchase-recycled-products" // Specific link for Purchase Recycled Products
  },
  {
    img: "/community.png",
    title: "Community Recycling Awareness",
    description: "Recyclo-LinK promotes to learn how to effectively manage waste in their daily lives. Participants can share their experiences and tips on sustainable practices.",
    link: "/community-recycling-awareness" // Specific link for Community Recycling Awareness
  },
  {
    img: "/composting.png",
    title: "Composting Made Easy",
    description: "Recyclo-LinK provides video tutorials that guide users through the composting process. Learn how to turn your kitchen scraps and yard waste into nutrient-rich compost, contributing to a greener environment.",
    link: "/guidelines" // Specific link for Composting Made Easy
  },
  {
    img: "/india.png",
    title: "Religious Offering Recycling",
    description: "Recyclo-LinK’s Collection Project allows devotees to recycle their religious offerings, promoting environmental stewardship while respecting cultural traditions.",
    link: "/religious-offering-recycling" // Specific link for Religious Offering Recycling
  },
];

const Initiatives = () => {
  return (
    <div className="addbg">
      <div id="initiatives" className="initiatives-container-wrapper">
        <div className="initiatives-container">
          <h2 className="initiatives-title">Our Key Initiatives</h2>
          <div className="initiatives-grid">
            {initiativesData.map((item, index) => (
              <div className="initiative-card" key={index}>
                <img src={item.img} alt={item.title} className="initiative-image" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="learn-more-btn">
                  <Link to={item.link}>Learn More ➔</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiatives;
