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
  Snackbar,
} from "@mui/material";
import { Favorite, Delete, ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarMessage("Added to cart!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (wishlist.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Favorite sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your Wishlist is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start adding products to your wishlist to see them here
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/products")}
          >
            Browse Products
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
          My Wishlist ({wishlist.length} items)
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={handleClearWishlist}
        >
          Clear All
        </Button>
      </Box>

      {/* Wishlist Items */}
      <Grid container spacing={3}>
        {wishlist.map((product) => {
          const isInCartProduct = isInCart(product.id);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product)}
                />
                
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" gutterBottom sx={{ cursor: "pointer" }} onClick={() => handleProductClick(product)}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.subtitle}
                  </Typography>
                  <Typography variant="h6" color="success.main" fontWeight="bold" sx={{ mb: 2 }}>
                    {product.price}
                  </Typography>
                  
                  <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                    <Button
                      fullWidth
                      color={isInCartProduct ? "success" : "primary"}
                      variant={isInCartProduct ? "outlined" : "contained"}
                      startIcon={<ShoppingCart />}
                      size="small"
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCartProduct}
                    >
                      {isInCartProduct ? "In Cart" : "Add to Cart"}
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      sx={{ border: "1px solid", borderColor: "error.main" }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Success Alert */}
      {/* <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          Products in your wishlist are saved locally and will persist between sessions.
        </Typography>
      </Alert> */}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WishlistPage;
