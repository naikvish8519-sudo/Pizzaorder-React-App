// import React, { useState } from "react";
// import { useCart } from "./CartContext";
// import "./Cart.css";

// const CartComponent = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
//   const [orderHistory, setOrderHistory] = useState([]);
//   const currentUser = { username: "Vishwanath" };

//   const calculateTotal = () =>
//     cartItems.reduce((acc, item) => acc + item.price, 0);

//   const placeOrder = () => {
//     const newOrders = cartItems.map((item) => ({
//       ...item,
//       orderDate: new Date().toISOString(),
//     }));
//     setOrderHistory([...orderHistory, ...newOrders]);
//     clearCart();
//   };

//   return (
//     <div className="cart-container">
//       <h2>My Selections</h2>
//       {currentUser && <h4>{currentUser.username}, Selections</h4>}

//       {cartItems.map((item, i) => (
//         <div key={i} className="cart-item">
//           <h5>
//             {item.size} Pizza - Quantity:
//             <input
//               type="number"
//               min="1"
//               value={item.quantity}
//               onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
//               style={{ width: "50px", marginLeft: "10px" }}
//             />
//           </h5>
//           <p>
//             Toppings:{" "}
//             {item.toppings.length > 0
//               ? item.toppings.join(", ")
//               : "No toppings selected."}
//           </p>
//           <p>Price: ${item.price.toFixed(2)}</p>
//           <button onClick={() => removeFromCart(i)} className="btn btn-danger">
//             Remove
//           </button>
//         </div>
//       ))}

//       <h4 className="total-price">Total Price: ${calculateTotal().toFixed(2)}</h4>
//      <div style={{ display: "flex", gap: "10px" }}>
//   <button onClick={clearCart} className="btn btn-warning">
//     Clear Cart
//   </button>
//   {cartItems.length > 0 && (
//     <button onClick={placeOrder} className="btn btn-success">
//       Place Order
//     </button>
//   )}
// </div>

//       <hr />

//       <h3>Order History</h3>
//       {orderHistory.length > 0 ? (
//         orderHistory.map((order, i) => (
//           <div key={i} className="order-item">
//             <h4>Pizza Size: {order.size}</h4>
//             <p>Quantity: {order.quantity}</p>
//             <p>Toppings: {order.toppings.join(", ")}</p>
//             <p>Price: ${order.price.toFixed(2)}</p>
//             <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default CartComponent;

// import React, { useEffect, useState } from "react";
// import { useCart } from "./CartContext";
// import { useUser } from "./UserContext";
// import "./Cart.css";

// const CartComponent = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
//   const { user } = useUser();

