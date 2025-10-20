import {Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/auth/Register'; 
import Login from './pages/auth/Login';
import axios from 'axios';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPrivateRoute from './AdminPrivateRoute';
// frontend/collections routes
import ListCategories from './_modules/public/homepage/ListCategories';
import CategoriesProducts from './_modules/public/collections/CategoriesProducts';

import ProductDetail from './_modules/public/collections/ProductDetail';
import Cart from './_modules/public/Cart';
import Checkout from './_modules/public/Checkout';
import Categories from './_modules/public/collections/Categories';
import Thankyou from './_modules/public/Thankyou';

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.festrutif.com"
    : "http://localhost:8000";

export const API_BASE_URL = axios.defaults.baseURL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

const Main = () => {
  const company = 'Ecommerce';

  return (
    <>
    <Routes>
      <Route path="" element={<Home company={company} />} />

      <Route
        path="/login"
        element={
          localStorage.getItem('auth_token')
            ? <Navigate to="/" />
            : <Login />
        }
      />

      <Route
        path="/register"
        element={
          localStorage.getItem('auth_token')
            ? <Navigate to="/" />
            : <Register />
        }
      />

      <Route path="/admin/*" element={<AdminPrivateRoute />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Frontend/Homepage */}
      <Route path="/list-categories" element={<ListCategories />} />

      <Route path="/collections" element={<Categories />} />
      <Route path="/collections/:slug" element={<CategoriesProducts />} />
      <Route path="/collections/:slug_categ/:slug_prod" element={<ProductDetail />} />
      <Route path="/thank-you" element={<Thankyou company={company} />} />
    </Routes>
    </>
  );
}
export default Main;