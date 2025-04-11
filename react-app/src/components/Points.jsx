import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Points.css';
import Header2 from './Header2';
import GetStarted from './GetStarted';
import Footer from './Footer';

const Points = ({ userId }) => {
  const [points, setPoints] = useState(0);
  const [recentUploads, setRecentUploads] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchDashboardData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:3000/user-points/${userId}`);
        setPoints(response.data.points);
        setRecentUploads(response.data.recentProducts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [userId]);

  return (
    <div>
      <Header2 />
        <div className="dashboard-container">
          <p className='note'>** <strong>Note:</strong> Add 1 waste product, get 50 Social Points. **</p>
          <div className="points-card">
            <h2>Your Points</h2>
            <div className="points-info">
              <img src="/coins.png" alt="Points" className="points-icon" />
              <span className="points-number">{points}</span>
            </div>
          </div>

          <div className="recent-uploads-card">
            <h2>Recent Uploads</h2>
            {recentUploads.length > 0 ? (
              <div className="uploads-grid">
                {recentUploads.map((product) => (
                  <div key={product._id} className="upload-item">
                    <img
                      src={`http://localhost:3000/${product.pimage}`}
                      alt={product.pname}
                      className="points-product-image"
                    />
                    <h3>{product.pname}</h3>
                    <p>{product.pdesc}</p>
                    <span>Price: {product.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent uploads found.</p>
            )}
          </div>
        </div>
        <GetStarted />
        <Footer />
    </div>
  );
};

export default Points;