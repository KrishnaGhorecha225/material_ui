// // CheckoutPage.jsx
// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Grid,
//   Paper,
//   Box,
//   TextField,
// } from "@mui/material";
// import { useCart } from "./CartContext";

// const steps = ["Shipping Address", "Payment Details", "Review Order"];

// const CheckoutPage = () => {
//   const { cart, getCartTotal } = useCart();
//   const [activeStep, setActiveStep] = useState(0);

//   // Shipping form state
//   const [shipping, setShipping] = useState({
//     name: "",
//     address: "",
//     city: "",
//     zip: "",
//   });

//   // Payment form state
//   const [payment, setPayment] = useState({
//     cardName: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });

//   const handleNext = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handlePlaceOrder = () => {
//     alert("🎉 Order placed successfully!");
//   };

//   return (
//     <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
//       <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
//         Checkout
//       </Typography>

//       {/* Stepper */}
//       <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Step Content */}
//       <Paper sx={{ p: 4, borderRadius: 2 }}>
//         {activeStep === 0 && (
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Shipping Address
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Full Name"
//                   fullWidth
//                   value={shipping.name}
//                   onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Zip / Postal code"
//                   fullWidth
//                   value={shipping.zip}
//                   onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Address"
//                   fullWidth
//                   value={shipping.address}
//                   onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="City"
//                   fullWidth
//                   value={shipping.city}
//                   onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         )}

//         {activeStep === 1 && (
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Payment Details
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Name on Card"
//                   fullWidth
//                   value={payment.cardName}
//                   onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Card Number"
//                   fullWidth
//                   value={payment.cardNumber}
//                   onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Expiry Date"
//                   fullWidth
//                   value={payment.expiry}
//                   onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   label="CVV"
//                   fullWidth
//                   value={payment.cvv}
//                   onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         )}

//         {activeStep === 2 && (
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Order Summary
//             </Typography>
//             {cart.map((item) => (
//               <Box
//                 key={item.id}
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography>{item.title} x {item.quantity}</Typography>
//                 <Typography>
//                   ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
//                 </Typography>
//               </Box>
//             ))}
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//               <Typography variant="h6">Total</Typography>
//               <Typography variant="h6" color="success.main">
//                 ${getCartTotal().toFixed(2)}
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* Stepper Controls */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//           {activeStep > 0 && (
//             <Button variant="outlined" onClick={handleBack}>
//               Back
//             </Button>
//           )}
//           {activeStep < steps.length - 1 ? (
//             <Button variant="contained" onClick={handleNext}>
//               Next
//             </Button>
//           ) : (
//             <Button variant="contained" color="success" onClick={handlePlaceOrder}>
//               Place Order
//             </Button>
//           )}
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default CheckoutPage;


// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Grid,
//   Paper,
//   Box,
//   TextField,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Divider,
//   FormHelperText,
// } from "@mui/material";
// import { useCart } from "./CartContext";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// const steps = ["Shipping Address", "Payment Details", "Review Order"];

// const CheckoutPage = () => {
//   const { cart, getCartTotal } = useCart();
//   const [activeStep, setActiveStep] = useState(0);

//   // Validation Schemas
//   const shippingSchema = Yup.object().shape({
//     name: Yup.string().required("Full Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phone: Yup.string()
//       .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
//       .required("Phone number is required"),
//     address: Yup.string().required("Address is required"),
//     city: Yup.string().required("City is required"),
//     state: Yup.string().required("State is required"),
//     zip: Yup.string()
//       .matches(/^[0-9]{5,6}$/, "Enter valid ZIP/Postal code")
//       .required("ZIP code is required"),
//   });

//   const paymentSchema = Yup.object().shape({
//     method: Yup.string().required("Select a payment method"),
//     cardName: Yup.string().when("method", {
//       is: "card",
//       then: (schema) => schema.required("Name on card is required"),
//     }),
//     cardNumber: Yup.string().when("method", {
//       is: "card",
//       then: (schema) =>
//         schema
//           .matches(/^[0-9]{16}$/, "Enter valid 16 digit card number")
//           .required("Card number is required"),
//     }),
//     expiry: Yup.string().when("method", {
//       is: "card",
//       then: (schema) => schema.required("Expiry date is required"),
//     }),
//     cvv: Yup.string().when("method", {
//       is: "card",
//       then: (schema) =>
//         schema
//           .matches(/^[0-9]{3,4}$/, "Enter valid CVV")
//           .required("CVV is required"),
//     }),
//   });

//   const initialValues = {
//     // Shipping
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",

//     // Payment
//     method: "",
//     cardName: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   };

//   const handlePlaceOrder = () => {
//     alert("🎉 Order placed successfully!");
//   };

//   return (
//     <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
//       <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
//         Checkout
//       </Typography>

