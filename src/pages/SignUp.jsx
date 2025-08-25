// // import React, { useState } from "react";
// // import { Box, TextField, Button, Typography, IconButton, InputAdornment, Divider } from "@mui/material";
// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // import GoogleIcon from '@mui/icons-material/Google';
// // import AppleIcon from '@mui/icons-material/Apple';
// // import FacebookIcon from '@mui/icons-material/Facebook';

// // const Signup = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     showPassword: false,
// //     showConfirmPassword: false,
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleTogglePassword = () => {
// //     setFormData({ ...formData, showPassword: !formData.showPassword });
// //   };

// //   const handleToggleConfirmPassword = () => {
// //     setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match");
// //       return;
// //     }
// //     let users = JSON.parse(localStorage.getItem("users")) || [];
// //     const userExists = users.find((user) => user.email === formData.email);
// //     if (userExists) {
// //       alert("User already exists!");
// //     } else {
// //       const newUser = { name: formData.name, email: formData.email, password: formData.password };
// //       users.push(newUser);
// //       localStorage.setItem("users", JSON.stringify(users));
// //       alert("Signup Successful!");
// //       setFormData({ name: "", email: "", password: "", confirmPassword: "", showPassword: false, showConfirmPassword: false });
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f4ff" }}>
// //       {/* Left Side - mirror SignIn */}
// //       <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", px: 8 }}>
// //         <Typography variant="h3" fontWeight="bold" color="#4a6cf7">
// //           Welcome to our <br /> Community
// //         </Typography>
// //         <Typography variant="body1" color="#555" sx={{ mt: 2 }}>
// //           A whole new productive journey starts right here
// //         </Typography>
        
// //       </Box>

// //       {/* Right Side - Sign Up form styled like SignIn */}
// //       <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", px: 8 }}>
// //         <Box sx={{ mb: 4 }}>
// //           <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
// //           <TextField fullWidth label="Enter your email address" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
// //           <TextField
// //             fullWidth
// //             label="Password"
// //             name="password"
// //             type={formData.showPassword ? "text" : "password"}
// //             sx={{ mb: 2 }}
// //             value={formData.password}
// //             onChange={handleChange}
// //             InputProps={{
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton onClick={handleTogglePassword}>
// //                     {formData.showPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Confirm Password"
// //             name="confirmPassword"
// //             type={formData.showConfirmPassword ? "text" : "password"}
// //             sx={{ mb: 1 }}
// //             value={formData.confirmPassword}
// //             onChange={handleChange}
// //             InputProps={{
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton onClick={handleToggleConfirmPassword}>
// //                     {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //         </Box>

// //         <Button variant="contained" fullWidth sx={{ mb: 2, py: 1.5, bgcolor: "#4a6cf7" }} onClick={handleSubmit}>
// //           SIGN UP
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
// //           Already have an account? <span style={{ color: "#4a6cf7", cursor: "pointer" }}><a href="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>Signin</a></span>
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Signup;

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

// export default function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = () => {
//     if (!formData.fullname || !formData.email || !formData.password) {
//       alert("Please fill all fields");
//       return;
//     }
//     localStorage.setItem("user", JSON.stringify(formData));
//     alert("Signup successful 🎉");
//     navigate("/signin");
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
//             Create Account
//           </Typography>
//           <TextField
//             label="Full Name"
//             variant="outlined"

//             name="fullname"
//             fullWidth
//             margin="normal"
            
//             value={formData.fullname}
//             onChange={handleChange}
//           />
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
//             style={{ marginTop: 15, borderRadius: 20, background: "linear-gradient(45deg, #667eea, #764ba2)" }}
//             onClick={handleSignup}
//           >
//             Sign Up
//           </Button>
//           <Typography align="center" style={{ marginTop: 15 }}>
//             Already have an account? <Link to="/signin">Sign In</Link>
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

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      alert("User with this email already exists!");
      return;
    }

    // Create new user with name field
    const newUser = { 
      name, 
      email, 
      password 
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Registration successful! Please login.");
    navigate("/signin");
  };

  return (
    <div className="auth-bg">
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} className="glass-card">
          <Typography component="h1" variant="h5" align="center" color="black" gutterBottom>
            Register
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              fullWidth
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 , color: 'text.secondary' }}>
              Already have an account?{" "}
              <span className="link" onClick={() => navigate("/signin")}>
                Login
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default SignUp;