//   const [dbCartItems, setDbCartItems] = useState([]);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Reusable fetch function
//   const fetchOrders = async () => {
//     if (!user?.userID) return;
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `http://localhost:5043/api/PizzaOrders/search/userid/${user.userID}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch orders");
//       const data = await res.json();

//       setDbCartItems(data.filter((o) => !o.isOrdered));
//       setOrderHistory(data.filter((o) => o.isOrdered));
//       console.log("OrderHistory after filter:", data.filter((o) => o.isOrdered));
      
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Load orders when user navigates to Cart page
//   useEffect(() => {
    
//     fetchOrders();
//   }, [user]);

//   // ✅ Place order → POST API → reload history
//   const placeOrder = async () => {
//     if (!user?.userID) {
//       alert("You must be logged in to place an order.");
//       return;
//     }

//     try {
//       for (const item of cartItems) {
//         const payload = {
//           userID: user.userID,
//           pizzaSize: item.size,
//           toppings: item.toppings,
//           unitPrice: item.price / item.quantity,
//           quantity: item.quantity,
//           isOrdered: true
//         };

//         const res = await fetch("http://localhost:5043/api/PizzaOrders", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         });

//         if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
//       }

//       alert("Order placed successfully!");
//       clearCart(); // ✅ clear local cart
//       await fetchOrders(); // ✅ reload DB cart + order history
//     } catch (err) {
//       console.error("Error placing order:", err);
//       alert("Something went wrong while placing the order.");
//     }
//   };

//   // const calculateTotal = () => {
//   //   return [...cartItems, ...dbCartItems].reduce(
//   //     (acc, item) =>
//   //       acc + (item.totalPrice || item.unitPrice * item.quantity),
//   //     0
//   //   );
//   // };

//   const calculateTotal = () => {
//   return [...cartItems, ...dbCartItems].reduce((acc, item) => {
//     const qty = Number(item.quantity) || 0;
//     const unit = Number(item.unitPrice) || 0;
//     const total = item.totalPrice ?? (unit * qty); // use totalPrice if it's defined, else fallback
//     return acc + Number(total);
//   }, 0);
// };


//   if (loading) {
//     return (
//       <div className="cart-container">
//         <h3>Loading your cart...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h2>My Selections</h2>
//       {user && <h4>{user.username || user.email}, Selections</h4>}

//       {/* ✅ Local cart items */}
//       {cartItems.map((item, i) => (
//         <div key={`local-${i}`} className="cart-item">
//           <h5>
//             {item.size} Pizza - Quantity:
//             <input
//               type="number"
//               min="1"
//               value={item.quantity}
//               onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
//               style={{ width: "50px", marginLeft: "10px" }}
//             />
//           </h5>
//           <p>
//             Toppings:{" "}
//             {item.toppings.length > 0
//               ? item.toppings.join(", ")
//               : "No toppings selected."}
//           </p>
//           <p>Price: ${item.price.toFixed(2)}</p>
//           <button onClick={() => removeFromCart(i)} className="btn btn-danger">
//             Remove
//           </button>
//         </div>
//       ))}

//       {/* ✅ DB cart items */}
//       {dbCartItems.length > 0 && <h3>Saved Cart Items</h3>}
//       {dbCartItems.map((item) => (
//         <div key={item.orderID} className="cart-item">
//           <h5>
//             {item.pizzaSize} Pizza - Quantity: {item.quantity}
//           </h5>
//           <p>
//             Toppings:{" "}
//             {item.toppings?.length > 0
//               ? item.toppings.join(", ")
//               : "No toppings selected."}
//           </p>
//           <p>Price: ${item.totalPrice.toFixed(2)}</p>
//         </div>
//       ))}

//       <h4 className="total-price">
//         Total Price: ${calculateTotal().toFixed(2)}
//       </h4>

//       <div style={{ display: "flex", gap: "10px" }}>
//         <button onClick={clearCart} className="btn btn-warning">
//           Clear Cart
//         </button>
//         {cartItems.length > 0 && (
//           <button onClick={placeOrder} className="btn btn-success">
//             Place Order
//           </button>
//         )}
//       </div>

//       <hr />

//       {/* ✅ Order history */}
//       <h3>Order History</h3>
//       {orderHistory.length > 0 ? (
//         orderHistory.map((order) => (
//           <div key={order.orderID} className="order-item">
//             <h4>Pizza Size: {order.pizzaSize}</h4>
//             <p>Quantity: {order.quantity}</p>
//             <p>
//               Toppings:{" "}
//               {order.toppings?.length > 0
//                 ? order.toppings.join(", ")
//                 : "No toppings selected."}
//             </p>
//             <p>Price: ${order.totalPrice.toFixed(2)}</p>
//             <p>
//   Order Date:{" "}
//   {order.orderDate && order.orderDate !== "0001-01-01T00:00:00"
//     ? new Date(order.orderDate).toLocaleString()
//     : "Not yet placed"}
// </p>
//           </div>
//         ))
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default CartComponent;
















// //-----------perfect version below----------------
// import React, { useEffect, useState } from "react";
// import { useCart } from "./CartContext";
// import { useUser } from "./UserContext";
// import "./Cart.css";

// const CartComponent = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
//   const { user } = useUser();

//   const [dbCartItems, setDbCartItems] = useState([]);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Reusable fetch function
//   const fetchOrders = async () => {
//     if (!user?.userID) return;
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `http://localhost:5043/api/PizzaOrders/search/userid/${user.userID}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch orders");
//       const data = await res.json();

