import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import GetStarted from './GetStarted';
import Header2 from './Header2';  
import Footer from './Footer';

function ProductDetails() {
    const [product, setProduct] = useState({});
    const [userDetails, setUserDetails] = useState(null); 
    const [error, setError] = useState(null);
    const p = useParams()
    console.log(p.productId);

    useEffect(() => {
        const url = 'http://localhost:3000/get-product/' + p.productId;
        axios.get(url)
        .then((res) => {
            console.log(res)
            if (res.data.product) {
                setProduct(res.data.product);
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Server error');
        });
    }, []);

    const handleContact = (addedBy) => {
      if (!addedBy || typeof addedBy !== "object" || !addedBy._id) {
        setError("Invalid contact details");
        setUserDetails(null);
        return;
      }

      const userId = addedBy._id; // Extract the user ID
      const url = `http://localhost:3000/get-user/${userId}`;

      axios
        .get(url)
        .then((res) => {
          if (res.data.user) {
            setUserDetails(res.data.user);
            setError(null);
          } else {
            setError("User not found");
            setUserDetails(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Server error");
          setUserDetails(null);
        });
    };

    return (
    <div>
        <Header2 />
        <h1 className='Pdheader'>Product Details</h1>
        <div className="product-details-container">
            <div> 
                {product && 
                <div className="product-details-content">
                    <div>
                        <img src={'http://localhost:3000/' + product.pimage} alt={product.pname} />    
                    </div> 
                    <div className="product-info">
                        <h2>{product.pname}</h2>
                        <p>{product.pdesc}</p>
                        <p className="price">Price: ₹ {product.price}</p>
                        { product.addedBy &&
                            <button onClick={() => handleContact(product.addedBy)}> 
                            Show Seller Details
                        </button>}

                         {/* Display user details */}
                        {userDetails && (
                            <div className="contact-details">
                                <h3>Seller Details:</h3>
                                <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                                <p><strong>Email:</strong> {userDetails.email}</p>
                            </div>
                        )}
                        {/* Display error message */}
                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>}
            </div>
        </div>
        <GetStarted />
        <Footer />
    </div>
    )
}

export default ProductDetails;