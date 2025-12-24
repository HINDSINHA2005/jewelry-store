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
import SavedAddresses from "./pages/SavedAddresses";
import Sale from "./pages/Sale"; // Import Sale page
import FinanceDashboard from "./pages/FinanceDashboard"; // Import FinanceDashboard
import AddFinanceEntry from "./pages/AddFinanceEntry";
import Terms from "./pages/policies/Terms";
import Privacy from "./pages/policies/Privacy";
import Refund from "./pages/policies/Refund";
import Replacement from "./pages/policies/Replacement";
import Cancellation from "./pages/policies/Cancellation";
import Shipping from "./pages/policies/Shipping"; // Import AddFinanceEntry
import CustomerReviews from "./pages/CustomerReviews"; // Import CustomerReviews
import AddReview from "./pages/AddReview"; // Import AddReview
import ProductInventory from "./pages/ProductInventory";
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
          <Route path="/saved-address" element={<SavedAddresses />} />
          
          <Route path="/admin/finance" element={<FinanceDashboard />} />
          <Route path="/admin/finance/add" element={<AddFinanceEntry />} />
          <Route path="/policies/terms" element={<Terms />} />
        <Route path="/policies/privacy" element={<Privacy />} />
        <Route path="/policies/refund" element={<Refund />} />
        <Route path="/policies/replacement" element={<Replacement />} />
        <Route path="/policies/cancellation" element={<Cancellation />} />
        <Route path="/policies/shipping" element={<Shipping />} />
          {/* Add more routes here */}
          <Route path="/reviews" element={<CustomerReviews />} />
<Route path="/add-review" element={<AddReview />} />
<Route path="/admin/inventory" element={<ProductInventory />} />


        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
