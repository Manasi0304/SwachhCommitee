// Importing necessary modules
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Sending request to server for password reset
      await axios.post('http://localhost:3000/forgot-password', { email });
      toast.success('Password reset link sent to your email');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
