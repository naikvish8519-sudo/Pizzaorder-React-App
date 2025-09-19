// 

// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { useUser } from "./UserContext"; // ✅ user context (with login/logout)

// const Navbar = ({ cartItems = [], updateCartItem, removeItem }) => {
//   const history = useHistory();
//   const { user, logout } = useUser();

//   const [isPreviewVisible, setIsPreviewVisible] = useState(false);

//   const handleLogout = () => {
//     logout();
//     history.push("/login");
//   };

//   const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container">
//         {/* Brand */}
//         <Link to={user ? "/products" : "/login"} className="navbar-brand">
//           Pizza Place
//         </Link>

//         {/* Toggler */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Nav items */}
//         <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link to="/products" className="nav-link">Order Now</Link>
//             </li>

//             {!user && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/login" className="nav-link">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/register" className="nav-link">Register</Link>
//                 </li>
//               </>
//             )}

//             {user && (
//               <li className="nav-item">
//                 <span className="nav-link">Welcome, {user.username || user.fullName}</span>
//               </li>
//             )}
//           </ul>

//           {/* Right side: Cart + Logout */}
//           <ul className="navbar-nav ms-auto">
//             {/* Cart dropdown */}
//             <li
//               className="nav-item dropdown"
//               onMouseEnter={() => setIsPreviewVisible(true)}
//               onMouseLeave={() => setIsPreviewVisible(false)}
//             >
//               <Link to="/cart" className="nav-link dropdown-toggle" style={{ position: "relative", marginRight: "20px" }}>
//                 <i className="fas fa-shopping-cart"></i> Cart ({itemCount})
//               </Link>

//               <div className={`dropdown-menu ${isPreviewVisible ? "show" : ""}`}>
//                 {cartItems.length > 0 ? (
//                   cartItems.map((item, idx) => (
//                     <div key={idx} className="dropdown-item cart-item-preview">
//                       <strong>{item.size}</strong> -{" "}
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) =>
//                           updateCartItem({ ...item, quantity: parseInt(e.target.value, 10) })
//                         }
//                         min="1"
//                         className="form-control form-control-sm d-inline-block"
//                         style={{ width: "50px" }}
//                       />
//                       <i
//                         onClick={() => updateCartItem(item)}
//                         className="fas fa-sync ms-2"
//                         style={{ cursor: "pointer" }}
//                         title="Update"
//                       ></i>
//                       <i
//                         onClick={() => removeItem(item)}
//                         className="fas fa-trash-alt ms-2"
//                         style={{ cursor: "pointer" }}
//                         title="Remove"
//                       ></i>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="dropdown-item">Your cart is empty.</div>
//                 )}

//                 <div className="dropdown-divider"></div>
//                 <Link to="/cart" className="dropdown-item">View Cart</Link>
//               </div>
//             </li>

//             {/* Logout */}
//             {user && (
//               <li className="nav-item">
//                 <button className="btn btn-link nav-link" onClick={handleLogout} style={{ padding: 10 }}>
//                   Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "./UserContext"; // user context
import { useCart } from "./CartContext"; // ✅ cart context
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  const history = useHistory();
  const { user, logout } = useUser();
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // ✅ pull from context

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  // ✅ Count total items
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Brand */}
        <Link to={user ? "/products" : "/login"} className="navbar-brand">
          Pizza Place
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Order Now
              </Link>
            </li>
           

            {!user && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item">
                <span className="nav-link">
                  Welcome, {user.personName || user.fullName}
                </span>
              </li>
            )}
          </ul>

          {/* Right side: Cart + Logout */}
          <ul className="navbar-nav ms-auto">
            {/* Cart dropdown */}
            {
<li
  className="nav-item dropdown"
  onMouseEnter={() => setIsPreviewVisible(true)}
  onMouseLeave={() => setIsPreviewVisible(false)}
>
  <Link
    to="/cart"
    className="nav-link dropdown-toggle"
    style={{ position: "relative", marginRight: "20px" }}
  >
    <i className="fas fa-shopping-cart"></i> Cart ({itemCount})
  </Link>

  <div
    className={`dropdown-menu ${isPreviewVisible ? "show" : ""}`}
    style={{ minWidth: "260px", padding: "10px" }}
  >
    {cartItems.length > 0 ? (
      cartItems.map((item, idx) => (
        <div
          key={idx}
          className="dropdown-item cart-item-preview d-flex justify-content-between align-items-start"
          style={{ whiteSpace: "normal" }}
        >
          <div style={{ flex: 1 }}>
            {/* ✅ Pizza size + qty */}
            <strong>{item.size} Pizza</strong> – {item.quantity} pcs
            <br />

            {/* ✅ Show toppings */}
            <small>
              {item.toppings && item.toppings.length > 0
                ? "Toppings: " + item.toppings.join(", ")
                : "No toppings"}
            </small>
            <br />

            {/* ✅ Quantity input */}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(idx, parseInt(e.target.value, 10))
              }
              min="1"
              className="form-control form-control-sm d-inline-block mt-1"
              style={{ width: "60px" }}
            />
          </div>

          {/* ✅ Always show delete icon */}
          <i
            onClick={() => removeFromCart(idx)}
            className="fas fa-trash-alt text-danger ms-2"
            style={{ cursor: "pointer", fontSize: "16px" }}
            title="Remove"
          ></i>
        </div>
      ))
    ) : (
      <div className="dropdown-item">Your cart is empty.</div>
    )}

    <div className="dropdown-divider"></div>
    <Link to="/cart" className="dropdown-item">
      View Cart
    </Link>
  </div>
</li>


      }

            {/* Logout */}
            {user && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                  style={{ padding: 10 }}
                >
                  Logout
                </button>
                
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


