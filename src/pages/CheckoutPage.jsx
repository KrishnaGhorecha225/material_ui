import React, { useMemo, useState } from "react";
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
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useCart } from "./CartContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const steps = [
  { label: "Shipping address", icon: <LocalShippingIcon /> },
  { label: "Payment method", icon: <CreditCardIcon /> },
  { label: "Review & confirm", icon: <ReceiptLongIcon /> },
];

// ---- Styled containers ----
const GlassPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(3),
  backdropFilter: "blur(8px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30,30,30,0.6)"
      : "rgba(255,255,255,0.75)",
  border: `1px solid ${theme.palette.divider}`,
}));

const StickyCard = styled(Card)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(10),
  borderRadius: 16,
  overflow: "hidden",
}));

function currency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function CheckoutPro() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();

  // Derive numeric price from cart items ('$' string -> number)
  const items = useMemo(
    () =>
      cart.map((it) => ({
        id: it.id,
        title: it.title,
        price: Number(parseFloat(String(it.price || "").replace("$", "")) || 0),
        qty: it.quantity || 1,
      })),
    [cart]
  );

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
  const shippingFee = useMemo(() => (subtotal > 999 ? 0 : 99), [subtotal]);
  const discount = useMemo(() => (appliedPromo?.type === "PCT" ? Math.round((appliedPromo.value / 100) * subtotal) : 0), [appliedPromo, subtotal]);
  const total = useMemo(() => Math.max(subtotal - discount + shippingFee, 0), [subtotal, discount, shippingFee]);

  // Form state
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    saveAsDefault: true,
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card"); // card | upi | cod
  const [payment, setPayment] = useState({
    nameOnCard: "",
    cardNumber: "",
    exp: "",
    cvv: "",
    upiId: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  // Validation helpers
  const required = (v) => String(v || "").trim().length > 0;
  const isValidPhone = (v) => /^\+?\d{10,15}$/.test((v || "").replace(/\s/g, ""));
  const isValidPincode = (v) => /^\d{6}$/.test(v || "");
  const isValidExp = (v) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(v || "");
  const isValidCard = (v) => /^(\d{4} \d{4} \d{4} \d{1,4}|\d{16})$/.test((v || "").replace(/\s/g, ""));
  const isValidCVV = (v) => /^\d{3,4}$/.test(v || "");
  const isValidUPI = (v) => /^[\w.\-]{2,}@[\w]{2,}$/.test(v || "");

  const shippingValid =
    required(shipping.firstName) &&
    required(shipping.lastName) &&
    isValidPhone(shipping.phone) &&
    required(shipping.address1) &&
    required(shipping.city) &&
    required(shipping.state) &&
    isValidPincode(shipping.zip) &&
    required(shipping.country);

  const paymentValid = useMemo(() => {
    if (paymentMethod === "card") {
      return (
        required(payment.nameOnCard) &&
        isValidCard(payment.cardNumber) &&
        isValidExp(payment.exp) &&
        isValidCVV(payment.cvv)
      );
    }
    if (paymentMethod === "upi") return isValidUPI(payment.upiId);
    if (paymentMethod === "cod") return true;
    return false;
  }, [payment, paymentMethod]);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    if (code === "SAVE10") {
      setAppliedPromo({ code, type: "PCT", value: 10 });
    } else if (code === "FREESHIP") {
      setAppliedPromo({ code, type: "SHIP", value: 0 });
    } else {
      setAppliedPromo({ code, type: "INVALID" });
    }
  };

  const maskedCard = useMemo(() => {
    const raw = (payment.cardNumber || "").replace(/\s/g, "");
    if (raw.length < 4) return "•••• •••• •••• ••••";
    return `•••• •••• •••• ${raw.slice(-4)}`;
  }, [payment.cardNumber]);

  // Navigation
  const nextDisabled = useMemo(() => {
    if (activeStep === 0) return !shippingValid;
    if (activeStep === 1) return !paymentValid;
    if (activeStep === 2) return !acceptTerms;
    return false;
  }, [activeStep, shippingValid, paymentValid, acceptTerms]);

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    const id = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(id);
    setConfirmOpen(true);
    // Optionally clear cart on order placement
    // clearCart();
  };

  // Layout header gradient
  const headerGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return (
    <Box sx={{ minHeight: "100vh", background: `radial-gradient(1200px 600px at 10% -10%, ${theme.palette.primary.light}11, transparent), radial-gradient(900px 500px at 100% 10%, ${theme.palette.secondary.light}14, transparent)` }}>
      {/* Top hero header */}
      <Box
        sx={{
          background: headerGradient,
          color: "white",
          py: { xs: 4, md: 6 },
          mb: { xs: 4, md: 6 },   // 👈 mb (margin bottom) vadhaaro
          mt: { xs: 4, md: 14 },   // 👈 header thodu niche lai jase
          boxShadow: 4,
        }}
      >

        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ShoppingBagIcon sx={{ fontSize: 36 }} />
          <Box>
            <Typography variant="h5" fontWeight={700}>Complete your purchase</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Secure checkout • Encrypted with TLS <LockIcon sx={{ fontSize: 16, verticalAlign: "middle", ml: 0.5 }} />
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6  }}>
        {/* Stepper */}
        <GlassPaper sx={{ mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((s, idx) => (
              <Step key={s.label}>
                <StepLabel icon={s.icon}>{s.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <LinearProgress variant="determinate" value={((activeStep + 1) / steps.length) * 100} sx={{ mt: 2, borderRadius: 99 }} />
        </GlassPaper>

        {/* Main two-column layout */}
        <Grid container spacing={3}>
          {/* Left: forms */}
          <Grid item xs={12} md={7}>
            <GlassPaper>
              {activeStep === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>Shipping address</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="First name" fullWidth required value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Last name" fullWidth required value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Phone" fullWidth required placeholder="+91 9876543210" error={shipping.phone !== "" && !isValidPhone(shipping.phone)} helperText={shipping.phone !== "" && !isValidPhone(shipping.phone) ? "Enter a valid phone number" : ""} value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Country" fullWidth required value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Address line 1" fullWidth required value={shipping.address1} onChange={(e) => setShipping({ ...shipping, address1: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Address line 2 (optional)" fullWidth value={shipping.address2} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="City" fullWidth required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="State" fullWidth required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="Pincode" fullWidth required error={shipping.zip !== "" && !isValidPincode(shipping.zip)} helperText={shipping.zip !== "" && !isValidPincode(shipping.zip) ? "Enter 6-digit PIN" : ""} value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel control={<Checkbox checked={shipping.saveAsDefault} onChange={(e) => setShipping({ ...shipping, saveAsDefault: e.target.checked })} />} label="Save as default shipping address" />
                    </Grid>
                  </Grid>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>Payment method</Typography>
                  <FormControl sx={{ mt: 1 }}>
                    <FormLabel>Select a method</FormLabel>
                    <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                      <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                      <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === "card" && (
                    <Box sx={{ mt: 2 }}>
                      <GlassPaper variant="outlined" sx={{ p: 2, mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Card details are securely encrypted <LockIcon sx={{ fontSize: 16, ml: 0.5 }} />
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField label="Name on card" fullWidth required value={payment.nameOnCard} onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField label="Card number" fullWidth required placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>, }} error={payment.cardNumber !== "" && !isValidCard(payment.cardNumber)} helperText={payment.cardNumber !== "" && !isValidCard(payment.cardNumber) ? "Enter a valid 16-digit card" : ""} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField label="Expiry (MM/YY)" fullWidth required placeholder="08/27" value={payment.exp} onChange={(e) => setPayment({ ...payment, exp: e.target.value })} error={payment.exp !== "" && !isValidExp(payment.exp)} helperText={payment.exp !== "" && !isValidExp(payment.exp) ? "Format MM/YY" : ""} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField label="CVV" fullWidth required type="password" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} error={payment.cvv !== "" && !isValidCVV(payment.cvv)} helperText={payment.cvv !== "" && !isValidCVV(payment.cvv) ? "3 or 4 digits" : ""} />
                          </Grid>
                        </Grid>
                      </GlassPaper>
                    </Box>
                  )}

                  {paymentMethod === "upi" && (
                    <Box sx={{ mt: 2 }}>
                      <TextField label="UPI ID" placeholder="yourname@bank" fullWidth required value={payment.upiId} onChange={(e) => setPayment({ ...payment, upiId: e.target.value })} error={payment.upiId !== "" && !isValidUPI(payment.upiId)} helperText={payment.upiId !== "" && !isValidUPI(payment.upiId) ? "Enter valid UPI e.g. name@okicici" : ""} />
                      <Alert sx={{ mt: 2 }} severity="info">You will get a collect request to authorize payment.</Alert>
                    </Box>
                  )}

                  {paymentMethod === "cod" && (
                    <Alert sx={{ mt: 2 }} severity="success">Pay in cash when your order arrives.</Alert>
                  )}
                </>
              )}

              {activeStep === 2 && (
                <>
                  <Typography variant="h6" gutterBottom>Review your order</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Typography variant="subtitle2" color="text.secondary">Shipping to</Typography>
                          <Typography fontWeight={700} sx={{ mt: 0.5 }}>{shipping.firstName} {shipping.lastName}</Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {shipping.address1}{shipping.address2 ? `, ${shipping.address2}` : ""}, {shipping.city}, {shipping.state} - {shipping.zip}, {shipping.country}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>Phone: {shipping.phone}</Typography>
                          <Divider sx={{ my: 2 }} />
                          <Typography variant="subtitle2" color="text.secondary">Payment</Typography>
                          {paymentMethod === "card" && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>{maskedCard} · {payment.nameOnCard}</Typography>
                          )}
                          {paymentMethod === "upi" && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>UPI: {payment.upiId}</Typography>
                          )}
                          {paymentMethod === "cod" && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>Cash on Delivery</Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Typography variant="subtitle2" color="text.secondary">Order items</Typography>
                          {items.map((it) => (
                            <Box key={it.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 1.2 }}>
                              <Box>
                                <Typography fontWeight={600}>{it.title}</Typography>
                                <Typography variant="caption" color="text.secondary">Qty: {it.qty}</Typography>
                              </Box>
                              <Typography>{currency(it.price * it.qty)}</Typography>
                            </Box>
                          ))}
                          <Divider sx={{ my: 1.5 }} />
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">Subtotal</Typography>
                            <Typography>{currency(subtotal)}</Typography>
                          </Box>
                          {discount > 0 && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                              <Typography color="success.main">Discount ({appliedPromo?.code})</Typography>
                              <Typography color="success.main">- {currency(discount)}</Typography>
                            </Box>
                          )}
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                            <Typography color="text.secondary">Shipping</Typography>
                            <Typography>{shippingFee === 0 ? "Free" : currency(shippingFee)}</Typography>
                          </Box>
                          <Divider sx={{ my: 1.5 }} />
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography fontWeight={800}>Total</Typography>
                            <Typography fontWeight={800}>{currency(total)}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />} label={
                        <Typography variant="body2">I agree to the <u>Terms & Conditions</u> and <u>Return Policy</u>.</Typography>
                      } />
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Nav buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: { xs: "center", sm: "flex-end" }, mt: 3 }}>
                {activeStep > 0 && (
                  <Button variant="outlined" onClick={handleBack}>Back</Button>
                )}
                {activeStep < steps.length - 1 ? (
                  <Tooltip title={nextDisabled ? "Please complete required fields" : "Continue"}>
                    <span>
                      <Button variant="contained" size="large" onClick={handleNext} disabled={nextDisabled}>Next</Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title={nextDisabled ? "Accept terms to place order" : "Place your order"}>
                    <span>
                      <Button color="success" variant="contained" size="large" onClick={placeOrder} disabled={nextDisabled} startIcon={<CheckCircleIcon />}>Place order</Button>
                    </span>
                  </Tooltip>
                )}
              </Box>
            </GlassPaper>
          </Grid>

          {/* Right: Order summary / promo */}
          {/* Right: Order summary / promo */}
<Grid item xs={12} md={5}>
  <StickyCard variant="outlined">
    <Box sx={{ p: 2.5 }}>
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ReceiptLongIcon /> Order Summary
      </Typography>
    </Box>
    <Divider />
    <CardContent>
      {items.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ my: 3 }}>
          Your cart is empty
        </Typography>
      ) : (
        items.map((it) => (
          <Box
            key={it.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 1.5,
              gap: 1,
            }}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography noWrap fontWeight={600}>{it.title}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <TextField
                  type="number"
                  size="small"
                  value={it.qty}
                  onChange={(e) => updateQuantity(it.id, Math.max(1, Number(e.target.value)))}
                  inputProps={{ min: 1, style: { width: 60, textAlign: "center" } }}
                />
                <Typography variant="caption" color="text.secondary">
                  x {currency(it.price)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>{currency(it.price * it.qty)}</Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeFromCart(it.id)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))
      )}

      {/* Promo code */}
      {items.length > 0 && (
        <>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" onClick={handleApplyPromo}>Apply</Button>
          </Box>
          {appliedPromo?.type === "INVALID" && (
            <Alert severity="warning" sx={{ mt: 1 }}>Invalid code</Alert>
          )}
          {appliedPromo?.type === "PCT" && (
            <Chip size="small" color="success" label={`Applied ${appliedPromo.value}% off`} sx={{ mt: 1 }} />
          )}
        </>
      )}

      {/* Totals */}
      {items.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.secondary">Subtotal ({getCartCount()} items)</Typography>
            <Typography>{currency(subtotal)}</Typography>
          </Box>
          {discount > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
              <Typography color="success.main">Discount</Typography>
              <Typography color="success.main">- {currency(discount)}</Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
            <Typography color="text.secondary">Shipping</Typography>
            <Typography>{shippingFee === 0 ? "Free" : currency(shippingFee)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontWeight={800}>Total</Typography>
            <Typography fontWeight={800}>{currency(total)}</Typography>
          </Box>
        </>
      )}
    </CardContent>
  </StickyCard>
</Grid>

        </Grid>
      </Container>

      {/* Confirmation dialog centered */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center" }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
          <Box sx={{ mt: 1 }}>Order Confirmed</Box>
        </DialogTitle>
        <DialogContent>
          <Typography align="center" sx={{ mb: 1 }}>Thank you! Your order has been placed successfully.</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Order ID:</Typography>
            <Chip icon={<ContentCopyIcon />} label={orderId} onClick={() => navigator.clipboard?.writeText(orderId)} />
          </Box>
          <Typography align="center" variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            A confirmation email will be sent shortly.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button variant="outlined" onClick={() => setConfirmOpen(false)}>Continue shopping</Button>
          <Button variant="contained" onClick={() => setConfirmOpen(false)}>View order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


// // // import React, { useMemo, useState } from "react";
// // // import {
// // //   Box,
// // //   Button,
// // //   Container,
// // //   Stepper,
// // //   Step,
// // //   StepLabel,
// // //   TextField,
// // //   Grid,
// // //   Checkbox,
// // //   FormControlLabel,
// // //   Typography,
// // //   Paper,
// // //   Card,
// // //   CardContent,
// // //   Chip,
// // //   Divider,
// // //   IconButton,
// // //   InputAdornment,
// // //   Radio,
// // //   RadioGroup,
// // //   FormControl,
// // //   FormLabel,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Alert,
// // //   LinearProgress,
// // //   Tooltip,
// // // } from "@mui/material";
// // // import { styled, useTheme } from "@mui/material/styles";
// // // import { useCart } from "./CartContext";
// // // import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// // // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // // import CreditCardIcon from "@mui/icons-material/CreditCard";
// // // import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// // // import LockIcon from "@mui/icons-material/Lock";
// // // import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// // // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // // import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// // // import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// // // const steps = [
// // //   { label: "Shipping address", icon: <LocalShippingIcon /> },
// // //   { label: "Payment method", icon: <CreditCardIcon /> },
// // //   { label: "Review & confirm", icon: <ReceiptLongIcon /> },
// // // ];

// // // // ---- Styled containers ----
// // // const GlassPaper = styled(Paper)(({ theme }) => ({
// // //   borderRadius: 20,
// // //   padding: theme.spacing(3),
// // //   backdropFilter: "blur(12px)",
// // //   background:
// // //     theme.palette.mode === "dark"
// // //       ? "rgba(30,30,30,0.6)"
// // //       : "rgba(255,255,255,0.7)",
// // //   border: `1px solid ${theme.palette.divider}`,
// // //   boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
// // // }));

// // // const StickyCard = styled(Card)(({ theme }) => ({
// // //   position: "sticky",
// // //   top: theme.spacing(10),
// // //   borderRadius: 20,
// // //   overflow: "hidden",
// // //   backdropFilter: "blur(10px)",
// // //   background: theme.palette.mode === "dark" ? "rgba(25,25,25,0.7)" : "rgba(255,255,255,0.8)",
// // //   boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
// // // }));

// // // function currency(n) {
// // //   return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
// // // }

// // // export default function CheckoutPro() {
// // //   const theme = useTheme();
// // //   const [activeStep, setActiveStep] = useState(0);
// // //   const [promoCode, setPromoCode] = useState("");
// // //   const [appliedPromo, setAppliedPromo] = useState(null);
// // //   const [confirmOpen, setConfirmOpen] = useState(false);
// // //   const [orderId, setOrderId] = useState("");
// // //   const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

// // //   // Derive numeric price from cart items
// // //   const items = useMemo(
// // //     () =>
// // //       cart.map((it) => ({
// // //         id: it.id,
// // //         title: it.title,
// // //         price: Number(parseFloat(String(it.price || "").replace("$", "")) || 0),
// // //         qty: it.quantity || 1,
// // //       })),
// // //     [cart]
// // //   );

// // //   const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);
// // //   const shippingFee = useMemo(() => (subtotal > 999 ? 0 : 99), [subtotal]);
// // //   const discount = useMemo(
// // //     () => (appliedPromo?.type === "PCT" ? Math.round((appliedPromo.value / 100) * subtotal) : 0),
// // //     [appliedPromo, subtotal]
// // //   );
// // //   const total = useMemo(() => Math.max(subtotal - discount + shippingFee, 0), [subtotal, discount, shippingFee]);

// // //   // Form state
// // //   const [shipping, setShipping] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     phone: "",
// // //     address1: "",
// // //     address2: "",
// // //     city: "",
// // //     state: "",
// // //     zip: "",
// // //     country: "India",
// // //     saveAsDefault: true,
// // //   });

// // //   const [paymentMethod, setPaymentMethod] = useState("card");
// // //   const [payment, setPayment] = useState({
// // //     nameOnCard: "",
// // //     cardNumber: "",
// // //     exp: "",
// // //     cvv: "",
// // //     upiId: "",
// // //   });

// // //   const [acceptTerms, setAcceptTerms] = useState(false);

// // //   // Validation helpers
// // //   const required = (v) => String(v || "").trim().length > 0;
// // //   const isValidPhone = (v) => /^\+?\d{10,15}$/.test((v || "").replace(/\s/g, ""));
// // //   const isValidPincode = (v) => /^\d{6}$/.test(v || "");
// // //   const isValidExp = (v) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(v || "");
// // //   const isValidCard = (v) => /^(\d{4} \d{4} \d{4} \d{1,4}|\d{16})$/.test((v || "").replace(/\s/g, ""));
// // //   const isValidCVV = (v) => /^\d{3,4}$/.test(v || "");
// // //   const isValidUPI = (v) => /^[\w.\-]{2,}@[\w]{2,}$/.test(v || "");

// // //   const shippingValid =
// // //     required(shipping.firstName) &&
// // //     required(shipping.lastName) &&
// // //     isValidPhone(shipping.phone) &&
// // //     required(shipping.address1) &&
// // //     required(shipping.city) &&
// // //     required(shipping.state) &&
// // //     isValidPincode(shipping.zip) &&
// // //     required(shipping.country);

// // //   const paymentValid = useMemo(() => {
// // //     if (paymentMethod === "card") {
// // //       return (
// // //         required(payment.nameOnCard) &&
// // //         isValidCard(payment.cardNumber) &&
// // //         isValidExp(payment.exp) &&
// // //         isValidCVV(payment.cvv)
// // //       );
// // //     }
// // //     if (paymentMethod === "upi") return isValidUPI(payment.upiId);
// // //     if (paymentMethod === "cod") return true;
// // //     return false;
// // //   }, [payment, paymentMethod]);

// // //   const handleApplyPromo = () => {
// // //     const code = promoCode.trim().toUpperCase();
// // //     if (!code) return;
// // //     if (code === "SAVE10") {
// // //       setAppliedPromo({ code, type: "PCT", value: 10 });
// // //     } else if (code === "FREESHIP") {
// // //       setAppliedPromo({ code, type: "SHIP", value: 0 });
// // //     } else {
// // //       setAppliedPromo({ code, type: "INVALID" });
// // //     }
// // //   };

// // //   const maskedCard = useMemo(() => {
// // //     const raw = (payment.cardNumber || "").replace(/\s/g, "");
// // //     if (raw.length < 4) return "•••• •••• •••• ••••";
// // //     return `•••• •••• •••• ${raw.slice(-4)}`;
// // //   }, [payment.cardNumber]);

// // //   const nextDisabled = useMemo(() => {
// // //     if (activeStep === 0) return !shippingValid;
// // //     if (activeStep === 1) return !paymentValid;
// // //     if (activeStep === 2) return !acceptTerms;
// // //     return false;
// // //   }, [activeStep, shippingValid, paymentValid, acceptTerms]);

// // //   const handleNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
// // //   const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

// // //   const placeOrder = () => {
// // //     const id = `ORD-${Date.now().toString().slice(-6)}`;
// // //     setOrderId(id);
// // //     setConfirmOpen(true);
// // //   };

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: "100vh",
// // //         background: `linear-gradient(135deg, ${theme.palette.primary.light}33, ${theme.palette.secondary.light}33)`,
// // //         py: { xs: 4, md: 8 },
// // //       }}
// // //     >
// // //       {/* Centered title */}
// // //       <Container maxWidth="md" sx={{ textAlign: "center", mb: 6 }}>
// // //         <ShoppingBagIcon
// // //           sx={{
// // //             fontSize: 70,
// // //             color: theme.palette.primary.main,
// // //             background: "white",
// // //             borderRadius: "50%",
// // //             p: 2,
// // //             boxShadow: 4,
// // //           }}
// // //         />
// // //         <Typography
// // //           variant="h4"
// // //           fontWeight={800}
// // //           sx={{
// // //             mt: 2,
// // //             background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // //             backgroundClip: "text",
// // //             textFillColor: "transparent",
// // //           }}
// // //         >
// // //           Secure Checkout
// // //         </Typography>
// // //         <Typography variant="body2" color="text.secondary">
// // //           Complete your purchase in 3 simple steps
// // //         </Typography>
// // //       </Container>

// // //       <Container maxWidth="lg" sx={{ pb: 6 }}>
// // //         {/* Stepper */}
// // //         <GlassPaper sx={{ mb: 3 }}>
// // //           <Stepper activeStep={activeStep} alternativeLabel>
// // //             {steps.map((s) => (
// // //               <Step key={s.label}>
// // //                 <StepLabel icon={s.icon}>{s.label}</StepLabel>
// // //               </Step>
// // //             ))}
// // //           </Stepper>
// // //           <LinearProgress
// // //             variant="determinate"
// // //             value={((activeStep + 1) / steps.length) * 100}
// // //             sx={{ mt: 2, borderRadius: 99 }}
// // //           />
// // //         </GlassPaper>

// // //         {/* Layout */}
// // //         <Grid container spacing={3}>
// // //           {/* Forms */}
// // //           <Grid item xs={12} md={7}>
// // //             <GlassPaper>
// // //               {/* forms code same as before... */}
// // //               {/* keep original fields unchanged */}
// // //               {/* nav buttons with gradient */}
// // //               <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
// // //                 {activeStep > 0 && (
// // //                   <Button variant="outlined" onClick={handleBack} sx={{ borderRadius: 8 }}>
// // //                     Back
// // //                   </Button>
// // //                 )}
// // //                 {activeStep < steps.length - 1 ? (
// // //                   <Button
// // //                     variant="contained"
// // //                     size="large"
// // //                     disabled={nextDisabled}
// // //                     onClick={handleNext}
// // //                     sx={{
// // //                       borderRadius: 10,
// // //                       px: 4,
// // //                       py: 1.5,
// // //                       background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
// // //                     }}
// // //                   >
// // //                     Next
// // //                   </Button>
// // //                 ) : (
// // //                   <Button
// // //                     color="success"
// // //                     variant="contained"
// // //                     size="large"
// // //                     disabled={nextDisabled}
// // //                     onClick={placeOrder}
// // //                     startIcon={<CheckCircleIcon />}
// // //                     sx={{ borderRadius: 10, px: 4, py: 1.5 }}
// // //                   >
// // //                     Place Order
// // //                   </Button>
// // //                 )}
// // //               </Box>
// // //             </GlassPaper>
// // //           </Grid>

// // //           {/* Order Summary */}
// // //           <Grid item xs={12} md={5}>
// // //             <StickyCard>
// // //               <Box sx={{ p: 3 }}>
// // //                 <Typography variant="h6" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //                   <ReceiptLongIcon /> Order Summary
// // //                 </Typography>
// // //               </Box>
// // //               <Divider />
// // //               <CardContent>
// // //                 {/* same summary logic as before */}
// // //               </CardContent>
// // //             </StickyCard>
// // //           </Grid>
// // //         </Grid>
// // //       </Container>

// // //       {/* Confirmation dialog */}
// // //       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
// // //         <DialogTitle sx={{ textAlign: "center" }}>
// // //           <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
// // //           <Box sx={{ mt: 1 }}>Order Confirmed</Box>
// // //         </DialogTitle>
// // //         <DialogContent>
// // //           <Typography align="center">Thank you! Your order has been placed successfully.</Typography>
// // //           <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
// // //             <Typography variant="body2">Order ID:</Typography>
// // //             <Chip icon={<ContentCopyIcon />} label={orderId} />
// // //           </Box>
// // //         </DialogContent>
// // //         <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
// // //           <Button variant="outlined" onClick={() => setConfirmOpen(false)}>Continue Shopping</Button>
// // //           <Button variant="contained" onClick={() => setConfirmOpen(false)}>View Order</Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // }




// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Stepper,
// //   Step,
// //   StepLabel,
// //   Typography,
// //   Grid,
// //   TextField,
// //   Paper,
// //   Divider,
// //   RadioGroup,
// //   FormControlLabel,
// //   Radio,
// //   Checkbox,
// // } from "@mui/material";
// // import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// // const steps = ["Shipping", "Payment", "Review"];

// // // Fake cart items
// // const items = [
// //   {
// //     id: 1,
// //     title: "Nike Air Zoom Pegasus",
// //     price: 8999,
// //     qty: 1,
// //     image:
// //       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fe25334c-99b2-4326-9fb3-073ee2a7fdf2/pegasus-41-road-running-shoes.png",
// //   },
// //   {
// //     id: 2,
// //     title: "Adidas Ultraboost 22",
// //     price: 11999,
// //     qty: 2,
// //     image:
// //       "https://assets.adidas.com/images/w_600,f_auto,q_auto/10c2d79e81584ccaa3c6af1000e8d555_9366/Ultraboost_22_Shoes_White_GX3064_01_standard.jpg",
// //   },
// // ];

// // // Glass effect wrapper
// // const GlassCard = ({ children, sx }) => (
// //   <Paper
// //     elevation={4}
// //     sx={{
// //       p: 3,
// //       borderRadius: 5,
// //       backdropFilter: "blur(16px)",
// //       background: "rgba(255,255,255,0.15)",
// //       border: "1px solid rgba(255,255,255,0.2)",
// //       boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
// //       ...sx,
// //     }}
// //   >
// //     {children}
// //   </Paper>
// // );

// // export default function CheckoutPage() {
// //   const [activeStep, setActiveStep] = useState(0);
// //   const [shipping, setShipping] = useState({});
// //   const [payment, setPayment] = useState({ method: "card" });

// //   const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
// //   const shippingFee = subtotal > 10000 ? 0 : 199;
// //   const discount = subtotal > 20000 ? 1500 : 0;
// //   const total = subtotal + shippingFee - discount;

// //   // Render steps
// //   const renderStep = () => {
// //     switch (activeStep) {
// //       case 0:
// //         return (
// //           <Grid container spacing={2}>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 variant="outlined"
// //                 label="First Name"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, firstName: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Last Name"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, lastName: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Phone"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, phone: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Address"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, address: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="City"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, city: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="State"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, state: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Zip"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, zip: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //             <Grid item xs={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Country"
// //                 onChange={(e) =>
// //                   setShipping({ ...shipping, country: e.target.value })
// //                 }
// //               />
// //             </Grid>
            
// //             <Grid item xs={12}>
// //               <FormControlLabel
// //                 control={<Checkbox />}
// //                 label="Save as default address"
// //               />
// //             </Grid>
// //           </Grid>
// //         );
// //       case 1:
// //         return (
// //           <Box>
// //             <RadioGroup
// //               row
// //               value={payment.method}
// //               onChange={(e) =>
// //                 setPayment({ ...payment, method: e.target.value })
// //               }
// //             >
// //               <FormControlLabel value="card" control={<Radio />} label="Card" />
// //               <FormControlLabel value="upi" control={<Radio />} label="UPI" />
// //               <FormControlLabel
// //                 value="cod"
// //                 control={<Radio />}
// //                 label="Cash on Delivery"
// //               />
// //             </RadioGroup>

// //             {payment.method === "card" && (
// //               <Box mt={2}>
// //                 <TextField
// //                   fullWidth
// //                   label="Cardholder Name"
// //                   sx={{ mb: 2 }}
// //                   onChange={(e) =>
// //                     setPayment({ ...payment, name: e.target.value })
// //                   }
// //                 />
// //                 <TextField
// //                   fullWidth
// //                   label="Card Number"
// //                   sx={{ mb: 2 }}
// //                   onChange={(e) =>
// //                     setPayment({ ...payment, number: e.target.value })
// //                   }
// //                 />
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Expiry Date"
// //                       onChange={(e) =>
// //                         setPayment({ ...payment, expiry: e.target.value })
// //                       }
// //                     />
// //                   </Grid>
// //                   <Grid item xs={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="CVV"
// //                       onChange={(e) =>
// //                         setPayment({ ...payment, cvv: e.target.value })
// //                       }
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Box>
// //             )}

// //             {payment.method === "upi" && (
// //               <TextField
// //                 fullWidth
// //                 sx={{ mt: 2 }}
// //                 label="UPI ID"
// //                 onChange={(e) =>
// //                   setPayment({ ...payment, upi: e.target.value })
// //                 }
// //               />
// //             )}
// //           </Box>
// //         );
// //       case 2:
// //         return (
// //           <Box>
// //             <Typography variant="h6" gutterBottom>
// //               Shipping Details
// //             </Typography>
// //             <Typography>
// //               {shipping.firstName} {shipping.lastName}, {shipping.address},{" "}
// //               {shipping.city}, {shipping.state}, {shipping.zip},{" "}
// //               {shipping.country}
// //             </Typography>
// //             <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
// //               Payment Method
// //             </Typography>
// //             <Typography>{payment.method.toUpperCase()}</Typography>
// //           </Box>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
// //         minHeight: "100vh",
// //         py: 6,
// //       }}
// //     >
// //       <Container maxWidth="lg">
// //         {/* Header */}
// //         <Box textAlign="center" mb={5}>
// //           <ShoppingBagIcon sx={{ fontSize: 60, color: "white", mb: 1 }} />
// //           <Typography variant="h4" fontWeight="bold" color="white">
// //             Checkout
// //           </Typography>
// //         </Box>

// //         <Grid container spacing={4}>
// //           {/* Left side - Forms */}
// //           <Grid item xs={12} md={8}>
// //             <GlassCard>
// //               <Stepper
// //                 activeStep={activeStep}
// //                 alternativeLabel
// //                 sx={{
// //                   "& .MuiStepIcon-root": {
// //                     color: "rgba(255,255,255,0.4)",
// //                   },
// //                   "& .MuiStepIcon-root.Mui-active": {
// //                     color: "#6a11cb",
// //                   },
// //                   "& .MuiStepIcon-root.Mui-completed": {
// //                     color: "#2575fc",
// //                   },
// //                 }}
// //               >
// //                 {steps.map((label) => (
// //                   <Step key={label}>
// //                     <StepLabel>{label}</StepLabel>
// //                   </Step>
// //                 ))}
// //               </Stepper>

// //               <Box mt={4}>{renderStep()}</Box>

// //               <Box mt={4} display="flex" justifyContent="space-between">
// //                 <Button
// //                   disabled={activeStep === 0}
// //                   onClick={() => setActiveStep((prev) => prev - 1)}
// //                 >
// //                   Back
// //                 </Button>
// //                 {activeStep === steps.length - 1 ? (
// //                   <Button
// //                     variant="contained"
// //                     sx={{
// //                       background: "linear-gradient(to right, #6a11cb, #2575fc)",
// //                       color: "white",
// //                       borderRadius: "25px",
// //                       px: 4,
// //                     }}
// //                   >
// //                     Place Order
// //                   </Button>
// //                 ) : (
// //                   <Button
// //                     variant="contained"
// //                     sx={{
// //                       background: "linear-gradient(to right, #6a11cb, #2575fc)",
// //                       color: "white",
// //                       borderRadius: "25px",
// //                       px: 4,
// //                     }}
// //                     onClick={() => setActiveStep((prev) => prev + 1)}
// //                   >
// //                     Next
// //                   </Button>
// //                 )}
// //               </Box>
// //             </GlassCard>
// //           </Grid>

// //           {/* Right side - Order Summary */}
// //           <Grid item xs={12} md={4}>
// //             <GlassCard>
// //               <Typography variant="h6" gutterBottom fontWeight={700}>
// //                 Order Summary
// //               </Typography>
// //               {items.map((it) => (
// //                 <Box
// //                   key={it.id}
// //                   sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                     my: 1.5,
// //                     p: 1.5,
// //                     borderRadius: 3,
// //                     bgcolor: "rgba(255,255,255,0.1)",
// //                   }}
// //                 >
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: 1.5,
// //                       flex: 1,
// //                     }}
// //                   >
// //                     <img
// //                       src={it.image}
// //                       alt={it.title}
// //                       style={{
// //                         width: 60,
// //                         height: 60,
// //                         objectFit: "cover",
// //                         borderRadius: 12,
// //                       }}
// //                     />
// //                     <Box>
// //                       <Typography noWrap fontWeight={600}>
// //                         {it.title}
// //                       </Typography>
// //                       <Typography variant="caption" color="text.secondary">
// //                         Qty: {it.qty}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Typography fontWeight={700}>
// //                     ₹{(it.price * it.qty).toFixed(2)}
// //                   </Typography>
// //                 </Box>
// //               ))}

// //               <Divider sx={{ my: 2 }} />

// //               <Box
// //                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
// //               >
// //                 <Typography>Subtotal</Typography>
// //                 <Typography>₹{subtotal.toFixed(2)}</Typography>
// //               </Box>
// //               <Box
// //                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
// //               >
// //                 <Typography>Shipping</Typography>
// //                 <Typography>₹{shippingFee.toFixed(2)}</Typography>
// //               </Box>
// //               <Box
// //                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
// //               >
// //                 <Typography>Discount</Typography>
// //                 <Typography>- ₹{discount.toFixed(2)}</Typography>
// //               </Box>
// //               <Divider sx={{ my: 2 }} />
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   fontWeight: "bold",
// //                 }}
// //               >
// //                 <Typography>Total</Typography>
// //                 <Typography>₹{total.toFixed(2)}</Typography>
// //               </Box>
// //             </GlassCard>
// //           </Grid>
// //         </Grid>
// //       </Container>
// //     </Box>
// //   );
// // }


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Stepper,
//   Step,
//   StepLabel,
//   Typography,
//   Grid,
//   TextField,
//   Paper,
//   Divider,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Checkbox,
// } from "@mui/material";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// const steps = ["Shipping", "Payment", "Review"];

// // Fake cart items
// const items = [
//   {
//     id: 1,
//     title: "Nike Air Zoom Pegasus",
//     price: 8999,
//     qty: 1,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fe25334c-99b2-4326-9fb3-073ee2a7fdf2/pegasus-41-road-running-shoes.png",
//   },
//   {
//     id: 2,
//     title: "Adidas Ultraboost 22",
//     price: 11999,
//     qty: 2,
//     image:
//       "https://assets.adidas.com/images/w_600,f_auto,q_auto/10c2d79e81584ccaa3c6af1000e8d555_9366/Ultraboost_22_Shoes_White_GX3064_01_standard.jpg",
//   },
// ];

// // Card wrapper
// const GlassCard = ({ children, sx }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       p: 3,
//       borderRadius: 4,
//       background: "#fff",
//       border: "1px solid #e0e0e0",
//       boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//       ...sx,
//     }}
//   >
//     {children}
//   </Paper>
// );

// export default function CheckoutPage() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [shipping, setShipping] = useState({});
//   const [payment, setPayment] = useState({ method: "card" });

//   const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
//   const shippingFee = subtotal > 10000 ? 0 : 199;
//   const discount = subtotal > 20000 ? 1500 : 0;
//   const total = subtotal + shippingFee - discount;

//   // Render steps
//   const renderStep = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   label="First Name"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, firstName: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, lastName: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, phone: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, address: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, city: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, state: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="Zip"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, zip: e.target.value })
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   label="Country"
//                   onChange={(e) =>
//                     setShipping({ ...shipping, country: e.target.value })
//                   }
//                 />
//               </Grid>
//             </Grid>

//             {/* Checkbox shifted niche */}
//             <Box mt={2}>
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Save as default address"
//               />
//             </Box>
//           </Box>
//         );
//       case 1:
//         return (
//           <Box>
//             <RadioGroup
//               row
//               value={payment.method}
//               onChange={(e) =>
//                 setPayment({ ...payment, method: e.target.value })
//               }
//             >
//               <FormControlLabel value="card" control={<Radio />} label="Card" />
//               <FormControlLabel value="upi" control={<Radio />} label="UPI" />
//               <FormControlLabel
//                 value="cod"
//                 control={<Radio />}
//                 label="Cash on Delivery"
//               />
//             </RadioGroup>

//             {payment.method === "card" && (
//               <Box mt={2}>
//                 <TextField
//                   fullWidth
//                   label="Cardholder Name"
//                   sx={{ mb: 2 }}
//                   onChange={(e) =>
//                     setPayment({ ...payment, name: e.target.value })
//                   }
//                 />
//                 <TextField
//                   fullWidth
//                   label="Card Number"
//                   sx={{ mb: 2 }}
//                   onChange={(e) =>
//                     setPayment({ ...payment, number: e.target.value })
//                   }
//                 />
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       fullWidth
//                       label="Expiry Date"
//                       onChange={(e) =>
//                         setPayment({ ...payment, expiry: e.target.value })
//                       }
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       fullWidth
//                       label="CVV"
//                       onChange={(e) =>
//                         setPayment({ ...payment, cvv: e.target.value })
//                       }
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}

//             {payment.method === "upi" && (
//               <TextField
//                 fullWidth
//                 sx={{ mt: 2 }}
//                 label="UPI ID"
//                 onChange={(e) =>
//                   setPayment({ ...payment, upi: e.target.value })
//                 }
//               />
//             )}
//           </Box>
//         );
//       case 2:
//         return (
//           <Box>
//             <Typography variant="h6" gutterBottom>
//               Shipping Details
//             </Typography>
//             <Typography>
//               {shipping.firstName} {shipping.lastName}, {shipping.address},{" "}
//               {shipping.city}, {shipping.state}, {shipping.zip},{" "}
//               {shipping.country}
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
//               Payment Method
//             </Typography>
//             <Typography>{payment.method.toUpperCase()}</Typography>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 6 }}>
//       <Container maxWidth="lg">
//         {/* Header */}
//         <Box textAlign="center" mb={5}>
//           <ShoppingBagIcon sx={{ fontSize: 60, color: "#333", mb: 1 }} />
//           <Typography variant="h4" fontWeight="bold" color="#333">
//             Checkout
//           </Typography>
//         </Box>

//         <Grid container spacing={4}>
//           {/* Left side - Forms */}
//           <Grid item xs={12} md={8}>
//             <GlassCard>
//               <Stepper activeStep={activeStep} alternativeLabel>
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>

//               <Box mt={4}>{renderStep()}</Box>

//               <Box mt={4} display="flex" justifyContent="space-between">
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={() => setActiveStep((prev) => prev - 1)}
//                 >
//                   Back
//                 </Button>
//                 {activeStep === steps.length - 1 ? (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       borderRadius: "25px",
//                       px: 4,
//                     }}
//                   >
//                     Place Order
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#1976d2",
//                       color: "white",
//                       borderRadius: "25px",
//                       px: 4,
//                     }}
//                     onClick={() => setActiveStep((prev) => prev + 1)}
//                   >
//                     Next
//                   </Button>
//                 )}
//               </Box>
//             </GlassCard>
//           </Grid>

//           {/* Right side - Order Summary */}
//           <Grid item xs={12} md={4}>
//             <GlassCard>
//               <Typography variant="h6" gutterBottom fontWeight={700}>
//                 Order Summary
//               </Typography>
//               {items.map((it) => (
//                 <Box
//                   key={it.id}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     my: 1.5,
//                     p: 1.5,
//                     borderRadius: 3,
//                     bgcolor: "#f5f5f5",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.5,
//                       flex: 1,
//                     }}
//                   >
//                     <img
//                       src={it.image}
//                       alt={it.title}
//                       style={{
//                         width: 60,
//                         height: 60,
//                         objectFit: "cover",
//                         borderRadius: 12,
//                       }}
//                     />
//                     <Box>
//                       <Typography noWrap fontWeight={600}>
//                         {it.title}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Qty: {it.qty}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Typography fontWeight={700}>
//                     ₹{(it.price * it.qty).toFixed(2)}
//                   </Typography>
//                 </Box>
//               ))}

//               <Divider sx={{ my: 2 }} />

//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography>Subtotal</Typography>
//                 <Typography>₹{subtotal.toFixed(2)}</Typography>
//               </Box>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography>Shipping</Typography>
//                 <Typography>₹{shippingFee.toFixed(2)}</Typography>
//               </Box>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//               >
//                 <Typography>Discount</Typography>
//                 <Typography>- ₹{discount.toFixed(2)}</Typography>
//               </Box>
//               <Divider sx={{ my: 2 }} />
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   fontWeight: "bold",
//                 }}
//               >
//                 <Typography>Total</Typography>
//                 <Typography>₹{total.toFixed(2)}</Typography>
//               </Box>
//             </GlassCard>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