//       {/* Stepper */}
//       <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Formik Form */}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={activeStep === 0 ? shippingSchema : paymentSchema}
//         onSubmit={(values) => {
//           if (activeStep < steps.length - 1) {
//             setActiveStep((prev) => prev + 1);
//           } else {
//             handlePlaceOrder(values);
//           }
//         }}
//       >
//         {({ values, errors, touched, handleChange }) => (
//           <Form>
//             <Paper sx={{ p: 4, borderRadius: 2 }}>
//               {/* Step 1: Shipping */}
//               {activeStep === 0 && (
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Full Name"
//                       name="name"
//                       value={values.name}
//                       onChange={handleChange}
//                       error={touched.name && Boolean(errors.name)}
//                       helperText={touched.name && errors.name}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Email"
//                       name="email"
//                       value={values.email}
//                       onChange={handleChange}
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Phone Number"
//                       name="phone"
//                       value={values.phone}
//                       onChange={handleChange}
//                       error={touched.phone && Boolean(errors.phone)}
//                       helperText={touched.phone && errors.phone}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="ZIP / Postal Code"
//                       name="zip"
//                       value={values.zip}
//                       onChange={handleChange}
//                       error={touched.zip && Boolean(errors.zip)}
//                       helperText={touched.zip && errors.zip}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Address"
//                       name="address"
//                       value={values.address}
//                       onChange={handleChange}
//                       error={touched.address && Boolean(errors.address)}
//                       helperText={touched.address && errors.address}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="City"
//                       name="city"
//                       value={values.city}
//                       onChange={handleChange}
//                       error={touched.city && Boolean(errors.city)}
//                       helperText={touched.city && errors.city}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="State"
//                       name="state"
//                       value={values.state}
//                       onChange={handleChange}
//                       error={touched.state && Boolean(errors.state)}
//                       helperText={touched.state && errors.state}
//                       fullWidth
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* Step 2: Payment */}
//               {activeStep === 1 && (
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Select Payment Method
//                   </Typography>
//                   <RadioGroup
//                     name="method"
//                     value={values.method}
//                     onChange={handleChange}
//                   >
//                     <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
//                     <FormControlLabel value="upi" control={<Radio />} label="UPI" />
//                     <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
//                   </RadioGroup>
//                   {touched.method && errors.method && (
//                     <FormHelperText error>{errors.method}</FormHelperText>
//                   )}

//                   {values.method === "card" && (
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                       <Grid item xs={12}>
//                         <TextField
//                           label="Name on Card"
//                           name="cardName"
//                           value={values.cardName}
//                           onChange={handleChange}
//                           error={touched.cardName && Boolean(errors.cardName)}
//                           helperText={touched.cardName && errors.cardName}
//                           fullWidth
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <TextField
//                           label="Card Number"
//                           name="cardNumber"
//                           value={values.cardNumber}
//                           onChange={handleChange}
//                           error={touched.cardNumber && Boolean(errors.cardNumber)}
//                           helperText={touched.cardNumber && errors.cardNumber}
//                           fullWidth
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="Expiry Date"
//                           name="expiry"
//                           value={values.expiry}
//                           onChange={handleChange}
//                           error={touched.expiry && Boolean(errors.expiry)}
//                           helperText={touched.expiry && errors.expiry}
//                           fullWidth
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="CVV"
//                           name="cvv"
//                           value={values.cvv}
//                           onChange={handleChange}
//                           error={touched.cvv && Boolean(errors.cvv)}
//                           helperText={touched.cvv && errors.cvv}
//                           fullWidth
//                         />
//                       </Grid>
//                     </Grid>
//                   )}
//                 </Box>
//               )}

//               {/* Step 3: Review */}
//               {activeStep === 2 && (
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     Order Summary
//                   </Typography>
//                   {cart.map((item) => (
//                     <Box
//                       key={item.id}
//                       sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//                     >
//                       <Typography>
//                         {item.title} × {item.quantity}
//                       </Typography>
//                       <Typography>
//                         ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
//                       </Typography>
//                     </Box>
//                   ))}
//                   <Divider sx={{ my: 2 }} />
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//                     <Typography variant="h6">Total</Typography>
//                     <Typography variant="h6" color="success.main">
//                       ${getCartTotal().toFixed(2)}
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}

//               {/* Stepper Controls */}
//               <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                 {activeStep > 0 && (
//                   <Button variant="outlined" onClick={() => setActiveStep((prev) => prev - 1)}>
//                     Back
//                   </Button>
//                 )}
//                 <Button type="submit" variant="contained" color="primary">
//                   {activeStep < steps.length - 1 ? "Next" : "Place Order"}
//                 </Button>
//               </Box>
//             </Paper>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };

// export default CheckoutPage;


// src/pages/CheckoutPage.jsx