//       setDbCartItems(data.filter((o) => !o.isOrdered));
//       setOrderHistory(data.filter((o) => o.isOrdered));
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Load orders when user navigates to Cart page
//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   // ✅ Save one local cart item into DB (isOrdered: false)
//   const saveCartItem = async (item, index) => {
//     if (!user?.userID) {
//       alert("You must be logged in to save to cart.");
//       return;
//     }

//     try {
//       const payload = {
//         userID: user.userID,
//         pizzaSize: item.size,
//         toppings: item.toppings,
//         unitPrice: item.price / item.quantity,
//         quantity: item.quantity,
//         isOrdered: false, // still in cart
//       };

//       const res = await fetch("http://localhost:5043/api/PizzaOrders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error(`Failed to save cart item: ${res.status}`);

//       // remove from local cart after saving
//       removeFromCart(index);
//       await fetchOrders();
//     } catch (err) {
//       console.error("Error saving cart item:", err);
//       alert("Something went wrong while saving to cart.");
//     }
//   };

//   // ✅ Place ALL local orders → POST API
//   const placeAllOrders = async () => {
//     if (!user?.userID) {
//       alert("You must be logged in to place an order.");
//       return;
//     }

//     try {
//       for (const item of cartItems) {
//         const payload = {
//           userID: user.userID,
//           pizzaSize: item.size,
//           toppings: item.toppings,
//           unitPrice: item.price / item.quantity,
//           quantity: item.quantity,
//           isOrdered: true,
//         };

//         const res = await fetch("http://localhost:5043/api/PizzaOrders", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
//       }

//       alert("All orders placed successfully!");
//       clearCart();
//       await fetchOrders();
//     } catch (err) {
//       console.error("Error placing orders:", err);
//       alert("Something went wrong while placing orders.");
//     }
//   };

//   // ✅ Place one saved cart item
//   const placeDbCartItem = async (orderID) => {
//     try {
//       const res = await fetch(`http://localhost:5043/api/PizzaOrders/${orderID}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isOrdered: true }),
//       });

//       if (!res.ok) throw new Error("Failed to place saved cart item");

//       await fetchOrders();
//     } catch (err) {
//       console.error("Error placing saved item:", err);
//     }
//   };

//   // ✅ Remove one saved cart item
//   const removeDbCartItem = async (orderID) => {
//     try {
//       const res = await fetch(`http://localhost:5043/api/PizzaOrders/${orderID}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete saved cart item");

//       await fetchOrders();
//     } catch (err) {
//       console.error("Error deleting saved item:", err);
//     }
//   };

//   // ✅ Safe total price
//   const calculateTotal = () => {
//     return [...cartItems, ...dbCartItems].reduce((acc, item) => {
//       const qty = Number(item.quantity) || 0;
//       const unit = Number(item.unitPrice) || (Number(item.price) / qty) || 0;
//       const total = item.totalPrice ?? unit * qty;
//       return acc + Number(total);
//     }, 0);
//   };

  
//   if (!user) {
//   return (
//     <div className="cart-container text-center mt-5">
//       <i className="fas fa-user-lock fa-2x text-danger mb-3"></i>
//       <h3>Please login to load cart</h3>
//     </div>
//   );
// }

// if (loading) {
//   return (
//     <div className="cart-container text-center mt-5">
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//       <h3 className="mt-3">Loading your cart...</h3>
//     </div>
//   );
// }


//   return (
//    <div className="productlist-wrapper">
//     <div className="cart-container">
//       <h2>My Selections</h2>
//       {user && <h4>{user.personName || user.email}, Selections</h4>}

