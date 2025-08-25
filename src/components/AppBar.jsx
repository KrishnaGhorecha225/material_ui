// import React from "react";
// import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Container from "@mui/material/Container";
// import Divider from "@mui/material/Divider";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import Typography from "@mui/material/Typography";
// import AdbIcon from "@mui/icons-material/Adb"; 
// import FavoriteIcon from "@mui/icons-material/Favorite"; 
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 
// import Badge from "@mui/material/Badge"; 
// import { Link } from "react-router-dom";
// import { useWishlist } from "../pages/WishlistContext";
// import { useCart } from "../pages/CartContext";

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   flexShrink: 0,
//   borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
//   backdropFilter: "blur(24px)",
//   border: "1px solid",
//   borderColor: (theme.vars || theme).palette.divider,
//   backgroundColor: theme.vars
//     ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.6)`
//     : alpha(theme.palette.background.default, 0.6),
//   boxShadow: (theme.vars || theme).shadows[3],
//   padding: "10px 20px",
// }));

// const pages = [
//   { title: "Products", path: "/products" },
//   { title: "Pricing", path: "/pricing" },
//   { title: "Blog", path: "/blog" },
// ];

// export default function ResponsiveAppBar() {
//   const [open, setOpen] = React.useState(false);
//   const { wishlist } = useWishlist();
//   const { getCartCount } = useCart();

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       enableColorOnDark
//       sx={{
//         boxShadow: 0,
//         bgcolor: "transparent",
//         backgroundImage: "none",
//         mt: "15px",
//       }}
//     >
//       <Container maxWidth="lg">
//         <StyledToolbar disableGutters>
//           {/* Logo with Icon */}
//           <Box
//             component={Link}
//             to="/"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               textDecoration: "none",
//               color: "inherit",
//               gap: 1,
//             }}
//           >
//             <AdbIcon sx={{ fontSize: 30, color: "primary.main" }} />
//             <Typography
//               variant="h6"
//               noWrap
//               sx={{
//                 fontFamily: "monospace",
//                 fontWeight: 800,
//                 letterSpacing: ".15rem",
//                 color: "text.primary",
//               }}
//             >
//               MyBrand
//             </Typography>
//           </Box>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {pages.map((page) => (
//               <Button
//                 key={page.title}
//                 component={Link}
//                 to={page.path}
//                 sx={{
//                   color: "text.secondary",
//                   fontWeight: 600,
//                   "&:hover": {
//                     color: "primary.main",
//                     transform: "scale(1.05)",
//                     transition: "all 0.3s ease",
//                   },
//                 }}
//               >
//                 {page.title}
//               </Button>
//             ))}
//           </Box>

//           {/* Desktop Right Section */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 1.5,
//               alignItems: "center",
//             }}
//           >
//             {/* Wishlist Icon */}
//             <IconButton
//               component={Link}
//               to="/wishlist"
//               sx={{
//                 position: "relative",
//                 transition: "transform 0.2s ease",
//                 "&:hover": {
//                   transform: "scale(1.2)",
//                 },
//               }}
//             >
//               <Badge badgeContent={wishlist.length} color="error">
//                 <FavoriteIcon sx={{ color: "error.main" }} />
//               </Badge>
//             </IconButton>

//             {/* Cart Icon */}
//             <IconButton
//               component={Link}
//               to="/cart"
//               sx={{
//                 position: "relative",
//                 transition: "transform 0.2s ease",
//                 "&:hover": {
//                   transform: "scale(1.2)",
//                 },
//               }}
//             >
//               <Badge badgeContent={getCartCount()} color="primary">
//                 <ShoppingCartIcon sx={{ color: "primary.main" }} />
//               </Badge>
//             </IconButton>

//             {/* Auth Buttons */}
//             <Button
//               color="primary"
//               variant="outlined"
//               size="small"
//               sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
//             >
//               Sign in
//             </Button>
//             <Button
//               color="primary"
//               variant="contained"
//               size="small"
//               sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
//             >
//               Sign up
//             </Button>
//           </Box>

//           {/* Mobile Menu */}
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="top"
//               open={open}
//               onClose={toggleDrawer(false)}
//               PaperProps={{
//                 sx: {
//                   top: "0",
//                 },
//               }}
//             >
//               <Box sx={{ p: 2, backgroundColor: "background.default" }}>
//                 {/* Drawer Header */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                     Menu
//                   </Typography>
//                   <IconButton onClick={toggleDrawer(false)}>
//                     <CloseRoundedIcon />
//                   </IconButton>
//                 </Box>

//                 {/* Drawer Links */}
//                 {pages.map((page) => (
//                   <MenuItem
//                     key={page.title}
//                     component={Link}
//                     to={page.path}
//                     onClick={toggleDrawer(false)}
//                     sx={{
//                       fontWeight: 600,
//                       "&:hover": { color: "primary.main" },
//                     }}
//                   >
//                     {page.title}
//                   </MenuItem>
//                 ))}