// CheckoutPage.jsx
// import React, { useState } from "react";
// import {
//   Box, Button, Container, Paper, Stepper, Step, StepLabel,
//   Typography, Grid, TextField, Divider
// } from "@mui/material";
// import { styled } from "@mui/system";

// const LeftSummary = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing ? theme.spacing(2) : 16,
//   backgroundColor:
//     (theme.vars && theme.vars.palette && theme.vars.palette.grey && theme.vars.palette.grey[100]) ||
//     (theme.palette && theme.palette.grey && theme.palette.grey[100]) ||
//     "#f5f5f5",
//   height: "fit-content",
// }));

// const RightForm = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing ? theme.spacing(3) : 24,
// }));

// const steps = ["Shipping", "Payment", "Review"];

// const CheckoutPage = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => setActiveStep((prev) => prev + 1);
//   const handleBack = () => setActiveStep((prev) => prev - 1);

//   const renderForm = () => {
//     if (activeStep === 0) {
//       return (
//         <Grid container spacing={2}>
//           {["First name", "Last name"].map((label, idx) => (
//             <Grid item xs={12} sm={6} key={idx}>
//               <TextField label={label} fullWidth required />
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <TextField label="Address line 1" fullWidth required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField label="Address line 2" fullWidth />
//           </Grid>
//           {["City", "State/Region"].map((label, idx) => (
//             <Grid item xs={12} sm={6} key={idx}>
//               <TextField label={label} fullWidth required />
//             </Grid>
//           ))}
//           <Grid item xs={12} sm={6}>
//             <TextField label="Zip / Postal code" fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Country" fullWidth required />
//           </Grid>
//         </Grid>
//       );
//     } else if (activeStep === 1) {
//       return (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField label="Card Number" fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Name on Card" fullWidth required />
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <TextField label="Expiry Date" fullWidth required />
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <TextField label="CVV" fullWidth required />
//           </Grid>
//         </Grid>
//       );
//     } else {
//       return (
//         <Box>
//           <Typography variant="h6">Order Summary</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Box>
//             <Box display="flex" justifyContent="space-between" sx={{ pb: 1 }}>
//               <Typography>Jacket × 1</Typography>
//               <Typography>$59.99</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" sx={{ pb: 1 }}>
//               <Typography>Sneakers × 1</Typography>
//               <Typography>$89.99</Typography>
//             </Box>
//             <Divider sx={{ my: 2 }} />
//             <Box display="flex" justifyContent="space-between">
//               <Typography variant="subtitle1">Total</Typography>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 $149.98
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       );
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 5 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Checkout
//       </Typography>
//       <Grid container spacing={4}>
//         {/* Left: Order Summary */}
//         <Grid item xs={12} md={4}>
//           <LeftSummary elevation={0}>
//             <Typography variant="h6" gutterBottom>
//               Order Summary
//             </Typography>
//             <Divider />
//             <Box sx={{ mt: 2 }}>
//               <Typography>Jacket – $59.99</Typography>
//               <Typography>Sneakers – $89.99</Typography>
//             </Box>
//             <Divider sx={{ my: 2 }} />
//             <Box display="flex" justifyContent="space-between">
//               <Typography variant="subtitle1">Total</Typography>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 $149.98
//               </Typography>
//             </Box>
//           </LeftSummary>
//         </Grid>

//         {/* Right: Multi-Step Form */}
//         <Grid item xs={12} md={8}>
//           <RightForm>
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             <Box sx={{ mt: 3 }}>{renderForm()}</Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//               {activeStep > 0 && (
//                 <Button variant="outlined" onClick={handleBack}>
//                   Back
//                 </Button>
//               )}
//               <Button variant="contained" onClick={handleNext}>
//                 {activeStep === steps.length - 1 ? "Place Order" : "Next"}
//               </Button>
//             </Box>
//           </RightForm>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CheckoutPage;

// Checkout.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    useForPayment: false,
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address1"
                label="Address line 1"
                value={formData.address1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address2"
                label="Address line 2 (optional)"
                value={formData.address2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="state"
                label="State"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="zip"
                label="Zip / Postal code"
                value={formData.zip}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.useForPayment}
                    onChange={handleChange}
                    name="useForPayment"
                  />
                }
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <TextField fullWidth label="Card Number" margin="normal" />
            <TextField fullWidth label="Card Holder Name" margin="normal" />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Expiry Date" margin="normal" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="CVV" margin="normal" />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Order
            </Typography>
            <Typography>
              Name: {formData.firstName} {formData.lastName}
            </Typography>
            <Typography>
              Address: {formData.address1}, {formData.address2},{" "}
              {formData.city}, {formData.state}, {formData.zip},{" "}
              {formData.country}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ pt: 12, pb: 6, display: 'flex', justifyContent: 'center' }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 960 }}>
        <Typography component="h1" variant="h5" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderForm()}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success">
              Place Order
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
