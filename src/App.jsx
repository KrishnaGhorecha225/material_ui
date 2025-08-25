import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </div>
  );
}

export default App;

