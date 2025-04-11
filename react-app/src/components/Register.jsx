import React, { useState } from 'react';
import { FaUnlockAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContact] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const isValidContact = /^[0-9]{10}$/.test(contactNo);
    if (!firstName || !lastName || !email || !password || !contactNo) {
      toast.error('All fields are required');
      return false;
    }
    if (!isValidContact) {
      toast.error('Contact number must be 10 digits.');
      return false;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // const url = `http://localhost:3000/register`;
    try {
      const url = `http://localhost:3000/register`;
      await axios.post(url, {
      firstName,
      lastName,
      email,
      password,
      contactNo,
    });
    toast.success('Registered Successfully');
    navigate('/login');
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message || 'Registration failed';
        toast.error(errorMessage);
      } else if (err.request) {
        toast.error('Network error. Please try again later.');
      } else {
        toast.error('Something went wrong.');
      }
    }
  };

  return (
    <section className="registerForm">
      <div className="formDiv">
        <ToastContainer />
        <form onSubmit={submit}>
          <h2>CUSTOMER REGISTER</h2>
          <div className="inpt">
            <FaUser />
            <input
              type="text"
              placeholder="Your First Name"
              aria-label="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="inpt">
            <FaUser />
            <input
              type="text"
              placeholder="Your Last Name"
              aria-label="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="inpt">
            <MdEmail />
            <input
              type="email"
              placeholder="Your Email"
              aria-label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inpt">
            <FaUnlockAlt />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inpt">
            <FaUnlockAlt />
            <input
              type="tel"
              placeholder="Contact No."
              aria-label="Contact Number"
              required
              pattern="[0-9]{10}"
              value={contactNo}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <button type="submit" className="btn2">
            REGISTER
          </button>
        </form>
        <Link to="/login" className="link">
          LOGIN
        </Link>
      </div>
    </section>
  );
};

export default Register;