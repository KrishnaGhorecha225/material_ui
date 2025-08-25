import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Chip,
} from "@mui/material";
import {
  Person,
  ShoppingBag,
  Lock,
  ExitToApp,
  Menu,
  ArrowBack,
  Replay,
  Star,
  Favorite,
  Payment,
} from "@mui/icons-material";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });
  const [userOrders, setUserOrders] = useState([]);

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
          email: userFromArray.email || ""
        });
        setCurrentUser(userFromArray);
      } else {
        // Fallback to currentUser data
        setUserData({
          name: currentUser.name || "",
          email: currentUser.email || ""
        });
        setCurrentUser(currentUser);
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Function to load user orders dynamically
  const loadUserOrders = () => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const filteredOrders = orders.filter(order => order.userEmail === userData.email);
      setUserOrders(filteredOrders);
      
      // Debug logging
      console.log("All orders in localStorage:", orders);
      console.log("Current user email:", userData.email);
      console.log("Filtered user orders:", filteredOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setUserOrders([]);
    }
  };

  // Load orders when userData changes
  useEffect(() => {
    if (userData.email) {
      loadUserOrders();
    }
  }, [userData.email]);

  // Function to create demo orders for testing
  const createDemoOrders = () => {
    try {
      const demoOrders = [
        {
          orderId: "ORD-123456",
          userEmail: userData.email,
          userName: userData.name,
          orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          status: "Delivered",
          items: [
            {
              id: 1,
              title: "Nike Air Max 270",
              price: 129.99,
              quantity: 1
            },
            {
              id: 2,
              title: "Adidas Ultraboost 22",
              price: 189.99,
              quantity: 2
            }
          ],
          subtotal: 509.97,
          shipping: 9.99,
          discount: 25.00,
          total: 494.96,
          shippingAddress: {
            firstName: userData.name?.split(' ')[0] || "John",
            lastName: userData.name?.split(' ')[1] || "Doe",
            address1: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001"
          },
          paymentMethod: "Credit Card"
        },
        {
          orderId: "ORD-789012",
          userEmail: userData.email,
          userName: userData.name,
          orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          status: "Shipped",
          items: [
            {
              id: 3,
              title: "Apple iPhone 15 Pro",
              price: 999.99,
              quantity: 1
            }
          ],
          subtotal: 999.99,
          shipping: 0.00,
          discount: 0.00,
          total: 999.99,
          shippingAddress: {
            firstName: userData.name?.split(' ')[0] || "John",
            lastName: userData.name?.split(' ')[1] || "Doe",
            address1: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001"
          },
          paymentMethod: "Credit Card"
        },
        {
          orderId: "ORD-345678",
          userEmail: userData.email,
          userName: userData.name,
          orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          status: "Processing",
          items: [
            {
              id: 4,
              title: "Samsung Galaxy S24",
              price: 799.99,
              quantity: 1
            },
            {
              id: 5,
              title: "Samsung Galaxy Buds2 Pro",
              price: 229.99,
              quantity: 1
            }
          ],
          subtotal: 1029.98,
          shipping: 9.99,
          discount: 50.00,
          total: 989.97,
          shippingAddress: {
            firstName: userData.name?.split(' ')[0] || "John",
            lastName: userData.name?.split(' ')[1] || "Doe",
            address1: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zip: "90210"
          },
          paymentMethod: "PayPal"
        }
      ];

      // Save demo orders to localStorage
      localStorage.setItem("orders", JSON.stringify(demoOrders));
      
      // Show success message
      alert("Demo orders created successfully!");
      
      // Reload orders dynamically
      loadUserOrders();
      
    } catch (error) {
      console.error("Error creating demo orders:", error);
      alert("Error creating demo orders. Please try again.");
    }
  };

  // Function to check localStorage orders for debugging
  const checkLocalStorageOrders = () => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const userOrders = orders.filter(order => order.userEmail === userData.email);
      
      console.log("All orders in localStorage:", orders);
      console.log("User orders:", userOrders);
      console.log("Current user email:", userData.email);
      
      alert(`Found ${orders.length} total orders, ${userOrders.length} for current user. Check console for details.`);
      
    } catch (error) {
      console.error("Error checking localStorage orders:", error);
      alert("Error checking localStorage orders.");
    }
  };

  // Function to create a test order for current user
  const createTestOrder = () => {
    try {
      const testOrder = {
        orderId: `TEST-${Date.now().toString().slice(-6)}`,
        userEmail: userData.email,
        userName: userData.name,
        orderDate: new Date().toISOString(),
        status: "Processing",
        items: [
          {
            id: 999,
            title: "Test Product",
            price: 99.99,
            quantity: 1
          }
        ],
        subtotal: 99.99,
        shipping: 9.99,
        discount: 0.00,
        total: 109.98,
        shippingAddress: {
          firstName: userData.name?.split(' ')[0] || "Test",
          lastName: userData.name?.split(' ')[1] || "User",
          address1: "Test Address",
          city: "Test City",
          state: "Test State",
          zip: "12345"
        },
        paymentMethod: "Test Payment"
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(testOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      
      alert("Test order created successfully!");
      
      // Reload orders dynamically
      loadUserOrders();
      
    } catch (error) {
      console.error("Error creating test order:", error);
      alert("Error creating test order.");
    }
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
          <div className="user-info">{userData.name || "User"}</div>
        </div>
        <div className="menu-item" onClick={() => navigate("/profile")}>
          <Person /> My Profile
        </div>
        <div className="menu-item active">
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
        <div className="menu-item" onClick={() => navigate("/change-password")}>
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
            <div className="header-left">
              {/* <Button 
                onClick={() => navigate("/profile")} 
                startIcon={<ArrowBack />} 
                className="back-button"
              >
                Back to Profile
              </Button> */}
              <span>My Orders</span>
            </div>
            <div className="header-actions">
              <Button 
                variant="outlined" 
                size="small" 
                onClick={loadUserOrders}
                sx={{ fontSize: '12px', padding: '4px 8px', mr: 1 }}
              >
                Refresh
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={createTestOrder}
                sx={{ fontSize: '12px', padding: '4px 8px', mr: 1 }}
              >
                Test Order
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={checkLocalStorageOrders}
                sx={{ fontSize: '12px', padding: '4px 8px', mr: 1 }}
              >
                Debug Orders
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={createDemoOrders}
                sx={{ fontSize: '12px', padding: '4px 8px' }}
              >
                Add Demo Orders
              </Button>
            </div>
          </div>
          <div className="orders-content">
            {userOrders.length === 0 ? (
              <div className="empty-orders">
                <ShoppingBag sx={{ fontSize: 80, color: '#e0e0e0', marginBottom: 20 }} />
                <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
                  No Order History Available
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 2 }}>
                  You haven't placed any orders yet.
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                  Start shopping to build your order history!
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate("/")}
                  sx={{ mt: 2 }}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="orders-table">
                <div className="table-header">
                  <div className="header-cell product">Product</div>
                  <div className="header-cell order-number">Order Number</div>
                  <div className="header-cell total">Total</div>
                  <div className="header-cell status">Status</div>
                  <div className="header-cell attributes">Attributes</div>
                  <div className="header-cell action">Action</div>
                </div>
                
                {userOrders.map((order, orderIndex) => (
                  order.items.map((item, itemIndex) => (
                    <div key={`${order.orderId}-${itemIndex}`} className="table-row">
                      <div className="table-cell product">
                        <div className="product-info">
                          <div className="product-title">{item.title}</div>
                          <div className="product-description">
                            {item.description || `Product ID: ${item.id}`}
                          </div>
                        </div>
                      </div>
                      <div className="table-cell order-number">
                        #{order.orderId}
                      </div>
                      <div className="table-cell total">
                        ${order.total}
                      </div>
                      <div className="table-cell status">
                        <Chip 
                          label={order.status} 
                          color={order.status === 'Delivered' ? 'success' : 
                                 order.status === 'Shipped' ? 'primary' : 
                                 order.status === 'Processing' ? 'warning' : 'default'}
                          size="small"
                          sx={{ 
                            backgroundColor: order.status === 'Delivered' ? '#e8f5e8' : 
                                          order.status === 'Shipped' ? '#e3f2fd' : 
                                          order.status === 'Processing' ? '#fff3e0' : '#f5f5f5',
                            color: order.status === 'Delivered' ? '#2e7d32' : 
                                  order.status === 'Shipped' ? '#1976d2' : 
                                  order.status === 'Processing' ? '#f57c00' : '#666'
                          }}
                        />
                      </div>
                      <div className="table-cell attributes">
                        <div className="attribute-item">
                          <span className="attribute-label">Price:</span>
                          <span className="attribute-value">${item.price}</span>
                        </div>
                        <div className="attribute-item">
                          <span className="attribute-label">Quantity:</span>
                          <span className="attribute-value">{item.quantity}</span>
                        </div>
                        <div className="see-all-link">See all</div>
                      </div>
                      <div className="table-cell action">
                        <Button 
                          variant="text" 
                          size="small"
                          sx={{ minWidth: 'auto', padding: '4px' }}
                        >
                          ⋮
                        </Button>
                      </div>
                    </div>
                  ))
                ))}
              </div>
            )}
          </div>
        </div>
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
        
        .header-left {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }
        
        .back-button {
          align-self: flex-start;
          margin-bottom: 10px;
        }
        
        .card-header span {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        
        /* Order History Styles */
        .orders-content {
          padding: 20px 0;
        }
        
        .empty-orders {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        
        .orders-table {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr 1fr;
          gap: 15px;
          padding: 20px;
          background-color: #f8f9fa;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #e0e0e0;
          font-size: 16px;
        }
        
        .header-cell {
          text-align: left;
          padding: 10px;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 2fr 1fr;
          gap: 15px;
          padding: 20px;
          background-color: #fff;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
          transition: background-color 0.2s ease;
        }
        
        .table-row:hover {
          background-color: #f8f9fa;
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-cell {
          text-align: left;
          padding: 10px;
        }
        
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .product-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 0;
        }
        
        .product-description {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        
        .attribute-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          align-items: center;
        }
        
        .attribute-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .attribute-value {
          font-size: 14px;
          font-weight: 600;
          color: #1976d2;
        }
        
        .see-all-link {
          font-size: 14px;
          color: #1976d2;
          text-decoration: underline;
          cursor: pointer;
          margin-top: 8px;
          font-weight: 500;
        }
        
        .see-all-link:hover {
          color: #125ea8;
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
          
          .header-left {
            flex-direction: row;
            align-items: center;
            gap: 20px;
          }
          
          .back-button {
            margin-bottom: 0;
          }
          
          .card-header span {
            text-align: left;
            font-size: 28px;
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
          
          /* Order History Mobile Styles */
          .orders-table {
            gap: 0;
            border-radius: 8px;
            margin: 0 -15px;
            border-left: none;
            border-right: none;
          }
          
          .table-header {
            grid-template-columns: 2fr 1fr 1fr 1fr 2fr 1fr;
            gap: 8px;
            padding: 15px;
            font-size: 14px;
          }
          
          .header-cell {
            padding: 8px 4px;
            font-size: 12px;
          }
          
          .table-row {
            grid-template-columns: 2fr 1fr 1fr 1fr 2fr 1fr;
            gap: 8px;
            padding: 15px;
            font-size: 14px;
          }
          
          .table-cell {
            padding: 8px 4px;
          }
          
          .product-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .product-title {
            font-size: 14px;
            margin-bottom: 0;
          }
          
          .product-description {
            font-size: 12px;
            line-height: 1.3;
          }
          
          .attribute-item {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 3px;
          }
          
          .attribute-label {
            font-size: 12px;
            color: #666;
          }
          
          .attribute-value {
            font-size: 12px;
            font-weight: 500;
            color: #1976d2;
          }
          
          .see-all-link {
            font-size: 12px;
            margin-top: 3px;
          }
          
          .order-actions {
            flex-direction: column;
            gap: 8px;
          }
          
          .order-actions .MuiButton-root {
            width: 100%;
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

export default OrderHistoryPage;
