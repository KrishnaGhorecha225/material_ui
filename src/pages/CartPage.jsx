import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  Alert,
  Divider,
  TextField,
  Chip,
} from "@mui/material";
import {
  Delete,
  ShoppingCart,
  ArrowBack,
  Add,
  Remove,
  LocalShipping,
  Security,
  Refresh,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartCount 
  } = useCart();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  // const handleCheckout = () => {
  //   // TODO: Implement checkout functionality
  //   alert("Checkout functionality coming soon!");
  // };

  const handleCheckout = () => {
  navigate("/checkout");
};

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingCart sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add some products to your cart to see them here
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBack />}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Shopping Cart ({getCartCount()} items)
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Card key={item.id} sx={{ mb: 2, borderRadius: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={3} sm={2}>
                    <CardMedia
                      component="img"
                      height="80"
                      image={item.image}
                      alt={item.title}
                      sx={{ borderRadius: 1, cursor: "pointer" }}
                      onClick={() => navigate(`/product/${item.id}`, { state: item })}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={6} sm={5}>
                    <Typography variant="h6" gutterBottom sx={{ cursor: "pointer" }} onClick={() => navigate(`/product/${item.id}`, { state: item })}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                    <Typography variant="h6" color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
                      {item.price}
                    </Typography>
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={3} sm={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" sx={{ minWidth: 30, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Remove Button */}
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ border: "1px solid", borderColor: "error.main" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 100, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Subtotal ({getCartCount()} items)</Typography>
                  <Typography variant="body2">${getCartTotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2" color="success.main">Free</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    ${getCartTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mb: 2 }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>

              {/* Trust Badges */}
              <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LocalShipping sx={{ fontSize: 16, color: "success.main" }} />
                  <Typography variant="caption" color="text.secondary">
                    Free shipping on orders over $50
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Security sx={{ fontSize: 16, color: "success.main" }} />
                  <Typography variant="caption" color="text.secondary">
                    Secure checkout
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