//       {/* ✅ Local cart items */}
//       {cartItems.map((item, i) => (
//         <div key={`local-${i}`} className="cart-item">
//           <h5>
//             {item.size} Pizza - Quantity:
//             <input
//               type="number"
//               min="1"
//               value={item.quantity}
//               onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
//               style={{ width: "50px", marginLeft: "10px" }}
//             />
//           </h5>
//           <p>
//             Toppings:{" "}
//             {item.toppings.length > 0
//               ? item.toppings.join(", ")
//               : "No toppings selected."}
//           </p>
//           <p>Price: ${item.price.toFixed(2)}</p>
//           <div style={{ display: "flex", gap: "10px" }}>
//             <button
//               onClick={() => saveCartItem(item, i)}
//               className="btn btn-primary"
//             >
//               Save to Cart
//             </button>
//             <button
//               onClick={() => removeFromCart(i)}
//               className="btn btn-danger"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* ✅ DB cart items */}
//       {dbCartItems.length > 0 && <h3>Saved Cart Items</h3>}
//       {dbCartItems.map((item) => (
//         <div key={item.orderID} className="cart-item">
//           <h5>
//             {item.pizzaSize} Pizza - Quantity: {item.quantity}
//           </h5>
//           <p>
//             Toppings:{" "}
//             {item.toppings?.length > 0
//               ? item.toppings.join(", ")
//               : "No toppings selected."}
//           </p>
//           <p>Price: ${item.totalPrice.toFixed(2)}</p>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <button
//               onClick={() => placeDbCartItem(item.orderID)}
//               className="btn btn-success btn-sm"
//             >
//               Place Order
//             </button>
//             <button
//               onClick={() => removeDbCartItem(item.orderID)}
//               className="btn btn-danger btn-sm"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       <h4 className="total-price">
//         Total Price: ${calculateTotal().toFixed(2)}
//       </h4>

     
//      {/* ✅ Cart actions */}
// <div style={{ display: "flex", gap: "10px" }}>
//   {cartItems.length > 0 ? (
//     <>
//       <button onClick={clearCart} className="btn btn-warning">
//         Clear Cart
//       </button>
//       <button onClick={placeAllOrders} className="btn btn-success">
//         Place All Orders
//       </button>
//     </>
//   ) : (
//     <button
//       onClick={() => (window.location.href = "/products")}
//       className="btn btn-primary"
//     >
//       Add Items
//     </button>
//   )}
// </div>


//       <hr />

//       {/* ✅ Order history */}
//       <h3>Order History</h3>
//       {orderHistory.length > 0 ? (
//         orderHistory.map((order) => (
//           <div key={order.orderID} className="order-item">
//             <h4>Pizza Size: {order.pizzaSize}</h4>
//             <p>Quantity: {order.quantity}</p>
//             <p>
//               Toppings:{" "}
//               {order.toppings?.length > 0
//                 ? order.toppings.join(", ")
//                 : "No toppings selected."}
//             </p>
//             <p>Price: ${order.totalPrice.toFixed(2)}</p>
//             <p>
//               Order Date:{" "}
//               {order.orderDate && order.orderDate !== "0001-01-01T00:00:00"
//                 ? new Date(order.orderDate).toLocaleString()
//                 : "Not yet placed"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default CartComponent;


// //-----------perfect version below----------------with api calls


// import React, { useEffect, useState } from "react";
// import { useCart } from "./CartContext";
// import { useUser } from "./UserContext";
// import "./Cart.css";

// const CartComponent = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
//   const { user } = useUser();

//   const [dbCartItems, setDbCartItems] = useState([]);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch orders for logged-in user
//   const fetchOrders = async () => {
//     if (!user?.userID) {
//       setDbCartItems([]);
//       setOrderHistory([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `http://localhost:5043/api/PizzaOrders/search/userid/${user.userID}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch orders");
//       const data = await res.json();

//       setDbCartItems(data.filter((o) => !o.isOrdered));
//       setOrderHistory(data.filter((o) => o.isOrdered));
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [user]);

//   // ✅ Save local cart item to DB
//   const saveCartItem = async (item, index) => {
//     if (!user?.userID) {
//       alert("Please login to save items to your cart.");
//       return;
//     }

//     try {
//       const payload = {
//         userID: user.userID,
//         pizzaSize: item.size,
//         toppings: item.toppings,
//         unitPrice: item.price / item.quantity,
//         quantity: item.quantity,
//         isOrdered: false,
//       };

//       const res = await fetch("http://localhost:5043/api/PizzaOrders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error(`Failed to save cart item: ${res.status}`);

//       removeFromCart(index);
//       await fetchOrders();
//     } catch (err) {
//       console.error("Error saving cart item:", err);
//     }
//   };

//   // ✅ Place all local cart items
//   const placeAllOrders = async () => {
//     if (!user?.userID) {
//       alert("Please login to place your order.");
//       return;
//     }

