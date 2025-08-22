import React from "react";
import {
  Avatar,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
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
} from "@mui/icons-material";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          display: flex;
          background: #f9f9f9;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          overflow-y: auto;
          padding-top: 80px;
        }
        .sidebar {
  width: 250px;
  background: #fff;
  padding: 20px;
  height: calc(100vh - 64px); /* AppBar ni height minus */
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: sticky;
  top: 64px;
}
        .sidebar:hover {
          box-shadow: 4px 0 12px rgba(0,0,0,0.15);
        }
        .sidebar .user {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        .sidebar .user-info {
          margin-left: 10px;
          font-weight: 600;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          margin: 6px 0;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-size: 15px;
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
          padding: 30px;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: 0.3s;
        }
        .card:hover {
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 600;
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
          right: 42%;
          background: #1976d2;
          border-radius: 50%;
          padding: 6px;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
        }
        .avatar-edit:hover {
          background: #125ea8;
          transform: scale(1.1);
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="user">
          <Avatar src="assets/profile.jpg" sx={{ width: 50, height: 50 }} />
          <div className="user-info">Kazi Mahbub</div>
        </div>
        <div className="menu-item active">
          <Person /> My Accounts
        </div>
        <div className="menu-item">
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
        <div className="menu-item">
          <Lock /> Change Password
        </div>
        <div className="menu-item">
          <ExitToApp /> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="card">
          <div className="card-header">
            <span>Personal Information</span>
            <Button variant="text" size="small">
              Change Profile Information
            </Button>
          </div>

          <div className="avatar-wrapper">
            <Avatar
              src="assets/profile.jpg"
              sx={{ width: 100, height: 100 }}
            />
            <div className="avatar-edit">
              <Edit fontSize="small" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Name</div>
            <TextField fullWidth size="small" value="Kazi Mahbub" />
          </div>

          <div className="form-group">
            <div className="form-label">Date Of Birth</div>
            <TextField
              fullWidth
              size="small"
              value="20/01/2022"
              InputProps={{
                endAdornment: <CalendarToday fontSize="small" />,
              }}
            />
          </div>

          <div className="form-group">
            <div className="form-label">Gender</div>
            <RadioGroup row value="male">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </div>

          <div className="form-group">
            <div className="form-label">Phone Number</div>
            <TextField fullWidth size="small" value="+90-123456789" />
          </div>

          <div className="form-group">
            <div className="form-label">Email</div>
            <TextField fullWidth size="small" value="abcd1234@email.com" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


// import React from "react";
// import {
//   Avatar,
//   Button,
//   TextField,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import {
//   Person,
//   ShoppingBag,
//   Replay,
//   Star,
//   Favorite,
//   Payment,
//   Lock,
//   ExitToApp,
//   Edit,
//   CalendarToday,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";  // 👈 Add this

// const ProfilePage = () => {
//   const navigate = useNavigate(); // 👈 Initialize navigation

//   const handleLogout = () => {
//   // Local storage ma thi user/auth info clear karo
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
//   sessionStorage.clear();

//   // Home page redirect
//   navigate("/");   // 👈 aa home route par mokli dese
// };

//   return (
//     <div className="profile-container">
//       <style>{`
//         .profile-container {
//            display: flex;
//           background: #f9f9f9;
//            min-height: 100vh;
//            font-family: 'Segoe UI', sans-serif;
//            overflow-y: auto;
//           padding-top: 80px;
//          }
//         .sidebar {
//           width: 250px;
//           background: #fff;
//           padding: 20px;
//           height: calc(100vh - 64px);
//           box-shadow: 2px 0 8px rgba(0,0,0,0.1);
//           transition: all 0.3s ease;
//           position: sticky;
//           top: 64px;
//         }
//         .sidebar:hover {
//           box-shadow: 4px 0 12px rgba(0,0,0,0.15);
//         }
//         .sidebar .user {
//           display: flex;
//           align-items: center;
//           margin-bottom: 30px;
//         }
//         .sidebar .user-info {
//           margin-left: 10px;
//           font-weight: 600;
//         }
//         .menu-item {
//           display: flex;
//           align-items: center;
//           padding: 10px 15px;
//           margin: 6px 0;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: 0.3s;
//           font-size: 15px;
//         }
//         .menu-item svg {
//           margin-right: 10px;
//           font-size: 20px;
//         }
//         .menu-item.active,
//         .menu-item:hover {
//           background: #1976d2;
//           color: #fff;
//           transform: translateX(5px);
//         }
//         .content {
//           flex: 1;
//           padding: 30px;
//         }
//         .card {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           transition: 0.3s;
//         }
//         .card:hover {
//           box-shadow: 0 6px 16px rgba(0,0,0,0.12);
//         }
//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           font-size: 18px;
//           font-weight: 600;
//         }
//         .avatar-wrapper {
//           position: relative;
//           display: flex;
//           justify-content: center;
//           margin-bottom: 20px;
//         }
//         .avatar-edit {
//           position: absolute;
//           bottom: 0;
//           right: 42%;
//           background: #1976d2;
//           border-radius: 50%;
//           padding: 6px;
//           color: #fff;
//           cursor: pointer;
//           transition: 0.3s;
//         }
//         .avatar-edit:hover {
//           background: #125ea8;
//           transform: scale(1.1);
//         }
//         .form-group {
//           margin-bottom: 15px;
//         }
//         .form-label {
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 6px;
//         }
//       `}</style>

//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="user">
//           <Avatar src="assets/profile.jpg" sx={{ width: 50, height: 50 }} />
//           <div className="user-info">Kazi Mahbub</div>
//         </div>
//         <div className="menu-item active">
//           <Person /> My Accounts
//         </div>
//         <div className="menu-item">
//           <ShoppingBag /> My Orders
//         </div>
//         <div className="menu-item">
//           <Replay /> Returns & Cancel
//         </div>
//         <div className="menu-item">
//           <Star /> My Rating & Reviews
//         </div>
//         <div className="menu-item">
//           <Favorite /> My Wishlist
//         </div>
//         <div className="menu-item">
//           <Payment /> Payment
//         </div>
//         <div className="menu-item">
//           <Lock /> Change Password
//         </div>
        
//         {/* Logout with click event */}
//         <div className="menu-item" onClick={handleLogout}>
//           <ExitToApp /> Logout
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="content">
//         <div className="card">
//           <div className="card-header">
//             <span>Personal Information</span>
//             <Button variant="text" size="small">
//               Change Profile Information
//             </Button>
//           </div>

//           <div className="avatar-wrapper">
//             <Avatar src="assets/profile.jpg" sx={{ width: 100, height: 100 }} />
//             <div className="avatar-edit">
//               <Edit fontSize="small" />
//             </div>
//           </div>

//           <div className="form-group">
//             <div className="form-label">Name</div>
//             <TextField fullWidth size="small" value="Kazi Mahbub" />
//           </div>

//           <div className="form-group">
//             <div className="form-label">Date Of Birth</div>
//             <TextField
//               fullWidth
//               size="small"
//               value="20/01/2022"
//               InputProps={{
//                 endAdornment: <CalendarToday fontSize="small" />,
//               }}
//             />
//           </div>

//           <div className="form-group">
//             <div className="form-label">Gender</div>
//             <RadioGroup row value="male">
//               <FormControlLabel value="male" control={<Radio />} label="Male" />
//               <FormControlLabel value="female" control={<Radio />} label="Female" />
//             </RadioGroup>
//           </div>

//           <div className="form-group">
//             <div className="form-label">Phone Number</div>
//             <TextField fullWidth size="small" value="+90-123456789" />
//           </div>

//           <div className="form-group">
//             <div className="form-label">Email</div>
//             <TextField fullWidth size="small" value="abcd1234@email.com" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
