import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import ProductsPage from "./pages/ProductsPage";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/pricing" element={<h1>Pricing Page</h1>} />
        <Route path="/blog" element={<h1>Blog Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

