import React from "react";
import TambolaModal from "./components/TambolaModal";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ScrollToTop from './pages/ScrollToTop'
import MyOrders from "./pages/MyOrder";
import AdminOrders from "./pages/AdminOrders";
import AddProduct from "./pages/AddProduct";
import AdminContactMessages from "./pages/AdminContactPage";
import CategoryShowcase from "./components/home/CategoryShowcase";
import "../src/App.css"; // Import your CSS file


// function App() {
//   return (
//     <>
//      <TambolaModal />
//     <ScrollToTop/>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/orders" element={<MyOrders />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/category" element={<CategoryShowcase />} />
//         <Route path="/admin/orders" element={<AdminOrders />} />
//         <Route path="/admin/message" element={<AdminContactMessages />} />
        
//         <Route path="/addproduct" element={<AddProduct />} />
        
//         <Route path="/order-confirmation" element={<OrderConfirmation />} />
//         {/* Add more routes here */}
//       </Routes>
//       <Footer />
//     </>
//   );
// }
function App() {
  return (
    <div className="app-container">
      <TambolaModal />
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/category" element={<CategoryShowcase />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/message" element={<AdminContactMessages />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
