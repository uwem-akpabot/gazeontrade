import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import AddSample from '../../_modules/admin/samples/AddSample';
import Sample from '../../_modules/admin/samples/Sample';
import EditSample from '../../_modules/admin/samples/EditSample';
// Dashboard
import Dashboard from '../../_modules/admin/dashboard/Dashboard';
// Category
import Category from '../../_modules/admin/categories/Category';
import AddCategory from '../../_modules/admin/categories/AddCategory';
import EditCategory from '../../_modules/admin/categories/EditCategory';
import CategoryDetail from '../../_modules/admin/categories/CategoryDetail';

// Subcategory
import Subcategory from '../../_modules/admin/subcategories/Subcategory';
import AddSubcategory from '../../_modules/admin/subcategories/AddSubcategory';
import EditSubcategory from '../../_modules/admin/subcategories/EditSubcategory';
import SubcategoryDetail from '../../_modules/admin/subcategories/SubcategoryDetail';

// Product
import Product from '../../_modules/admin/products/Product';
import AddProduct from '../../_modules/admin/products/AddProduct';
import EditProduct from '../../_modules/admin/products/EditProduct';
import ProductDetail from '../../_modules/admin/products/ProductDetail';

import NewsletterForm from '../../_modules/admin/newsletters/NewsletterForm';
import EditBanner from '../../_modules/admin/banners/EditBanner';
import Banner from '../../_modules/admin/banners/Banner';
import OrderDetail from '../../_modules/admin/orders/OrderDetail';
import Orders from '../../_modules/admin/orders/Orders';

// import Orders from './pages/orders/Orders';

function Master() {
  const company = 'Ecommerce';

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // ensure sequential loading
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    (async () => {
      // --- Load WebFont first ---
      await loadScript("/_admin/assets/js/plugin/webfont/webfont.min.js");

      // --- Then initialize fonts ---
      if (window.WebFont) {
        window.WebFont.load({
          google: { families: ["Public Sans:300,400,500,600,700"] },
          custom: {
            families: [
              "Font Awesome 5 Solid",
              "Font Awesome 5 Regular",
              "Font Awesome 5 Brands",
              "simple-line-icons",
            ],
            urls: ["/_admin/assets/css/fonts.min.css"],
          },
          active: function () {
            sessionStorage.fonts = true;
          },
        });
      }

      await loadScript("/_admin/assets/js/core/jquery-3.7.1.min.js");
      await loadScript("/_admin/assets/js/core/popper.min.js");
      await loadScript("/_admin/assets/js/core/bootstrap.min.js");
      await loadScript("/_admin/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js");
      await loadScript("/_admin/assets/js/plugin/chart.js/chart.min.js");
      await loadScript("/_admin/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js");
      await loadScript("/_admin/assets/js/plugin/chart-circle/circles.min.js");
      await loadScript("/_admin/assets/js/plugin/datatables/datatables.min.js");
      await loadScript("/_admin/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js");
      await loadScript("/_admin/assets/js/plugin/jsvectormap/jsvectormap.min.js");
      await loadScript("/_admin/assets/js/plugin/jsvectormap/world.js");
      await loadScript("/_admin/assets/js/plugin/sweetalert/sweetalert.min.js");
      await loadScript("/_admin/assets/js/kaiadmin.min.js");
    })();
  }, []);

  return (
    <>
    <Helmet>
      <link rel="stylesheet" href="/_admin/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/_admin/assets/css/plugins.min.css" />
      <link rel="stylesheet" href="/_admin/assets/css/kaiadmin.min.css" />
    </Helmet>

    <Routes>
      <Route path="/dashboard" element={<Dashboard page="Dashboard" company={company} />} />
      
      
      {/* CATEGORY */}
      <Route path="/add-category" element={
        <AddCategory page="Add Category" btnManage="Manage Category" company={company} />
      } />
      <Route path="/category" element={
        <Category page="Category List" btnAdd="Add Category" company={company} />
      } />
      <Route path="/edit-category/:slug" element={
        <EditCategory page="Edit Category" btnBack="Back" company={company} />
      } />
      <Route path="/category-detail/:slug" element={
        <CategoryDetail page="Category Detail" btnBack="Back" company={company} />}
      />

      
      {/* SUBCATEGORY */}
      <Route path="/add-subcategory" element={
        <AddSubcategory page="Add Subcategory" btnManage="Manage Subcategory" company={company} />
      } />
      <Route path="/subcategory" element={
        <Subcategory page="Subcategory List" btnAdd="Add Subcategory" company={company} />
      } />
      <Route path="/edit-subcategory/:slug" element={
        <EditSubcategory page="Edit Subcategory" btnBack="Back" company={company} />
      } />
      <Route path="/subcategory-detail/:slug" element={
        <SubcategoryDetail page="Subcategory Detail" btnBack="Back" company={company} />}
      />

      {/* PRODUCT */}
      <Route path="/add-product" element={
        <AddProduct page="Add Product" btnManage="Manage Product" company={company} />
      } />
      <Route path="/product" element={
        <Product page="Product List" btnAdd="Add Product" company={company} />
      } />
      <Route path="/edit-product/:slug" element={
        <EditProduct page="Edit Product" btnBack="Back" company={company} />
      } />
      <Route path="/product-detail/:slug" element={
        <ProductDetail page="Product Detail" btnBack="Back" company={company} />}
      />

      {/* SAMPLE */}
      <Route path="/add-sample" element={
        <AddSample page="Add Sample" btnManage="Sample List" company={company} />
      } />

      <Route path="/sample" element={
        <Sample page="Sample List" btnAdd="Add Sample" company={company} />
      } />

      <Route path="/edit-sample/:slug" element={
        <EditSample page="Edit Sample" btnBack="Back" company={company} />
      } />

      {/* ORDERS */}
      <Route path="/orders" element={
        <Orders page="Orders" btnBack="Back" company={company} />
      } />

      <Route path="/orderdetail/:id" 
        element={<OrderDetail btnBack="Back" company={company} />
      } />
      
      {/* BANNER */}
      <Route path="/banner" element={
        <Banner page="Banner" btnBack="Back" company={company} />
      } />

      <Route path="/edit-banner/:id" element={
        <EditBanner page="Edit Banner" btnBack="Back" company={company} />
      } />

      {/* NEWSLETTER */}
      <Route path="/newsletter" element={
        <NewsletterForm page="Send Newsletter" btnBack="Back" company={company} />
      } />
 
    </Routes>
    </>
  );
}

export default Master;