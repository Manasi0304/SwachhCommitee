import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const [pname, setpname] = useState('');
  const [pdesc, setpdesc] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [pimage, setimage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCongrats, setShowCongrats] = useState(false); // State to show/hide coin animation

  const handleApi = () => {
    if (!pname || !pdesc || !price || !category || !pimage) {
      setErrorMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('pname', pname);
    formData.append('pdesc', pdesc);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('pimage', pimage);
    formData.append('userId', localStorage.getItem('userId'));

    const url = 'http://localhost:3000/add-product';
    axios.post(url, formData)
      .then((res) => {
        console.log(res);
        toast.success('Product added successfully!');
        setShowCongrats(true); // Show coin animation
        clearForm();
        // setTimeout(() => {
        //   setShowCongrats(false); // Hide animation after 3 seconds
        //   navigate('/get-products');
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to add product. Please try again.');
      });
  };

  const clearForm = () => {
    setpname('');
    setpdesc('');
    setprice('');
    setcategory('');
    setimage('');
    setErrorMessage('');
  };

  return (
    <div className="main-div">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <div className="tag-line">
        <h1>Upload Your Waste Here</h1>
        <h3> "From Waste to Want: Share What You No Longer Need!!"</h3>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <label>Product Name:</label>
      <input type="text" placeholder="Enter product name ..." value={pname} onChange={(e) => { setpname(e.target.value); }} />

      <label>Product Description:</label>
      <textarea placeholder="Enter product description ..." value={pdesc} onChange={(e) => { setpdesc(e.target.value); }}></textarea>

      <label>Product Price:</label>
      <input type="text" placeholder="Enter product price ..." value={price} onChange={(e) => { setprice(e.target.value); }} />

      <label>Product Category:</label>
      <select value={category} onChange={(e) => { setcategory(e.target.value); }}>
        <option>Select Category Here ...</option>
        <option>E-Waste</option>
        <option>Clothing & Textile Waste</option>
        <option>Plastic Waste</option>
        <option>Glass Waste</option>
        <option>Metal Waste</option>
        <option>Agricultural Waste</option>
      </select>

      <label>Product Snap:</label>
      <input type="file" onChange={(e) => { setimage(e.target.files[0]); }} />

      <button type="submit" onClick={handleApi}>Submit</button>

      {showCongrats && (
        <div className="coin-animation">
          <div className="close-btn" onClick={() => navigate('/get-products')}>
            ✖
          </div>
          <img src="/coins.png" alt="Coin" className="rotating-coin" />
          <p className="congrats-message">🎉 Congratulations! You earned 50 social points! 🎉</p>
        </div>
      )}
    </div>
  );
}

export default AddProduct;