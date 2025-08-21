// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { Link } from "react-router-dom";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Logo (Desktop) */}
//           <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             to="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".2rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           {/* Mobile Menu Button */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem
//                   key={page}
//                   component={Link}
//                   to={`/${page.toLowerCase()}`}
//                   onClick={handleCloseNavMenu}
//                 >
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Logo (Mobile) */}
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component={Link}
//             to="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".2rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 component={Link}
//                 to={`/${page.toLowerCase()}`}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "white", display: "block", mx: 1 }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* User Avatar Menu */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar sx={{ bgcolor: "secondary.main" }}>R</Avatar>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{ vertical: "top", horizontal: "right" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;


// import * as React from "react";
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
// import { Link } from "react-router-dom";

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
//     ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
//     : alpha(theme.palette.background.default, 0.4),
//   boxShadow: (theme.vars || theme).shadows[1],
//   padding: "8px 12px",
// }));

// const pages = [
//   { title: "Products", path: "/products" },
//   { title: "Pricing", path: "/pricing" },
//   { title: "Blog", path: "/blog" },
// ];

// export default function ResponsiveAppBar() {
//   const [open, setOpen] = React.useState(false);

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
//         mt: "20px",
//       }}
//     >
//       <Container maxWidth="lg">
//         <StyledToolbar disableGutters>
//           {/* Logo Left */}
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             to="/"
//             sx={{
//               mr: 2,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".2rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             {pages.map((page) => (
//               <Button
//                 key={page.title}
//                 component={Link}
//                 to={page.path}
//                 color="info"
//                 size="small"
//               >
//                 {page.title}
//               </Button>
//             ))}
//           </Box>

//           {/* Desktop Right Section */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             <Button color="primary" variant="text" size="small">
//               Sign in
//             </Button>
//             <Button color="primary" variant="contained" size="small">
//               Sign up
//             </Button>
//           </Box>

//           {/* Mobile Menu */}
//           <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
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
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <IconButton onClick={toggleDrawer(false)}>
//                     <CloseRoundedIcon />
//                   </IconButton>
//                 </Box>

//                 {pages.map((page) => (
//                   <MenuItem
//                     key={page.title}
//                     component={Link}
//                     to={page.path}
//                     onClick={toggleDrawer(false)}
//                   >
//                     {page.title}
//                   </MenuItem>
//                 ))}

//                 <Divider sx={{ my: 3 }} />
//                 <MenuItem>
//                   <Button color="primary" variant="contained" fullWidth>
//                     Sign up
//                   </Button>
//                 </MenuItem>
//                 <MenuItem>
//                   <Button color="primary" variant="outlined" fullWidth>
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
// import AdbIcon from "@mui/icons-material/Adb"; // Example logo icon
// import { Link } from "react-router-dom";

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
import FavoriteIcon from "@mui/icons-material/Favorite"; // ❤️ Wishlist
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // 🛒 Cart
import Badge from "@mui/material/Badge"; // For count
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
  const { wishlist } = useWishlist();
  const { getCartCount } = useCart();

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
            <IconButton
              component={Link}
              to="/wishlist"
              sx={{
                position: "relative",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon sx={{ color: "error.main" }} />
              </Badge>
            </IconButton>

            {/* Cart Icon */}
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                position: "relative",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <Badge badgeContent={getCartCount()} color="primary">
                <ShoppingCartIcon sx={{ color: "primary.main" }} />
              </Badge>
            </IconButton>

            {/* Auth Buttons */}
            <Button
              color="primary"
              variant="outlined"
              size="small"
              sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{ borderRadius: "20px", textTransform: "none", px: 2 }}
            >
              Sign up
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "0",
                },
              }}
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
                    sx={{
                      fontWeight: 600,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {page.title}
                  </MenuItem>
                ))}

                {/* Wishlist inside Drawer */}
                <MenuItem
                  component={Link}
                  to="/wishlist"
                  onClick={toggleDrawer(false)}
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FavoriteIcon sx={{ color: "error.main" }} /> Wishlist
                  <Badge
                    badgeContent={wishlist.length}
                    color="error"
                    sx={{ ml: 1 }}
                  />
                </MenuItem>

                {/* Cart inside Drawer */}
                <MenuItem
                  component={Link}
                  to="/cart"
                  onClick={toggleDrawer(false)}
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "primary.main" }} /> Cart
                  <Badge
                    badgeContent={getCartCount()}
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                </MenuItem>

                <Divider sx={{ my: 2 }} />

                <MenuItem>
                  <Button
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
                    color="primary"
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: "20px", textTransform: "none" }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
