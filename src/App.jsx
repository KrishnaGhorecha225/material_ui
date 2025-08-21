import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/pricing" element={<h1>Pricing Page</h1>} />
        <Route path="/blog" element={<h1>Blog Page</h1>} />
      </Routes>
    </>
  );
}

export default App;

