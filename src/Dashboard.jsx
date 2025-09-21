// import React, { useEffect, useState } from 'react';
// import { useUser } from './UserContext';

// const Dashboard = () => {
//   const { user } = useUser();
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/brands').then(res => res.json()).then(setBrands);
//     fetch('http://localhost:3001/categories').then(res => res.json()).then(setCategories);
//     fetch('http://localhost:3001/products').then(res => res.json()).then(setProducts);
//     fetch('http://localhost:3001/orders').then(res => res.json()).then(setOrders);
//   }, []);

//   const userOrders = orders.filter(order =>
//     order.userId === user?.id || order.userId === parseInt(user?.id)
//   );

//   const enrichedOrders = userOrders.map(order => ({
//     ...order,
//     product: products.find(
//       p => p.id === order.productId || p.id === parseInt(order.productId)
//     )
//   }));

//   const previousOrders = enrichedOrders.filter(order => order.isPaymentCompleted);
//   const cart = enrichedOrders.filter(order => !order.isPaymentCompleted);

//   const handleBuyNow = async (order) => {
//     try {
//       await fetch(`http://localhost:3001/orders/${order.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isPaymentCompleted: true }),
//       });
//       const updatedOrders = await fetch('http://localhost:3001/orders').then(res => res.json());
//       setOrders(updatedOrders);
//     } catch (error) {
//       console.error('Buy Now failed:', error);
//     }
//   };

//   const handleDelete = async (order) => {
//     try {
//       await fetch(`http://localhost:3001/orders/${order.id}`, {
//         method: 'DELETE',
//       });
//       const updatedOrders = await fetch('http://localhost:3001/orders').then(res => res.json());
//       setOrders(updatedOrders);
//     } catch (error) {
//       console.error('Delete failed:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Dashboard</h2>

//       {/* Summary Cards */}
//       <div className="row g-4 mb-5">
//         <div className="col-md-3">
//           <div className="card text-white bg-primary h-100">
//             <div className="card-body">
//               <h5 className="card-title">Brands</h5>
//               <p className="card-text display-6">{brands.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-success h-100">
//             <div className="card-body">
//               <h5 className="card-title">Categories</h5>
//               <p className="card-text display-6">{categories.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-warning h-100">
//             <div className="card-body">
//               <h5 className="card-title">Products</h5>
//               <p className="card-text display-6">{products.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-white bg-danger h-100">
//             <div className="card-body">
//               <h5 className="card-title">Your Orders</h5>
//               <p className="card-text display-6">{userOrders.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cart Section */}
//       <h4 className="mb-3">🛒 Items in Cart</h4>
//       {cart.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
//           {cart.map((order) => (
//             <div className="col" key={order.id}>
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title">{order.product?.productName || 'Unknown Product'}</h5>
//                   <p className="card-text mb-1">Quantity: <strong>{order.quantity}</strong></p>
//                   <p className="card-text mb-3">
//                     Price: <strong>₹{order.product?.price ?? 'N/A'}</strong>
//                   </p>
//                   <div className="d-flex justify-content-end gap-2">
//                     <button className="btn btn-sm btn-success" onClick={() => handleBuyNow(order)} title="Buy Now">
//                       🛒 Buy Now
//                     </button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order)} title="Remove">
//                       🗑️ Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Previous Orders Section */}
//       <h4 className="mb-3">📦 Previous Orders</h4>
//       {previousOrders.length === 0 ? (
//         <p>No previous orders found.</p>
//       ) : (
//         <ul className="list-group">
//           {previousOrders.map((order) => (
//             <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
//               {order.product?.productName || 'Unknown Product'}
//               <span className="badge bg-success rounded-pill">Qty: {order.quantity}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import {
  fetchAllData,
  getUserOrders,
  getCartItems,
  getPreviousOrders
} from './Service';

const Dashboard = () => {
  const { user } = useUser();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { brands, categories, products, orders } = await fetchAllData();
      const enriched = getUserOrders(orders, products, user?.id);

      setBrands(brands);
      setCategories(categories);
      setProducts(products);
      setOrders(orders);
      setCart(getCartItems(enriched));
      setPreviousOrders(getPreviousOrders(enriched));
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const handleBuyNow = async (order) => {
    await fetch(`http://localhost:3001/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaymentCompleted: true }),
    });
    const updated = await fetchAllData();
    const enriched = getUserOrders(updated.orders, updated.products, user?.id);
    setOrders(updated.orders);
    setCart(getCartItems(enriched));
    setPreviousOrders(getPreviousOrders(enriched));
  };

  const handleDelete = async (order) => {
    await fetch(`http://localhost:3001/orders/${order.id}`, { method: 'DELETE' });
    const updated = await fetchAllData();
    const enriched = getUserOrders(updated.orders, updated.products, user?.id);
    setOrders(updated.orders);
    setCart(getCartItems(enriched));
    setPreviousOrders(getPreviousOrders(enriched));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Brands</h5>
              <p className="card-text display-6">{brands.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <p className="card-text display-6">{categories.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text display-6">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <h5 className="card-title">Your Orders</h5>
              <p className="card-text display-6">{cart.length + previousOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Cards */}
      <h4 className="mb-3">🛒 Items in Cart</h4>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {cart.map((order) => (
            <div className="col" key={order.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{order.product?.productName || 'Unknown Product'}</h5>
                  <p className="card-text mb-1">Quantity: <strong>{order.quantity}</strong></p>
                  <p className="card-text mb-3">Price: <strong>₹{order.product?.price ?? 'N/A'}</strong></p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-success" onClick={() => handleBuyNow(order)}>🛒 Buy Now</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previous Orders */}
      <h4 className="mb-3">📦 Previous Orders</h4>
      {previousOrders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        <ul className="list-group">
          {previousOrders.map((order) => (
            <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
              {order.product?.productName || 'Unknown Product'}
              <span className="badge bg-success rounded-pill">Qty: {order.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
