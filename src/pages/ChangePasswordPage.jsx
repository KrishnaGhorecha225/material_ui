import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  Snackbar,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Person,
  ShoppingBag,
  Replay,
  Star,
  Favorite,
  Payment,
  ExitToApp,
  Menu,
} from "@mui/icons-material";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCurrentUser(currentUser);
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

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    setPasswordError(""); // Clear error when user types
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChangePassword = () => {
    // Validation
    if (!passwordData.currentPassword.trim()) {
      setPasswordError("Current password is required");
      return;
    }
    
    if (!passwordData.newPassword.trim()) {
      setPasswordError("New password is required");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Verify current password
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (!currentUser || !currentUser.email) {
      setPasswordError("User session not found");
      return;
    }

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex === -1) {
      setPasswordError("User not found");
      return;
    }

    if (users[userIndex].password !== passwordData.currentPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }

    // Update password
    users[userIndex].password = passwordData.newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    
    // Update currentUser in localStorage
    const updatedCurrentUser = { ...currentUser };
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    
    // Show success message
    setShowSuccess(true);
    
    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    // Clear password visibility
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    
    // Clear error
    setPasswordError("");
  };

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
          <div className="user-info">{currentUser?.name || "User"}</div>
        </div>
        <div className="menu-item" onClick={() => navigate("/profile")}>
          <Person /> My Profile
        </div>
        <div className="menu-item" onClick={() => navigate("/orders")}>
          <ShoppingBag /> My Orders
        </div>
        <div className="menu-item">
          <Replay /> Returns & Cancel
        </div>
        <div className="menu-item">
          <Star /> My Rating & Reviews
        </div>
        <div className="menu-item">
          <Favorite /> My Wishlist
        </div>
        <div className="menu-item">
          <Payment /> Payment
        </div>
        <div className="menu-item active">
          <Lock /> Change Password
        </div>
        <div className="menu-item" onClick={handleLogout}>
          <ExitToApp /> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="card">
          <div className="card-header">
            <span>Change Password</span>
          </div>

          {/* Password Form */}
          <div className="password-form">
            {passwordError && (
              <Alert severity="error" className="password-error">
                {passwordError}
              </Alert>
            )}
            
            <div className="password-field">
              <div className="field-label">Current Password</div>
              <TextField
                fullWidth
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                variant="outlined"
                size="small"
                placeholder="Enter your current password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('current')}
                        edge="end"
                      >
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            
            <div className="password-field">
              <div className="field-label">New Password</div>
              <TextField
                fullWidth
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                variant="outlined"
                size="small"
                placeholder="Enter new password (min 6 characters)"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                                               onClick={() => togglePasswordVisibility('new')}
                       edge="end"
                     >
                       {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            
            <div className="password-field">
              <div className="field-label">Confirm New Password</div>
              <TextField
                fullWidth
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                variant="outlined"
                size="small"
                placeholder="Confirm your new password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('confirm')}
                        edge="end"
                      >
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            
            <div className="password-requirements">
              <Typography variant="body2" color="textSecondary">
                Password requirements:
              </Typography>
              <ul>
                <li>At least 6 characters long</li>
                <li>Make sure new password matches confirmation</li>
              </ul>
            </div>
            
            <div className="password-actions">
              <Button 
                onClick={handleChangePassword} 
                variant="contained" 
                color="primary"
                className="change-btn"
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                fullWidth
                size="large"
              >
                <Lock sx={{ mr: 1 }} />
                Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Password changed successfully! You can now login with your new password.
          </Alert>
        </Snackbar>
      </div>

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
          justify-content: center;
          margin-bottom: 30px;
        }
        
        .sidebar .user-info {
          font-weight: 600;
          font-size: 18px;
          text-align: center;
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
        
        .user-card {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          max-width: 400px;
          text-align: center;
          border: 1px solid #e9ecef;
        }
        
        .user-info h3 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 20px;
          font-weight: 600;
        }
        
        .user-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        
        .password-form {
          margin-top: 20px;
        }
        
        .password-error {
          margin-bottom: 20px;
        }
        
        .password-field {
          margin-bottom: 20px;
        }
        
        .field-label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #333;
          display: block;
        }
        
        .password-requirements {
          margin-top: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #1976d2;
        }
        
        .password-requirements ul {
          margin: 10px 0 0 0;
          padding-left: 20px;
        }
        
        .password-requirements li {
          margin-bottom: 5px;
          color: #666;
          font-size: 13px;
        }
        
        .password-actions {
          margin-top: 25px;
        }
        
        .change-btn {
          background: linear-gradient(45deg, #1976d2, #42a5f5);
          box-shadow: 0 4px 15px rgba(25,118,210,0.4);
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 16px;
          text-transform: none;
        }
        
        .change-btn:hover {
          background: linear-gradient(45deg, #1565c0, #1976d2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(25,118,210,0.5);
        }
        
        .change-btn:disabled {
          background: #ccc;
          transform: none;
          box-shadow: none;
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
          
          .MuiTextField-root {
            font-size: 16px;
          }
          
          .MuiButton-root {
            min-height: 44px;
          }
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

export default ChangePasswordPage;
