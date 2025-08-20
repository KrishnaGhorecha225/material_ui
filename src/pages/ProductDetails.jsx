// import React from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Rating,
//   TextField,
//   Button,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { useLocation, useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const product = location.state; // product passed from ProductsPage

//   return (
//     <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
//       <Grid container spacing={4}>
//         {/* Product Image */}
//         <Grid item xs={12} md={6}>
//           <img
//             src={product.image}
//             alt={product.title}
//             style={{
//               width: "100%",
//               borderRadius: "12px",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             }}
//           />
//         </Grid>

//         {/* Product Info */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {product.title}
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//             {product.subtitle}
//           </Typography>
//           <Typography
//             variant="h5"
//             color="success.main"
//             fontWeight="bold"
//             gutterBottom
//           >
//             {product.price}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             {product.description}
//           </Typography>

//           {/* Rating */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <Rating value={4} readOnly />
//             <Typography variant="body2" sx={{ ml: 1 }}>
//               (120 reviews)
//             </Typography>
//           </Box>

//           <Button variant="contained" color="primary" sx={{ mr: 2 }}>
//             Add to Cart
//           </Button>
//           <Button variant="outlined" color="success">
//             Buy Now
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Comments Section */}
//       <Box sx={{ mt: 6 }}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Customer Reviews
//         </Typography>

//         {/* Example comment */}
//         <Card sx={{ mb: 2 }}>
//           <CardContent>
//             <Typography variant="subtitle1" fontWeight="bold">
//               John Doe
//             </Typography>
//             <Rating value={5} readOnly size="small" />
//             <Typography variant="body2" color="text.secondary">
//               Excellent product! Highly recommend.
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* Add Comment */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Leave a Comment
//           </Typography>
//           <TextField
//             label="Your Comment"
//             fullWidth
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary">
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ProductDetails;


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
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state; // product passed from ProductsPage

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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.title}
          </Typography>
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
            {product.description}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={4} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              (120 reviews)
            </Typography>
          </Box>

          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Add to Cart
          </Button>
          <Button variant="outlined" color="success">
            Buy Now
          </Button>
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
    </Container>
  );
};

export default ProductDetails;
