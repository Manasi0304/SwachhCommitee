import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import './Home.css'; 
import Header2 from './Header2';
import GetStarted from './GetStarted';
import Footer from "./Footer";

function LikedProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');

        // Check if user is logged in
        if (!token || !userId) {
            setIsLoggedIn(false);
            toast.error('Please log in to view your liked products.');
            navigate('/login'); // Redirect to login page if not logged in
        } else {
            setIsLoggedIn(true); 

            // Fetch products only if logged in
            const url = 'http://localhost:3000/liked-products';
            let data = { userId: userId };
            axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products); // Initially show all products
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Server error');
            });
        }
    }, [navigate]);

    // Function to handle search filtering when the search button is clicked or "Enter" is pressed
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products); // Show all products if search is empty
        } else {
            const filtered = products.filter((product) => 
                product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.pdesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered); // Update filtered products
            console.log('Filtered Products:', filtered);
        }
    };

    // Function to handle input change and show all products when input is cleared
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() === '') {
            setFilteredProducts(products); // Show all products when input is cleared
        }
    };

    // Function to handle pressing "Enter" to trigger the search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Trigger search on pressing "Enter"
        }
    };

    return (
        <div>
            <Header2 />
            <div className="container">
            <ToastContainer />
            {isLoggedIn && ( // Show content only if user is logged in
                <>
                    <div className="header">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search for products..." 
                                value={searchQuery} // Bind searchQuery state to input field
                                onChange={handleInputChange} // Update state on input change
                                onKeyPress={handleKeyPress} // Listen for "Enter" key press
                            />
                            <button onClick={handleSearch}>Search</button> {/* Search button */}
                        </div>
                    </div>

                    <div className="avi">
                        <h2>Liked Products</h2>
                    </div>
                    <div className="products-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => (
                                <div className="product-card" key={index}>
                                    <img className="product-image" src={'http://localhost:3000/' + item.pimage} alt={item.pname}></img>
                                    <div className="product-details">
                                        <h3 className="product-title">{item.pname}</h3>
                                        <p className="product-category">{item.category}</p>
                                        <p className="product-description">{item.pdesc}</p>
                                        <p className="product-price">{item.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Oops !! You don't like any products yet</p> // Message when no products match the search query
                        )}
                    </div>
                </>
            )}
        </div>
        <GetStarted />
        <Footer />
        </div>
    );
}

export default LikedProducts;