//     try {
//       for (const item of cartItems) {
//         const payload = {
//           userID: user.userID,
//           pizzaSize: item.size,
//           toppings: item.toppings,
//           unitPrice: item.price / item.quantity,
//           quantity: item.quantity,
//           isOrdered: true,
//         };

//         const res = await fetch("http://localhost:5043/api/PizzaOrders", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
//       }

//       alert("All orders placed successfully!");
//       clearCart();
//       await fetchOrders();
//     } catch (err) {
//       console.error("Error placing orders:", err);
//     }
//   };

//   // ✅ Place one saved cart item
//   const placeDbCartItem = async (orderID) => {
//     if (!user?.userID) {
//       alert("Please login to place this order.");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5043/api/PizzaOrders/${orderID}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isOrdered: true }),
//       });

//       if (!res.ok) throw new Error("Failed to place saved cart item");

//       await fetchOrders();
//     } catch (err) {
//       console.error("Error placing saved item:", err);
//     }
//   };

//   // ✅ Remove saved cart item
//   const removeDbCartItem = async (orderID) => {
//     try {
//       const res = await fetch(`http://localhost:5043/api/PizzaOrders/${orderID}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete saved cart item");

//       await fetchOrders();
//     } catch (err) {
//       console.error("Error deleting saved item:", err);
//     }
//   };

//   // ✅ Calculate total safely
//   const calculateTotal = () => {
//     return [...cartItems, ...dbCartItems].reduce((acc, item) => {
//       const qty = Number(item.quantity) || 0;
//       const unit =
//         Number(item.unitPrice) || (Number(item.price) / (qty || 1)) || 0;
//       const total = item.totalPrice ?? unit * qty;
//       return acc + Number(total);
//     }, 0);
//   };

//   // ✅ Spinner while loading
//   if (loading) {
//     return (
//       <div className="cart-container text-center mt-5">
//         <div className="spinner-border text-primary" role="status"></div>
//         <h3 className="mt-3">Loading your cart...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="productlist-wrapper">
//       <div className="cart-container">
//         <h2>My Selections</h2>
//         {user ? (
//           <h4>{user.personName || user.email}, Selections</h4>
//         ) : (
//           <h5 className="text-danger">
//             <i className="fas fa-user-lock me-2"></i>
//             Please login to save or place orders
//           </h5>
//         )}

//         {/* ✅ Local cart items */}
//         {cartItems.map((item, i) => (
//           <div key={`local-${i}`} className="cart-item">
//             <h5>
//               {item.size} Pizza - Quantity:
//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
//                 style={{ width: "50px", marginLeft: "10px" }}
//               />
//             </h5>
//             <p>
//               Toppings:{" "}
//               {item.toppings.length > 0
//                 ? item.toppings.join(", ")
//                 : "No toppings selected."}
//             </p>
//             <p>Price: ${item.price.toFixed(2)}</p>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <button
//                 onClick={() => saveCartItem(item, i)}
//                 className="btn btn-primary"
//                 disabled={!user}
//               >
//                 Save to Cart
//               </button>
//               <button
//                 onClick={() => removeFromCart(i)}
//                 className="btn btn-danger"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* ✅ DB cart items */}
//         {dbCartItems.length > 0 && <h3>Saved Cart Items</h3>}
//         {dbCartItems.map((item) => (
//           <div key={item.orderID} className="cart-item">
//             <h5>
//               {item.pizzaSize} Pizza - Quantity: {item.quantity}
//             </h5>
//             <p>
//               Toppings:{" "}
//               {item.toppings?.length > 0
//                 ? item.toppings.join(", ")
//                 : "No toppings selected."}
//             </p>
//             <p>Price: ${item.totalPrice.toFixed(2)}</p>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <button
//                 onClick={() => placeDbCartItem(item.orderID)}
//                 className="btn btn-success btn-sm"
//                 disabled={!user}
//               >
//                 Place Order
//               </button>
//               <button
//                 onClick={() => removeDbCartItem(item.orderID)}
//                 className="btn btn-danger btn-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* ✅ Total price */}
//         <h4 className="total-price">
//           Total Price: ${calculateTotal().toFixed(2)}
//         </h4>

