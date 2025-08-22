// import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardCover from "@mui/joy/CardCover";
// import IconButton from "@mui/joy/IconButton";
// import Typography from "@mui/joy/Typography";
// import Button from "@mui/joy/Button";
// import Favorite from "@mui/icons-material/Favorite";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
// import Visibility from "@mui/icons-material/Visibility";

// export default function ProductCard() {
//   return (
//     <Card
//       variant="outlined"
//       sx={{
//         width: 320,
//         borderRadius: "lg",
//         overflow: "hidden",
//         boxShadow: "md",
//         transition: "0.3s",
//         "&:hover": { boxShadow: "lg", transform: "scale(1.02)" },
//       }}
//     >
//       {/* Product Image */}
//       <Box sx={{ position: "relative" }}>
//         <AspectRatio ratio="4/3">
//           <img
//             src="https://images.unsplash.com/photo-1606813902914-03493d82a6dd?auto=format&fit=crop&w=800&q=80"
//             alt="Nike Shoes"
//             loading="lazy"
//           />
//         </AspectRatio>

//         {/* Hover Overlay with icons */}
//         <CardCover
//           sx={{
//             "&:hover": { opacity: 1 },
//             opacity: 0,
//             transition: "0.3s ease-in-out",
//             background: "rgba(0,0,0,0.4)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 2,
//           }}
//         >
//           <IconButton size="lg" variant="solid" color="danger">
//             <Favorite />
//           </IconButton>
//           <IconButton size="lg" variant="solid" color="primary">
//             <ShoppingCart />
//           </IconButton>
//           <IconButton size="lg" variant="solid" color="neutral">
//             <Visibility />
//           </IconButton>
//         </CardCover>
//       </Box>

//       {/* Product Details */}
//       <Box sx={{ p: 2 }}>
//         <Typography level="title-md" sx={{ fontWeight: "bold" }}>
//           Nike Air Zoom
//         </Typography>
//         <Typography level="body-sm" sx={{ color: "text.secondary", mb: 1 }}>
//           Running Shoes
//         </Typography>
//         <Typography
//           level="title-lg"
//           sx={{ fontWeight: "lg", color: "success.plainColor", mb: 2 }}
//         >
//           $129.99
//         </Typography>

//         {/* Action Buttons */}
//         <Box sx={{ display: "flex", gap: 1 }}>
//           <Button
//             fullWidth
//             color="primary"
//             variant="solid"
//             startDecorator={<ShoppingCart />}
//           >
//             Add to Cart
//           </Button>
//           <Button fullWidth color="success" variant="outlined">
//             Buy Now
//           </Button>
//         </Box>
//       </Box>
//     </Card>
//   );
// }

// import React from "react";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import MuiTypography from "@mui/material/Typography";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardCover from "@mui/joy/CardCover";
// import IconButton from "@mui/joy/IconButton";
// import JoyTypography from "@mui/joy/Typography";
// import Button from "@mui/joy/Button";
// import Favorite from "@mui/icons-material/Favorite";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
// import Visibility from "@mui/icons-material/Visibility";

// const products = [
//   {
//     id: 1,
//     title: "Nike Air Zoom",
//     subtitle: "Running Shoes",
//     price: "$129.99",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Adidas Ultraboost",
//     subtitle: "Performance",
//     price: "$149.99",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Puma RS-X",
//     subtitle: "Lifestyle",
//     price: "$119.99",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "New Balance 574",

//     subtitle: "Classic",
//     price: "$99.99",
//     image:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// function ProductCard({ product }) {
//   return (
//     <Card
//       variant="outlined"
//       sx={{
//         width: "100%",
//         borderRadius: "lg",
//         overflow: "hidden",
//         boxShadow: "md",
//         transition: "0.3s",
//         "&:hover": { boxShadow: "lg", transform: "scale(1.02)" },
//       }}
//     >
//       <Box sx={{ position: "relative" }}>
//         <AspectRatio ratio="4/3">
//           <img src={product.image} alt={product.title} loading="lazy" />
//         </AspectRatio>

//         <CardCover
//           sx={{
//             "&:hover": { opacity: 1 },
//             opacity: 0,
//             transition: "0.3s ease-in-out",
//             background: "rgba(0,0,0,0.4)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 2,
//           }}
//         >
//           <IconButton size="lg" variant="solid" color="danger">
//             <Favorite />
//           </IconButton>
//           <IconButton size="lg" variant="solid" color="primary">
//             <ShoppingCart />
//           </IconButton>
//           <IconButton size="lg" variant="solid" color="neutral">
//             <Visibility />
//           </IconButton>
//         </CardCover>
//       </Box>

//       <Box sx={{ p: 2 }}>
//         <JoyTypography level="title-md" sx={{ fontWeight: "bold" }}>
//           {product.title}
//         </JoyTypography>
//         <JoyTypography level="body-sm" sx={{ color: "text.secondary", mb: 1 }}>
//           {product.subtitle}
//         </JoyTypography>
//         <JoyTypography level="title-lg" sx={{ fontWeight: "lg", color: "success.plainColor", mb: 2 }}>
//           {product.price}
//         </JoyTypography>

//         <Box sx={{ display: "flex", gap: 1 }}>
//           <Button fullWidth color="primary" variant="solid" startDecorator={<ShoppingCart />}> 
//            Add to Cart
//           </Button>
//           <Button fullWidth color="success" variant="outlined">
//             Buy Now
//           </Button>
//         </Box>
//       </Box>
//     </Card>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
//       <MuiTypography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
//         Products
//       </MuiTypography>
//       <Grid container spacing={3}>
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <ProductCard product={product} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }


// import React from "react";
// import { Box, Grid } from "@mui/material";
// import Container from "@mui/material/Container";
// import {
//   Card,
//   CardContent,
//   Typography as JoyTypography,
//   Button,
//   IconButton,
// } from "@mui/joy";
// import { ShoppingCart, Favorite } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     title: "Product 1",
//     subtitle: "High quality product",
//     price: "$29.99",
//     image:
//       "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format",
//   },
//   {
//     id: 2,
//     title: "Product 2",
//     subtitle: "Trending item",
//     price: "$49.99",
//     image:
//       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format",
//   },
//   {
//     id: 3,
//     title: "Product 3",
//     subtitle: "Best seller",
//     price: "$19.99",
//     image:
//       "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format",
//   },
//   {
//     id: 4,
//     title: "Product 4",
//     subtitle: "Limited edition",
//     price: "$99.99",
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format",
//   },
// ];


// const ProductsPage = () => {
//   const navigate = useNavigate();
//   return (
//     <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
//       <Grid container spacing={3} justifyContent="center">
//         {products.map((product) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//             <Card
//               variant="outlined"
//               sx={{
//                 borderRadius: "16px",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                 overflow: "hidden",
//                 position: "relative",
//                 transition: "0.3s",
//                 "&:hover": { transform: "translateY(-5px)" },
//               }}
//             >
//               {/* Product Image with Hover Icons */}
//               <Box
//                 sx={{ position: "relative", height: 200, cursor: "pointer" }}
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => navigate(`/product/${product.id}`, { state: product })}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     navigate(`/product/${product.id}`, { state: product });
//                   }
//                 }}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />

//                 {/* Wishlist icon pinned to top-right */}
//                 <IconButton
//                   aria-label="Add to wishlist"
//                   variant="plain"
//                   color="danger"
//                   sx={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     width: 40,
//                     height: 40,
//                     borderRadius: "50%",
//                   }}
//                 >
//                   <Favorite sx={{ fontSize: 22 }} />
//                 </IconButton>
//               </Box>

//               {/* Product Details */}
//               <CardContent>
//                 <JoyTypography level="title-md" sx={{ fontWeight: "bold" }}>
//                   {product.title}
//                 </JoyTypography>
//                 <JoyTypography
//                   level="body-sm"
//                   sx={{ color: "text.secondary", mb: 1 }}
//                 >
//                   {product.subtitle}
//                 </JoyTypography>
//                 <JoyTypography
//                   level="title-lg"
//                   sx={{
//                     fontWeight: "lg",
//                     color: "success.plainColor",
//                     mb: 2,
//                   }}
//                 >
//                   {product.price}
//                 </JoyTypography>

//                 {/* Buttons */}
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                   <Button
//                     fullWidth
//                     color="primary"
//                     variant="solid"
//                     startDecorator={<ShoppingCart />}
//                   >
//                     Add to Cart
//                   </Button>
//                   <Button fullWidth color="success" variant="outlined">
//                     Buy Now
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ProductsPage;





import React from "react";
import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import {
  Card,
  CardContent,
  Typography as JoyTypography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/joy";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

const products = [
  { id: 1, title: "Product 1", subtitle: "High quality product", price: "$29.99",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format" },
  { id: 2, title: "Product 2", subtitle: "Trending item", price: "$49.99",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format" },
  { id: 3, title: "Product 3", subtitle: "Best seller", price: "$19.99",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format" },
  { id: 4, title: "Product 4", subtitle: "Limited edition", price: "$99.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format" },
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent navigation
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
      setSnackbarMessage("Please login first to add items to cart!");
      setSnackbarOpen(true);
      return;
    }
    
    addToCart(product);
    setSnackbarMessage("Added to cart!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => {
          const isInWishlistProduct = isInWishlist(product.id);
          const isInCartProduct = isInCart(product.id);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                {/* Product Image with Hover Icons */}
                <Box
                  sx={{ position: "relative", height: 200, cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: product })
                  }
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Wishlist icon */}
                  <IconButton
                    aria-label="Add to wishlist"
                    variant="plain"
                    onClick={(e) => {
                      e.stopPropagation(); // stop navigation
                      
                      // Check if user is logged in
                      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                      
                      if (!currentUser) {
                        setSnackbarMessage("Please login first to add items to wishlist!");
                        setSnackbarOpen(true);
                        return;
                      }
                      
                      toggleWishlist(product);
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                      backgroundColor: "transparent",
                      "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <Favorite
                      sx={{ 
                        fontSize: 22,
                        color: isInWishlistProduct ? "#ff1744" : "#ffffff",
                        filter: isInWishlistProduct ? "drop-shadow(0 0 4px rgba(255, 23, 68, 0.6))" : "drop-shadow(0 0 4px rgba(0, 0, 0, 0.6))"
                      }}
                    />
                  </IconButton>
                </Box>

                {/* Product Details */}
                <CardContent>
                  <JoyTypography level="title-md" sx={{ fontWeight: "bold" }}>
                    {product.title}
                  </JoyTypography>
                  <JoyTypography level="body-sm" color="text.secondary" sx={{ mb: 1 }}>
                    {product.subtitle}
                  </JoyTypography>
                  <JoyTypography
                    level="title-lg"
                    sx={{
                      fontWeight: "lg",
                      color: "success.plainColor",
                      mb: 2,
                    }}
                  >
                    {product.price}
                  </JoyTypography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Button
                      fullWidth
                      color={isInCartProduct ? "success" : "primary"}
                      variant={isInCartProduct ? "outlined" : "solid"}
                      startIcon={<ShoppingCart />}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={isInCartProduct}
                    >
                      {isInCartProduct ? "In Cart" : "Add to Cart"}
                    </Button>
                    <Button fullWidth color="success" variant="outlined">
                      Buy Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

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

export default ProductsPage;
