import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'; 
import Header2 from './Header2';
import GetStarted from './GetStarted';
import Footer from "./Footer";
import { FaSearch } from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'All Categories', 'E-Waste', 'Clothing & Textile Waste', 'Plastic Waste', 'Metal Waste', 'Glass Waste', 'Agricultural Waste'
    ];

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            setIsLoggedIn(true); 
        }

        // Fetch products
        const url = 'http://localhost:3000/get-products';
        axios.get(url)
        .then((res) => {
            if (res.data.products) {
                setProducts(res.data.products);
                setFilteredProducts(res.data.products); // Initially show all products
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Server error');
        });
    }, []);

    // Function to handle "Add Product" click
    const handleAddProduct = () => {
        if (!isLoggedIn) {
            toast.error('Login First to Add Product');
            setTimeout(() => {
                navigate('/login'); // Navigate after 3 seconds
            }, 2000);
        } else {
            navigate('/add-product');
        }
    };

    // Function to handle "Favorite Products" click
    const handleFavoriteProducts = () => {
        if (!isLoggedIn) {
            toast.error('Login First to View Favorite Products');
            setTimeout(() => {
                navigate('/login'); // Navigate after 3 seconds
            }, 2000);
        } else {
            navigate('/liked-products');
        }
    };

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

     // Handle category filtering
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All Categories') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    };

    // Handle liked product
    // Handle liked product
    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');

        // Check if user is logged in
        if (!isLoggedIn) {
            toast.error('Please login to like products.');
            setTimeout(() => {
                navigate('/login');
            }, 3000); // Navigate to login after 3 seconds
            return; // Prevent liking the product if user is not logged in
        }

        // If user is logged in, proceed to like the product
        const url = 'http://localhost:3000/like-product';
        const data = { userId, productId }; 

        axios.post(url, data)
        .then((res) => {
            if (res.status === 200) {
                toast.success('Product Liked');
            }
        })
        .catch((err) => {
            toast.error('Server error');
        });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id)
    }


    return (
        <div>
            <Header2 />
            <div className="container">
            <ToastContainer />
            <div className="header">
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search for products..." 
                        value={searchQuery} // Bind searchQuery state to input field
                        onChange={handleInputChange} // Update state on input change
                        onKeyPress={handleKeyPress} // Listen for "Enter" key press
                    />
                    <button onClick={handleSearch}><FaSearch /></button> {/* Search button */}
                </div>
                <button onClick={handleAddProduct} className="add-product-link">
                    Add Product
                </button>
                <button onClick={handleFavoriteProducts} className="add-product-link">
                    Favorite Products
                </button>
            </div>

            <div className="category-bar">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="avi">
                <h2>Available Products</h2>
            </div>
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <div className="product-card" key={index}>
                            <div onClick={() => handleLike(item._id)} className="heart-con">
                                <FaHeart className="heart-icon" />
                            </div>
                            <img className="product-image" src={'http://localhost:3000/' + item.pimage} alt={item.pname}></img>
                            <div className="product-details">
                                <h3 className="product-title">{item.pname}</h3>
                                <p className="product-category">{item.category}</p>
                                <p className="product-description">{item.pdesc}</p>
                                <p className="product-price">{item.price}</p>
                                <button onClick={() => handleProduct(item._id)} className='view-details'>View Details</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Oops !! No products found</p> // Message when no products match the search query
                )}
            </div>
        </div>
            <GetStarted />
            <Footer />
        </div>
    );
}

export default Home;
