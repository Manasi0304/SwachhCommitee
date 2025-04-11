import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaUnlockAlt } from 'react-icons/fa';
import './Sign.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', { email, password });
      toast.success('Logged in Successfully');
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      localStorage.setItem('userId', res.data.userId);
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <section className="registerForm">
      <div className="formDiv">
        <ToastContainer /> {/* ToastContainer to show the messages */}
        <form onSubmit={submit}>
          <h2>CUSTOMER LOGIN</h2>
          <div className="inpt">
            <MdEmail />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inpt">
            <FaUnlockAlt />
            <input
              type="password"
              name="password"
              id="pswd"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div id="linkDiv">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" className="btn2">
            LOGIN
          </button>
        </form>
        <Link to="/register" className="link">
          REGISTER
        </Link>
      </div>
    </section>
  );
};

export default Sign;
