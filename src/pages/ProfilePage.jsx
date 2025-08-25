import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Snackbar,
  Chip,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Replay,
  Star,
  Favorite,
  Payment,
  Lock,
  ExitToApp,
  Edit,
  CalendarToday,
  Save,
  Cancel,
  Menu,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "male",
    avatar: "",
    address: "",
    bio: ""
  });

  // Load user data on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      // Try to get the most up-to-date data from users array
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      
      if (userIndex !== -1) {
        // Use data from users array (most recent)
        const userFromArray = users[userIndex];
        setUserData({
          name: userFromArray.name || "",
          email: userFromArray.email || "",
          phone: userFromArray.phone || "",
          dateOfBirth: userFromArray.dateOfBirth || "",
          gender: userFromArray.gender || "male",
          avatar: userFromArray.avatar || "",
          address: userFromArray.address || "",
          bio: userFromArray.bio || ""
        });
        
        // Update currentUser if it's outdated
        if (JSON.stringify(currentUser) !== JSON.stringify(userFromArray)) {
          localStorage.setItem("currentUser", JSON.stringify(userFromArray));
        }
      } else {
        // Fallback to currentUser data
        setUserData({
          name: currentUser.name || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          dateOfBirth: currentUser.dateOfBirth || "",
          gender: currentUser.gender || "male",
          avatar: currentUser.avatar || "",
          address: currentUser.address || "",
          bio: currentUser.bio || ""
        });
      }
    } else {
      // If no user is logged in, redirect to signin
      navigate("/signin");
    }
  }, [navigate]);

  // Handle clicking outside sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const toggleButton = document.querySelector('.sidebar-toggle');
      
      if (sidebar && toggleButton && !sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        setSidebarCollapsed(true);
      }
    };

    // Only add listener on mobile devices
    if (window.innerWidth < 768) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.clear();
    
    // Dispatch custom event to notify AppBar about logout
    window.dispatchEvent(new CustomEvent('userLogout'));
    
    // Redirect to home page
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!userData.name.trim()) {
      alert("Name is required!");
      return;
    }
    
    if (!userData.email.trim()) {
      alert("Email is required!");
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Get current user and users array
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user index in users array
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex === -1) {
      alert("User not found in database!");
      return;
    }
    
    // Update user data in users array
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    
    // Save updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    // Update currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Dispatch event to update AppBar
    window.dispatchEvent(new CustomEvent('userLogin', { detail: updatedUser }));
    
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    setShowSuccess(true);
  };

  const handleCancel = () => {
    // Reload original user data from users array
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (currentUser && currentUser.email) {
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        const originalUser = users[userIndex];
        setUserData({
          name: originalUser.name || "",
          email: originalUser.email || "",
          phone: originalUser.phone || "",
          dateOfBirth: originalUser.dateOfBirth || "",
          gender: originalUser.gender || "male",
          avatar: originalUser.avatar || "",
          address: originalUser.address || "",
          bio: originalUser.bio || ""
        });
      } else {
        // Fallback to currentUser if not found in users array
        setUserData({
          name: currentUser.name || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          dateOfBirth: currentUser.dateOfBirth || "",
          gender: currentUser.gender || "male",
          avatar: currentUser.avatar || "",
          address: currentUser.address || "",
          bio: currentUser.bio || ""
        });
      }
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;
        
        // Update local state
        setUserData(prev => ({
          ...prev,
          avatar: newAvatar
        }));
        
        // Also update in localStorage immediately for better UX
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Update in users array
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
          users[userIndex].avatar = newAvatar;
          localStorage.setItem("users", JSON.stringify(users));
        }
        
        // Update currentUser
        const updatedCurrentUser = { ...currentUser, avatar: newAvatar };
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="profile-container">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="user">
          <Avatar 
            src={userData.avatar || ""} 
            sx={{ width: 50, height: 50 }}
          >
            {!userData.avatar && userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <div className="user-info">{userData.name || "User"}</div>
        </div>
        <div className={`menu-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
          <Person /> My Profile
        </div>
        <div className="menu-item" onClick={() => navigate("/orders")}>
          <ShoppingBag /> My Orders
        </div>
        <div className={`menu-item ${activeTab === "returns" ? "active" : ""}`} onClick={() => setActiveTab("returns")}>
          <Replay /> Returns & Cancel
        </div>
        <div className={`menu-item ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
          <Star /> My Rating & Reviews
        </div>
        <div className={`menu-item ${activeTab === "wishlist" ? "active" : ""}`} onClick={() => setActiveTab("wishlist")}>
          <Favorite /> My Wishlist
        </div>
        <div className={`menu-item ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}>
          <Payment /> Payment
        </div>
        <div className="menu-item" onClick={() => navigate("/change-password")}>
          <Lock /> Change Password
        </div>
        <div className="menu-item" onClick={handleLogout}>
          <ExitToApp /> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="card">
            <div className="card-header">
              <span>Personal Information</span>
              {!isEditing ? (
                <Button 
                  variant="text" 
                  size="small" 
                  onClick={() => setIsEditing(true)}
                  startIcon={<Edit />}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="action-buttons">
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={handleSave}
                    startIcon={<Save />}
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={handleCancel}
                    startIcon={<Cancel />}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="avatar-wrapper">
              <Avatar
                src={userData.avatar || ""}
                sx={{ width: 100, height: 100 }}
              >
                {!userData.avatar && userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </Avatar>
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden-file-input"
                    id="avatar-input"
                  />
                  <label htmlFor="avatar-input">
                    <div className="avatar-edit">
                      <Edit fontSize="small" />
                    </div>
                  </label>
                </>
              )}
            </div>

            <div className="form-group">
              <div className="form-label">Name</div>
              <TextField 
                fullWidth 
                size="small" 
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <div className="form-label">Date Of Birth</div>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  endAdornment: <CalendarToday fontSize="small" />,
                }}
              />
            </div>

            <div className="form-group">
              <div className="form-label">Gender</div>
              <RadioGroup 
                row 
                value={userData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <FormControlLabel 
                  value="male" 
                  control={<Radio disabled={!isEditing} />} 
                  label="Male" 
                />
                <FormControlLabel
                  value="female"
                  control={<Radio disabled={!isEditing} />}
                  label="Female"
                />
              </RadioGroup>
            </div>

            <div className="form-group">
              <div className="form-label">Phone Number</div>
              <TextField 
                fullWidth 
                size="small" 
                value={userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <div className="form-label">Email</div>
              <TextField 
                fullWidth 
                size="small" 
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <div className="form-label">Address</div>
              <TextField 
                fullWidth 
                size="small" 
                value={userData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                multiline
                rows={2}
              />
            </div>

            <div className="form-group">
              <div className="form-label">Bio</div>
              <TextField 
                fullWidth 
                size="small" 
                value={userData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                multiline
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && (
          <div className="card">
            <div className="card-header">
              <span>Returns & Cancel</span>
            </div>
            <div className="tab-content">
              <Typography variant="body1" color="textSecondary" align="center">
                No returns or cancellations found.
              </Typography>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="card">
            <div className="card-header">
              <span>My Rating & Reviews</span>
            </div>
            <div className="tab-content">
              <Typography variant="body1" color="textSecondary" align="center">
                No reviews found. Rate and review products you've purchased.
              </Typography>
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="card">
            <div className="card-header">
              <span>My Wishlist</span>
            </div>
            <div className="tab-content">
              <Typography variant="body1" color="textSecondary" align="center">
                Your wishlist is empty. Add products to your wishlist while shopping.
              </Typography>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === "payment" && (
          <div className="card">
            <div className="card-header">
              <span>Payment Methods</span>
            </div>
            <div className="tab-content">
              <Typography variant="body1" color="textSecondary" align="center">
                No payment methods added yet. Add your preferred payment options.
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <style>{`
        .profile-container {
          display: flex;
          background: #f9f9f9;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          overflow-y: auto;
          padding-top: 80px;
          flex-direction: column;
        }
        
        .sidebar {
          width: 100%;
          background: #fff;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
        }
        
        .sidebar-toggle {
          display: block;
          position: fixed;
          top: 90px;
          left: 20px;
          z-index: 1001;
          background: #1976d2;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .sidebar-toggle:hover {
          background: #125ea8;
          transform: scale(1.1);
        }
        
        .sidebar.collapsed {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }
        
        .sidebar .user {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          justify-content: center;
        }
        
        .sidebar .user-info {
          margin-left: 10px;
          font-weight: 600;
          font-size: 18px;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          margin: 8px 0;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
          justify-content: center;
        }
        
        .menu-item svg {
          margin-right: 10px;
          font-size: 20px;
        }
        
        .menu-item.active,
        .menu-item:hover {
          background: #1976d2;
          color: #fff;
          transform: translateX(5px);
        }
        
        .content {
          flex: 1;
          padding: 20px;
          width: 100%;
        }
        
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: 0.3s;
          margin-bottom: 20px;
        }
        
        .card:hover {
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        
        .card-header {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 600;
        }
        
        .card-header span {
          text-align: center;
        }
        
        .avatar-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .avatar-edit {
          position: absolute;
          bottom: 0;
          right: 50%;
          transform: translateX(50%);
          background: #1976d2;
          border-radius: 50%;
          padding: 8px;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
        }
        
        .avatar-edit:hover {
          background: #125ea8;
          transform: translateX(50%) scale(1.1);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #333;
        }
        
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        
        .action-buttons .MuiButton-root {
          width: 100%;
        }
        
        .hidden-file-input {
          display: none;
        }
        
        /* Tab Content Styles */
        .tab-content {
          padding: 40px 20px;
          text-align: center;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Tablet and Desktop Styles */
        @media (min-width: 768px) {
          .profile-container {
            flex-direction: row;
          }
          
          .sidebar {
            width: 250px;
            height: calc(100vh - 64px);
            position: sticky;
            top: 64px;
            padding: 20px;
          }
          
          .sidebar-toggle {
            display: none;
          }
          
          .sidebar.collapsed {
            transform: none;
            opacity: 1;
            pointer-events: auto;
          }
          
          .sidebar .user {
            justify-content: flex-start;
          }
          
          .sidebar .user-info {
            font-size: 16px;
          }
          
          .menu-item {
            justify-content: flex-start;
            padding: 10px 15px;
            margin: 6px 0;
            font-size: 15px;
          }
          
          .content {
            padding: 30px;
            width: auto;
          }
          
          .card {
            padding: 25px;
          }
          
          .card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 0;
          }
          
          .card-header span {
            text-align: left;
          }
          
          .action-buttons {
            flex-direction: row;
            gap: 10px;
          }
          
          .action-buttons .MuiButton-root {
            width: auto;
          }
          
          .avatar-edit {
            right: 42%;
            transform: none;
          }
          
          .avatar-edit:hover {
            transform: scale(1.1);
          }
        }
        
        /* Large Desktop Styles */
        @media (min-width: 1200px) {
          .content {
            padding: 40px;
          }
          
          .card {
            padding: 30px;
          }
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 767px) {
          .profile-container {
            padding-top: 70px;
          }
          
          .sidebar {
            padding: 15px;
            width: 250px;
            position: fixed;
            left: 0;
            top: 70px;
            height: calc(100vh - 70px);
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .sidebar:not(.collapsed) {
            transform: translateX(0);
          }
          
          .menu-item {
            padding: 12px 15px;
            margin: 5px 0;
            font-size: 14px;
          }
          
          .content {
            padding: 15px;
            margin-left: 0;
            width: 100%;
          }
          
          .card {
            padding: 15px;
            margin-bottom: 15px;
          }
          
          .form-group {
            margin-bottom: 15px;
          }
          
          .MuiTextField-root {
            font-size: 16px; /* Prevents zoom on iOS */
          }
          
          .MuiButton-root {
            min-height: 44px; /* Better touch target */
            font-size: 16px;
          }
          
          .MuiRadio-root {
            padding: 8px; /* Better touch target for radio buttons */
          }
          
          .avatar-wrapper {
            margin-bottom: 25px;
          }
          
          .avatar-edit {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
           
           /* Extra small mobile devices */
        @media (max-width: 480px) {
          .profile-container {
            padding-top: 60px;
          }
          
          .sidebar-toggle {
            top: 70px;
            left: 15px;
            width: 45px;
            height: 45px;
          }
          
          .sidebar {
            padding: 12px;
            top: 60px;
            height: calc(100vh - 60px);
          }
          
          .content {
            padding: 12px;
          }
          
          .card {
            padding: 12px;
          }
          
          .menu-item {
            padding: 10px 12px;
            font-size: 13px;
          }
          
          .sidebar .user-info {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