//                 {/* Wishlist inside Drawer */}
//                 <MenuItem
//                   component={Link}
//                   to="/wishlist"
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     fontWeight: 600,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <FavoriteIcon sx={{ color: "error.main" }} /> Wishlist
//                   <Badge
//                     badgeContent={wishlist.length}
//                     color="error"
//                     sx={{ ml: 1 }}
//                   />
//                 </MenuItem>

//                 {/* Cart inside Drawer */}
//                 <MenuItem
//                   component={Link}
//                   to="/cart"
//                   onClick={toggleDrawer(false)}
//                   sx={{
//                     fontWeight: 600,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}
//                 >
//                   <ShoppingCartIcon sx={{ color: "primary.main" }} /> Cart
//                   <Badge
//                     badgeContent={getCartCount()}
//                     color="primary"
//                     sx={{ ml: 1 }}
//                   />
//                 </MenuItem>

//                 <Divider sx={{ my: 2 }} />

//                 <MenuItem>
//                   <Button
//                     color="primary"
//                     variant="contained"
//                     fullWidth
//                     sx={{ borderRadius: "20px", textTransform: "none" }}
//                   >
//                     Sign up
//                   </Button>
//                 </MenuItem>
//                 <MenuItem>
//                   <Button
//                     color="primary"
//                     variant="outlined"
//                     fullWidth
//                     sx={{ borderRadius: "20px", textTransform: "none" }}
//                   >
//                     Sign in
//                   </Button>
//                 </MenuItem>
//               </Box>
//             </Drawer>
//           </Box>
//         </StyledToolbar>
//       </Container>
//     </AppBar>
//   );
// }


import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useWishlist } from "../pages/WishlistContext";
import { useCart } from "../pages/CartContext";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.6)`
    : alpha(theme.palette.background.default, 0.6),
  boxShadow: (theme.vars || theme).shadows[3],
  padding: "10px 20px",
}));

const pages = [
  { title: "Products", path: "/products" },
  { title: "Pricing", path: "/pricing" },
  { title: "Blog", path: "/blog" },
];

export default function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const { wishlist } = useWishlist() || { wishlist: [] };
  const { getCartCount } = useCart() || { getCartCount: () => 0 };
  
  // Check for user on component mount and when localStorage changes
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };
    
    // Listen for custom login event
    const handleUserLogin = (event) => {
      setCurrentUser(event.detail);
    };
    
    // Listen for custom logout event
    const handleUserLogout = () => {
      setCurrentUser(null);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "15px",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          {/* Logo with Icon */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              gap: 1,
            }}
          >
            <AdbIcon sx={{ fontSize: 30, color: "primary.main" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".15rem",
                color: "text.primary",
              }}
            >
              MyBrand
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Desktop Right Section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            {/* Wishlist Icon */}
            <IconButton component={Link} to="/wishlist">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon sx={{ color: "error.main" }} />
              </Badge>
            </IconButton>

            {/* Cart Icon */}
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={getCartCount()} color="primary">
                <ShoppingCartIcon sx={{ color: "primary.main" }} />
              </Badge>
            </IconButton>

            {/* Auth Buttons or Profile */}
            {currentUser ? (
              <IconButton
                component={Link}
                to="/profile"
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "transform 0.2s ease",
                  },
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 28 }} />
              </IconButton>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/signin"
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { top: "0" } }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                {/* Drawer Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Menu
                  </Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Drawer Links */}
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    component={Link}
                    to={page.path}
                    onClick={toggleDrawer(false)}
                  >
                    {page.title}
                  </MenuItem>
                ))}

                <MenuItem component={Link} to="/wishlist" onClick={toggleDrawer(false)}>
                  <FavoriteIcon sx={{ color: "error.main", mr: 1 }} /> Wishlist
                  <Badge badgeContent={wishlist.length} color="error" sx={{ ml: 1 }} />
                </MenuItem>

                <MenuItem component={Link} to="/cart" onClick={toggleDrawer(false)}>
                  <ShoppingCartIcon sx={{ color: "primary.main", mr: 1 }} /> Cart
                  <Badge badgeContent={getCartCount()} color="primary" sx={{ ml: 1 }} />
                </MenuItem>

                <Divider sx={{ my: 2 }} />

                {currentUser ? (
                  <>
                    <MenuItem component={Link} to="/profile" onClick={toggleDrawer(false)}>
                      <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => window.dispatchEvent(new CustomEvent('userLogout'))}>
                      <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        component={Link}
                        to="/signup"
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: "20px", textTransform: "none" }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        component={Link}
                        to="/signin"
                        color="primary"
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: "20px", textTransform: "none" }}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
