import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state; // product passed from ProductsPage
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    const message = isInWishlist(product.id) 
      ? "Removed from wishlist" 
      : "Added to wishlist";
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarMessage("Added to cart!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  const isInCartProduct = isInCart(product.id);

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      {/* Top Section: Image + Info */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              objectFit: "contain",
            }}
          />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              {product.title}
            </Typography>
            <IconButton
              onClick={handleWishlistToggle}
              variant="plain"
              size="large"
              sx={{
                border: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {isInWishlist(product.id) ? (
                <Favorite sx={{ color: "#ff1744", fontSize: 28 }} />
              ) : (
                <FavoriteBorder sx={{ color: "#666", fontSize: 28 }} />
              )}
            </IconButton>
          </Box>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {product.subtitle}
          </Typography>
          <Typography
            variant="h5"
            color="success.main"
            fontWeight="bold"
            gutterBottom
          >
            {product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description || "This is a high-quality product with excellent features and durability. Perfect for everyday use and designed with modern aesthetics."}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Rating value={4} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              (120 reviews)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button 
              variant={isInCartProduct ? "outlined" : "contained"}
              color={isInCartProduct ? "success" : "primary"}
              size="large"
              sx={{ minWidth: 150 }}
              onClick={handleAddToCart}
              disabled={isInCartProduct}
            >
              {isInCartProduct ? "In Cart" : "Add to Cart"}
            </Button>
            <Button 
              variant="outlined" 
              color="success" 
              size="large"
              sx={{ minWidth: 150 }}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Customer Reviews
        </Typography>

        {/* Example comment */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              John Doe
            </Typography>
            <Rating value={5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              Excellent product! Highly recommend.
            </Typography>
          </CardContent>
        </Card>

        {/* Add Comment */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Leave a Comment
          </Typography>
          <TextField
            label="Your Comment"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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

export default ProductDetails;