//         {/* ✅ Cart actions */}
//         <div style={{ display: "flex", gap: "10px" }}>
//           {cartItems.length > 0 ? (
//             <>
//               <button onClick={clearCart} className="btn btn-warning">
//                 Clear Cart
//               </button>
//               <button
//                 onClick={placeAllOrders}
//                 className="btn btn-success"
//                 disabled={!user}
//               >
//                 Place All Orders
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => (window.location.href = "/products")}
//               className="btn btn-primary"
//             >
//               Add Items
//             </button>
//           )}
//         </div>

//         <hr />

//         {/* ✅ Order history */}
//         <h3>Order History</h3>
//         {orderHistory.length > 0 ? (
//           orderHistory.map((order) => (
//             <div key={order.orderID} className="order-item">
//               <h4>Pizza Size: {order.pizzaSize}</h4>
//               <p>Quantity: {order.quantity}</p>
//               <p>
//                 Toppings:{" "}
//                 {order.toppings?.length > 0
//                   ? order.toppings.join(", ")
//                   : "No toppings selected."}
//               </p>
//               <p>Price: ${order.totalPrice.toFixed(2)}</p>
//               <p>
//                 Order Date:{" "}
//                 {order.orderDate && order.orderDate !== "0001-01-01T00:00:00"
//                   ? new Date(order.orderDate).toLocaleString()
//                   : "Not yet placed"}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartComponent;



import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import "./Cart.css";

