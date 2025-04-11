import React, { useEffect, useState } from 'react';
import './Reviews.css';

const reviewsData = [
  {
    username: "Shweta More",
    review: "Recyclo-LinK has transformed the way I handle waste. It's so easy to use!",
    profileImg: "/user_profile.png", // Update with actual image path
  },
  {
    username: "Sumit Yadav",
    review: "I love the community engagement! It makes recycling feel rewarding.",
    profileImg: "/user_profile.png", // Update with actual image path
  },
  {
    username: "Raj Singh",
    review: "Great platform! It's convenient and environmentally friendly.",
    profileImg: "/user_profile.png", // Update with actual image path
  },
  {
    username: "Meera Kulkarni",
    review: "Fantastic service! The website is user-friendly and very effective.",
    profileImg: "/user_profile.png", // Update with actual image path
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">User Testimonials</h2>
      <div className="review-slide">
        <img
          src={reviewsData[currentIndex].profileImg}
          alt={reviewsData[currentIndex].username}
          className="profile-image"
        />
        <div className="review-content">
          <p className="review-text">"{reviewsData[currentIndex].review}"</p>
          <p className="review-username">- {reviewsData[currentIndex].username}</p>
        </div>
      </div>
      <p className="login-prompt">Login to share your experience!</p>
    </div>
  );
};

export default Reviews;
