import * as React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link
} from 'react-router-dom';
import Sign from "./components/Sign";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import LikedProducts from './components/LikedProducts';
import CalendarSchedule from './components/CalendarSchedule';
import ProductDetails from './components/ProductDetails';
import Guidelines from './components/Guidelines';
import MyProducts from './components/MyProducts';
import Points from './components/Points';
import ForgotPassword from './components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />),
  },
  {
    path: "/login",
    element: (<Sign />),
  },
  {
    path: "/register",
    element: (<Register />),
  },
  {
    path: "/ForgotPassword",
    element: (<ForgotPassword />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/get-products",
    element: (<Home />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/waste-exchange",
    element: (<Home />),
  },
  
  {
    path: "/purchase-recycled-products",
    element: (<Home />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetails />),
  },
  {
    path: "/guidelines",
    element: (<Guidelines />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/user-points/:userId",
    element: (<Points />),
  },
 

])



createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();