const CartComponent = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useUser();

  const [dbCartItems, setDbCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch orders (memoized to satisfy eslint)
  const fetchOrders = useCallback(async () => {
    if (!user?.userID) {
      setDbCartItems([]);
      setOrderHistory([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        //`http://localhost:5043/api/PizzaOrders/search/userid/${user.userID}`        
        `https://micro-orderservice-bnc2gjg2h5emhqby.canadacentral-01.azurewebsites.net/api/PizzaOrders/search/userid/${user.userID}`
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();

      setDbCartItems(data.filter((o) => !o.isOrdered));
      setOrderHistory(data.filter((o) => o.isOrdered));
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.userID]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ✅ Save local cart item to DB
  const saveCartItem = async (item, index) => {
    if (!user?.userID) {
      alert("Please login to save items to your cart.");
      return;
    }

    try {
      const payload = {
        userID: user.userID,
        pizzaSize: item.size,
        toppings: item.toppings,
        unitPrice: item.price / item.quantity,
        quantity: item.quantity,
        isOrdered: false,
      };
//"http://localhost:5043/api/PizzaOrders"
      const res = await fetch("https://micro-orderservice-bnc2gjg2h5emhqby.canadacentral-01.azurewebsites.net/api/PizzaOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed to save cart item: ${res.status}`);

      removeFromCart(index);
      await fetchOrders();
    } catch (err) {
      console.error("Error saving cart item:", err);
    }
  };

  // ✅ Place all local cart items
  const placeAllOrders = async () => {
    if (!user?.userID) {
      alert("Please login to place your order.");
      return;
    }

    try {
      for (const item of cartItems) {
        const payload = {
          userID: user.userID,
          pizzaSize: item.size,
          toppings: item.toppings,
          unitPrice: item.price / item.quantity,
          quantity: item.quantity,
          isOrdered: true,
        };

        const res = await fetch("https://micro-orderservice-bnc2gjg2h5emhqby.canadacentral-01.azurewebsites.net/api/PizzaOrders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
      }

      alert("All orders placed successfully!");
      clearCart();
      await fetchOrders();
    } catch (err) {
      console.error("Error placing orders:", err);
    }
  };

  // ✅ Place one saved cart item
  const placeDbCartItem = async (orderID) => {
    if (!user?.userID) {
      alert("Please login to place this order.");
      return;
    }

    try {
      const res = await fetch(`https://micro-orderservice-bnc2gjg2h5emhqby.canadacentral-01.azurewebsites.net/api/PizzaOrders/${orderID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOrdered: true }),
      });

      if (!res.ok) throw new Error("Failed to place saved cart item");

      await fetchOrders();
    } catch (err) {
      console.error("Error placing saved item:", err);
    }
  };

  // ✅ Remove saved cart item
  const removeDbCartItem = async (orderID) => {
    try {
      const res = await fetch(`https://micro-orderservice-bnc2gjg2h5emhqby.canadacentral-01.azurewebsites.net/api/PizzaOrders/${orderID}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete saved cart item");

      await fetchOrders();
    } catch (err) {
      console.error("Error deleting saved item:", err);
    }
  };

  // ✅ Calculate total safely
  const calculateTotal = () => {
    return [...cartItems, ...dbCartItems].reduce((acc, item) => {
      const qty = Number(item.quantity) || 0;
      const unit =
        Number(item.unitPrice) || (Number(item.price) / (qty || 1)) || 0;
      const total = item.totalPrice ?? unit * qty;
      return acc + Number(total);
    }, 0);
  };

  // ✅ Spinner while loading
  if (loading) {
    return (
      <div className="cart-container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <h3 className="mt-3">Loading your cart...</h3>
      </div>
    );
  }

  return (
    <div className="productlist-wrapper">
      <div className="cart-container">
        <h2>My Selections</h2>
        {user ? (
          <h4>{user.personName || user.email}, Selections</h4>
        ) : (
          <h5 className="text-danger">
            <i className="fas fa-user-lock me-2"></i>
            Please login to save or place orders
          </h5>
        )}

        {/* ✅ Local cart items */}
        {cartItems.map((item, i) => (
          <div key={`local-${i}`} className="cart-item">
            <h5>
              {item.size} Pizza - Quantity:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
                style={{ width: "50px", marginLeft: "10px" }}
              />
            </h5>
            <p>
              Toppings:{" "}
              {item.toppings.length > 0
                ? item.toppings.join(", ")
                : "No toppings selected."}
            </p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => saveCartItem(item, i)}
                className="btn btn-primary"
                disabled={!user}
              >
                Save to Cart
              </button>
              <button
                onClick={() => removeFromCart(i)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* ✅ DB cart items */}
        {dbCartItems.length > 0 && <h3>Saved Cart Items</h3>}
        {dbCartItems.map((item) => (
          <div key={item.orderID} className="cart-item">
            <h5>
              {item.pizzaSize} Pizza - Quantity: {item.quantity}
            </h5>
            <p>
              Toppings:{" "}
              {item.toppings?.length > 0
                ? item.toppings.join(", ")
                : "No toppings selected."}
            </p>
            <p>Price: ${item.totalPrice.toFixed(2)}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => placeDbCartItem(item.orderID)}
                className="btn btn-success btn-sm"
                disabled={!user}
              >
                Place Order
              </button>
              <button
                onClick={() => removeDbCartItem(item.orderID)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* ✅ Total price */}
        <h4 className="total-price">
          Total Price: ${calculateTotal().toFixed(2)}
        </h4>

        {/* ✅ Cart actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          {cartItems.length > 0 ? (
            <>
              <button onClick={clearCart} className="btn btn-warning">
                Clear Cart
              </button>
              <button
                onClick={placeAllOrders}
                className="btn btn-success"
                disabled={!user}
              >
                Place All Orders
              </button>
            </>
          ) : (
            <button
              onClick={() => (window.location.href = "/products")}
              className="btn btn-primary"
            >
              Add Items
            </button>
          )}
        </div>

        <hr />

        {/* ✅ Order history */}
        <h3>Order History</h3>
        {orderHistory.length > 0 ? (
          orderHistory.map((order) => (
            <div key={order.orderID} className="order-item">
              <h4>Pizza Size: {order.pizzaSize}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>
                Toppings:{" "}
                {order.toppings?.length > 0
                  ? order.toppings.join(", ")
                  : "No toppings selected."}
              </p>
              <p>Price: ${order.totalPrice.toFixed(2)}</p>
              <p>
                Order Date:{" "}
                {order.orderDate && order.orderDate !== "0001-01-01T00:00:00"
                  ? new Date(order.orderDate).toLocaleString()
                  : "Not yet placed"}
              </p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
