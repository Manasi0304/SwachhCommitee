import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import './Home.css'; 
import Header2 from './Header2';
import GetStarted from './GetStarted';
import Footer from "./Footer";

function MyProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            setIsLoggedIn(false);
            toast.error('Please log in to view your products.');
            navigate('/login'); // Redirect to login page if not logged in
        } else {
            setIsLoggedIn(true); 
            const url = 'http://localhost:3000/my-products';
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
                    if (err.response) {
                        toast.error(`Error: ${err.response.data.message}`);
                    } else {
                        toast.error('Network error');
                    }
                });
        }
    }, [navigate]);

    // Handle search input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() === '') {
            setFilteredProducts(products); // Show all products when input is cleared
        }
    };

    // Handle search filtering
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products); // Show all products if search is empty
        } else {
            const filtered = products.filter((product) => 
                product.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.pdesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // Handle pressing "Enter" to trigger the search
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
            {isLoggedIn && (
                <>
                    <div className="header">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search for products..." 
                                value={searchQuery} 
                                onChange={handleInputChange} 
                                onKeyPress={handleKeyPress} 
                            />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </div>

                    <div className="avi">
                        <h2>My Products</h2>
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
                            <p>Oops !! You haven't added any products yet</p>
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

export default MyProducts;