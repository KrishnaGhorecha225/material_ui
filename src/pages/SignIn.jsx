// // // SignIn.jsx
// // import React, { useState } from "react";
// // import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Divider } from "@mui/material";
// // import GoogleIcon from '@mui/icons-material/Google';
// // import AppleIcon from '@mui/icons-material/Apple';
// // import FacebookIcon from '@mui/icons-material/Facebook';

// // export default function SignIn() {
// //   const [showPassword, setShowPassword] = useState(false);

// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f4ff" }}>
// //       {/* Left Side */}
// //       <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", px: 8 }}>
// //         <Typography variant="h3" fontWeight="bold" color="#4a6cf7">
// //           Welcome to our <br /> Community
// //         </Typography>
// //         <Typography variant="body1" color="#555" sx={{ mt: 2 }}>
// //           A whole new productive journey starts right here
// //         </Typography>
        
// //       </Box>

// //       {/* Right Side */}
// //       <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", px: 4 }}>
// //         <Box sx={{ mb: 0 }}>
// //           <TextField fullWidth label="Enter your email address" variant="outlined" sx={{ mb: 2 }} />
// //           <TextField
// //             fullWidth
// //             label="Password"
// //             type={showPassword ? "text" : "password"}
// //             variant="outlined"
// //             sx={{ mb: 1 }}
// //           />
// //           <FormControlLabel
// //             control={<Checkbox />}
// //             label="Keep me login"
// //             sx={{ display: "inline-block", mr: 2 }}
// //           />
// //           <Typography component="span" color="#4a6cf7" sx={{ cursor: "pointer" }}>
// //             Recovery Password
// //           </Typography>
// //         </Box>

// //         <Button variant="contained" fullWidth sx={{ mb: 2, py: 1.5, bgcolor: "#4a6cf7" }}>
// //           SIGN IN
// //         </Button>

// //         <Divider sx={{ my: 2 }}>or continue with</Divider>

// //         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //           <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ flex: 1, mr: 1 }}>
// //             Google
// //           </Button>
// //           <Button variant="outlined" startIcon={<AppleIcon />} sx={{ flex: 1, mx: 1 }}>
// //             Apple
// //           </Button>
// //           <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ flex: 1, ml: 1 }}>
// //             Facebook
// //           </Button>
// //         </Box>

// //         <Typography variant="body2" align="center" sx={{ mt: 4 }}>
// //           Don't have an account? <span style={{ color: "#4a6cf7", cursor: "pointer" }}>Register</span>
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // }


// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signin() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignin = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       alert("No account found. Please sign up first.");
//       return;
//     }
//     if (
//       storedUser.email === formData.email &&
//       storedUser.password === formData.password
//     ) {
//       alert("Login successful 🎉");
//       navigate("/dashboard");
//     } else {
//       alert("Invalid email or password ❌");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "linear-gradient(135deg, #667eea, #764ba2)",
//       }}
//     >
//       <Card style={{ width: 350, padding: 20, borderRadius: 20, boxShadow: "0px 8px 25px rgba(0,0,0,0.2)" }}>
//         <CardContent>
//           <Typography variant="h5" align="center" gutterBottom>
//             Sign In
//           </Typography>
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             name="email"
//             fullWidth
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             name="password"
//             fullWidth
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <Button
//             variant="contained"
//             fullWidth
//             style={{ marginTop: 15, borderRadius: 25, background: "linear-gradient(45deg, #667eea, #764ba2)" }}
//             onClick={handleSignin}
//           >
//             Sign In
//           </Button>
//           <Typography align="center" style={{ marginTop: 15 }}>
//             Don’t have an account? <Link to="/signup">Sign Up</Link>
//           </Typography>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography, Paper, InputAdornment } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
      // Dispatch custom event to notify AppBar about login
      window.dispatchEvent(new CustomEvent('userLogin', { detail: { name: user.name, email: user.email } }));
      alert("Login successful!");
      navigate("/"); // redirect to home page
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-bg">
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} className="glass-card">
          <Typography component="h1" variant="h5" align="center" color="black" gutterBottom>
            Login
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              fullWidth
              label="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, borderRadius: "25px" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 , color: 'text.secondary' }}>
              Don’t have an account?{" "}
              <span className="link" onClick={() => navigate("/signup")}>
                Register
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default SignIn;
