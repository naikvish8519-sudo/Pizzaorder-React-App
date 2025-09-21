// import React, { useEffect, useState } from 'react';
// import { fetchProducts, fetchBrands, fetchCategories } from './Service';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsData, brandsData, categoriesData] = await Promise.all([
//           fetchProducts(),
//           fetchBrands(),
//           fetchCategories(),
//         ]);

//         setProducts(productsData);
//         setBrands(brandsData);
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error('Failed to load product data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getBrandName = (brandId) =>
//     brands.find((b) => b.id === brandId || b.id === parseInt(brandId))?.brandName || 'Unknown';

//   const getCategoryName = (categoryId) =>
//     categories.find((c) => c.id === categoryId || c.id === parseInt(categoryId))?.categoryName || 'Unknown';

//   const renderStars = (rating) => '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

//   const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

//   const filteredProducts = products.filter((prod) => {
//     const brandName = getBrandName(prod.brandId).toLowerCase();
//     const categoryName = getCategoryName(prod.categoryId).toLowerCase();

//     return (
//       prod.productName.toLowerCase().includes(searchTerm) ||
//       prod.price.toString().includes(searchTerm) ||
//       brandName.includes(searchTerm) ||
//       categoryName.includes(searchTerm) ||
//       prod.rating.toString().includes(searchTerm)
//     );
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     const { key, direction } = sortConfig;

//     if (!key) return 0;

//     let aVal = a[key];
//     let bVal = b[key];

//     if (key === 'brandName') {
//       aVal = getBrandName(a.brandId);
//       bVal = getBrandName(b.brandId);
//     } else if (key === 'categoryName') {
//       aVal = getCategoryName(a.categoryId);
//       bVal = getCategoryName(b.categoryId);
//     }

//     if (typeof aVal === 'string') {
//       aVal = aVal.toLowerCase();
//       bVal = bVal.toLowerCase();
//     }

//     if (aVal < bVal) return direction === 'asc' ? -1 : 1;
//     if (aVal > bVal) return direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
//       } else {
//         return { key, direction: 'asc' };
//       }
//     });
//   };

// const getSortSymbol = (key) => {
//   if (sortConfig.key !== key) return '';
//   const arrow = sortConfig.direction === 'asc' ? '⬆' : '⬇';
//   return <span style={{ color: 'white', marginLeft: '5px' }}>{arrow}</span>;
// };


//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Product List</h2>

//       {/* 🔍 Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by name, price, brand, category, or rating..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>

//       {/* 📊 Product Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover align-middle text-center">
//           <thead className="table-light">
//             <tr>
//               <th onClick={() => handleSort('productName')} style={{ cursor: 'pointer' }}>
//                 Product Name {getSortSymbol('productName')}
//               </th>
//               <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
//                 Price ($) {getSortSymbol('price')}
//               </th>
//               <th onClick={() => handleSort('brandName')} style={{ cursor: 'pointer' }}>
//                 Brand {getSortSymbol('brandName')}
//               </th>
//               <th onClick={() => handleSort('categoryName')} style={{ cursor: 'pointer' }}>
//                 Category {getSortSymbol('categoryName')}
//               </th>
//               <th onClick={() => handleSort('rating')} style={{ cursor: 'pointer' }}>
//                 Rating {getSortSymbol('rating')}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedProducts.length > 0 ? (
//               sortedProducts.map((prod) => (
//                 <tr key={prod.id}>
//                   <td>{prod.productName}</td>
//                   <td>{prod.price}</td>
//                   <td>{getBrandName(prod.brandId)}</td>
//                   <td>{getCategoryName(prod.categoryId)}</td>
//                   <td>{renderStars(prod.rating)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No matching products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// import React, { useState } from "react";
// import "./pizza.css";

// const ProductList = ({ addToCartGlobal }) => {
//   const pizzaSizes = [
//     { name: "Small", price: 5 },
//     { name: "Medium", price: 7 },
//     { name: "Large", price: 8 },
//     { name: "ExtraLarge", price: 9 },
//   ];

//   const vegToppings = [
//     { name: "Tomatoes", price: 1.0 },
//     { name: "Onions", price: 0.5 },
//     { name: "Bell Pepper", price: 1.0 },
//     { name: "Mushrooms", price: 1.2 },
//     { name: "Pineapple", price: 0.75 },
//   ];

//   const nonVegToppings = [
//     { name: "Pepperoni", price: 1.5 },
//     { name: "Sausage", price: 1.75 },
//     { name: "Bacon", price: 2.0 },
//   ];

//   // state
//   const [sizesQty, setSizesQty] = useState({
//     Small: 0,
//     Medium: 0,
//     Large: 0,
//     ExtraLarge: 0,
//   });

//   const [toppingsMap, setToppingsMap] = useState(
//     pizzaSizes.reduce((acc, size) => {
//       acc[size.name] = [...vegToppings, ...nonVegToppings].map((t) => ({
//         ...t,
//         selected: false,
//       }));
//       return acc;
//     }, {})
//   );

//   // increase/decrease
//   const increaseQuantity = (size) => {
//     setSizesQty({ ...sizesQty, [size]: sizesQty[size] + 1 });
//   };

//   const decreaseQuantity = (size) => {
//     if (sizesQty[size] > 0) {
//       setSizesQty({ ...sizesQty, [size]: sizesQty[size] - 1 });
//     }
//   };

//   // toggle topping
//   const toggleTopping = (size, toppingName) => {
//     setToppingsMap({
//       ...toppingsMap,
//       [size]: toppingsMap[size].map((t) =>
//         t.name === toppingName ? { ...t, selected: !t.selected } : t
//       ),
//     });
//   };

//   // calculate price for each size
//   const calculateSizePrice = (size) => {
//     const qty = sizesQty[size] || 0;
//     const base = pizzaSizes.find((s) => s.name === size)?.price || 0;
//     let total = base * qty;

//     toppingsMap[size].forEach((t) => {
//       if (t.selected) total += t.price * qty;
//     });

//     return total;
//   };

//   // grand total
//   const grandTotal = pizzaSizes.reduce(
//     (sum, s) => sum + calculateSizePrice(s.name),
//     0
//   );

//   // add to cart
//   const addToCart = (size) => {
//     const qty = sizesQty[size];
//     if (qty > 0) {
//       const selectedToppings = toppingsMap[size]
//         .filter((t) => t.selected)
//         .map((t) => t.name);

//       const cartItem = {
//         size,
//         quantity: qty,
//         toppings: selectedToppings,
//         price: calculateSizePrice(size),
//       };

//       if (addToCartGlobal) addToCartGlobal(cartItem);
//       console.log("Added to cart:", cartItem);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 pizza-header gradient-header">
//         Pick Your Order
//         <img
//           src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?semt=ais_hybrid"
//           alt="Pizza Icon"
//           style={{ width: 100, height: 100, marginLeft: 10 }}
//         />
//       </h2>

//       <div className="row">
//         {pizzaSizes.map((size, i) => (
//           <div className="col-md-3" key={i}>
//             <div className="card mb-4">
//               <div className="card-fill"></div>
//               <div className="card-body text-center">
//                 <h4 style={{ color: "white", fontWeight: "bold" }}>
//                   {size.name} (${size.price})
//                 </h4>

//                 {/* Quantity controls */}
//                 <div className="quantity-controls">
//                   <button
//                     onClick={() => decreaseQuantity(size.name)}
//                     disabled={sizesQty[size.name] <= 0}
//                     className="btn btn-secondary"
//                   >
//                     -
//                   </button>
//                   <span className="quantity-display">
//                     {sizesQty[size.name] || 0}
//                   </span>
//                   <button
//                     onClick={() => increaseQuantity(size.name)}
//                     className="btn btn-secondary"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Total for {size.name}: ${calculateSizePrice(size.name).toFixed(2)}
//                 </h5>

//                 {/* Veg toppings */}
//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Select Veg Toppings:
//                 </h5>
//                 {vegToppings.map((t) => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[size.name].find((x) => x.name === t.name)
//                           ?.selected || false
//                       }
//                       onChange={() => toggleTopping(size.name, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 {/* Non-veg toppings */}
//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Select Non-Veg Toppings:
//                 </h5>
//                 {nonVegToppings.map((t) => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[size.name].find((x) => x.name === t.name)
//                           ?.selected || false
//                       }
//                       onChange={() => toggleTopping(size.name, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => addToCart(size.name)}
//                   className="btn btn-success mt-3"
//                 >
//                   <i className="fas fa-shopping-cart"></i> Add to Cart
//                 </button>

//                 <h4
//                   className="total-selection-price mt-3"
//                   style={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Total Price: ${calculateSizePrice(size.name).toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Grand total */}
//       <div className="grand-total-strip">
//         <h3 className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

//------prefecct UI version with API calls -------
// import React, { useEffect, useState } from "react";
// import "./pizza.css";

// const ProductList = ({ addToCartGlobal }) => {
//   const [pizzaSizes, setPizzaSizes] = useState([]);
//   const [vegToppings, setVegToppings] = useState([]);
//   const [nonVegToppings, setNonVegToppings] = useState([]);
//   const [sizesQty, setSizesQty] = useState({});
//   const [toppingsMap, setToppingsMap] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const pizzaRes = await fetch("http://localhost:5259/api/pizzas");
//         const toppingRes = await fetch("http://localhost:5259/api/toppings");

//         const pizzaData = await pizzaRes.json();
//         const toppingData = await toppingRes.json();

//         setPizzaSizes(pizzaData);

//         const veg = toppingData.filter(t => t.isVeg);
//         const nonVeg = toppingData.filter(t => !t.isVeg);

//         setVegToppings(veg);
//         setNonVegToppings(nonVeg);

//         const initialQty = {};
//         const initialToppings = {};

//         pizzaData.forEach(p => {
//           initialQty[p.size] = 0;
//           initialToppings[p.size] = [...veg, ...nonVeg].map(t => ({
//             ...t,
//             selected: false,
//           }));
//         });

//         setSizesQty(initialQty);
//         setToppingsMap(initialToppings);
//       } catch (err) {
//         console.error("Error loading pizza data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const increaseQuantity = (size) => {
//     setSizesQty(prev => ({ ...prev, [size]: prev[size] + 1 }));
//   };

//   const decreaseQuantity = (size) => {
//     if (sizesQty[size] > 0) {
//       setSizesQty(prev => ({ ...prev, [size]: prev[size] - 1 }));
//     }
//   };

//   const toggleTopping = (size, toppingName) => {
//     setToppingsMap(prev => ({
//       ...prev,
//       [size]: prev[size].map(t =>
//         t.name === toppingName ? { ...t, selected: !t.selected } : t
//       ),
//     }));
//   };

//   const calculateSizePrice = (size) => {
//     const qty = sizesQty[size] || 0;
//     const base = pizzaSizes.find(p => p.size === size)?.price || 0;
//     let total = base * qty;

//     toppingsMap[size]?.forEach(t => {
//       if (t.selected) total += t.price * qty;
//     });

//     return total;
//   };

//   const grandTotal = pizzaSizes.reduce(
//     (sum, p) => sum + calculateSizePrice(p.size),
//     0
//   );

//   const addToCart = (size) => {
//     const qty = sizesQty[size];
//     if (qty > 0) {
//       const selectedToppings = toppingsMap[size]
//         .filter(t => t.selected)
//         .map(t => t.name);

//       const cartItem = {
//         size,
//         quantity: qty,
//         toppings: selectedToppings,
//         price: calculateSizePrice(size),
//       };

//       if (addToCartGlobal) addToCartGlobal(cartItem);
//       console.log("Added to cart:", cartItem);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 pizza-header gradient-header">
//         Pick Your Order
//         <img
//           src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?semt=ais_hybrid"
//           alt="Pizza Icon"
//           style={{ width: 100, height: 100, marginLeft: 10 }}
//         />
//       </h2>

//       <div className="row">
//         {pizzaSizes.map((p, i) => (
//           <div className="col-md-3" key={i}>
//             <div className="card mb-4">
//               <div className="card-fill"></div>
//               <div className="card-body text-center">
//                 <h4 style={{ color: "white", fontWeight: "bold" }}>
//                   {p.size} (${p.price})
//                 </h4>

//                 <div className="quantity-controls">
//                   <button
//                     onClick={() => decreaseQuantity(p.size)}
//                     disabled={sizesQty[p.size] <= 0}
//                     className="btn btn-secondary"
//                   >
//                     -
//                   </button>
//                   <span className="quantity-display">{sizesQty[p.size] || 0}</span>
//                   <button
//                     onClick={() => increaseQuantity(p.size)}
//                     className="btn btn-secondary"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Total for {p.size}: ${calculateSizePrice(p.size).toFixed(2)}
//                 </h5>

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>Select Veg Toppings:</h5>
//                 {vegToppings.map(t => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[p.size]?.find(x => x.name === t.name)?.selected || false
//                       }
//                       onChange={() => toggleTopping(p.size, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>Select Non-Veg Toppings:</h5>
//                 {nonVegToppings.map(t => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[p.size]?.find(x => x.name === t.name)?.selected || false
//                       }
//                       onChange={() => toggleTopping(p.size, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => addToCart(p.size)}
//                   className="btn btn-success mt-3"
//                 >
//                   <i className="fas fa-shopping-cart"></i> Add to Cart
//                 </button>

//                 <h4 className="total-selection-price mt-3" style={{ color: "white", fontWeight: "bold" }}>
//                   Total Price: ${calculateSizePrice(p.size).toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grand-total-strip">
//         <h3 className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



//Pizza selection component with API integration-working with individual pizza selection
// import React, { useEffect, useState } from "react";
// import "./pizza.css";

// const ProductList = ({ addToCartGlobal }) => {
//   const [pizzaSizes, setPizzaSizes] = useState([]);
//   const [vegToppings, setVegToppings] = useState([]);
//   const [nonVegToppings, setNonVegToppings] = useState([]);
//   const [sizesQty, setSizesQty] = useState({});
//   const [toppingsMap, setToppingsMap] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const pizzaRes = await fetch("http://localhost:5259/api/pizzas");
//         const toppingRes = await fetch("http://localhost:5259/api/toppings");

//         const pizzaData = await pizzaRes.json();
//         const toppingData = await toppingRes.json();

//         setPizzaSizes(pizzaData);

//         const veg = toppingData.filter((t) => t.isVeg);
//         const nonVeg = toppingData.filter((t) => !t.isVeg);

//         setVegToppings(veg);
//         setNonVegToppings(nonVeg);

//         const initialQty = {};
//         const initialToppings = {};

//         pizzaData.forEach((p) => {
//           initialQty[p.id] = 0;
//           initialToppings[p.id] = [...veg, ...nonVeg].map((t) => ({
//             ...t,
//             selected: false,
//           }));
//         });

//         setSizesQty(initialQty);
//         setToppingsMap(initialToppings);
//       } catch (err) {
//         console.error("Error loading pizza data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const increaseQuantity = (pizzaId) => {
//     setSizesQty((prev) => ({ ...prev, [pizzaId]: prev[pizzaId] + 1 }));
//   };

//   const decreaseQuantity = (pizzaId) => {
//     setSizesQty((prev) => ({
//       ...prev,
//       [pizzaId]: Math.max((prev[pizzaId] || 0) - 1, 0),
//     }));
//   };

//   const toggleTopping = (pizzaId, toppingName) => {
//     setToppingsMap((prev) => ({
//       ...prev,
//       [pizzaId]: prev[pizzaId].map((t) =>
//         t.name === toppingName ? { ...t, selected: !t.selected } : t
//       ),
//     }));
//   };

//   const calculateSizePrice = (pizzaId) => {
//     const qty = sizesQty[pizzaId] || 0;
//     const base = pizzaSizes.find((p) => p.id === pizzaId)?.price || 0;
//     let total = base * qty;

//     toppingsMap[pizzaId]?.forEach((t) => {
//       if (t.selected) total += t.price * qty;
//     });

//     return total;
//   };

//   const grandTotal = pizzaSizes.reduce(
//     (sum, p) => sum + calculateSizePrice(p.id),
//     0
//   );

//   const addToCart = (pizzaId) => {
//     const qty = sizesQty[pizzaId];
//     if (qty > 0) {
//       const selectedToppings = toppingsMap[pizzaId]
//         .filter((t) => t.selected)
//         .map((t) => t.name);

//       const pizza = pizzaSizes.find((p) => p.id === pizzaId);

//       const cartItem = {
//         size: pizza.size,
//         quantity: qty,
//         toppings: selectedToppings,
//         price: calculateSizePrice(pizzaId),
//       };

//       if (addToCartGlobal) addToCartGlobal(cartItem);
//       console.log("Added to cart:", cartItem);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4 pizza-header gradient-header">
//         Pick Your Order
//         <img
//           src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?semt=ais_hybrid"
//           alt="Pizza Icon"
//           style={{ width: 100, height: 100, marginLeft: 10 }}
//         />
//       </h2>

//       <div className="row">
//         {pizzaSizes.map((p, i) => (
//           <div className="col-md-3" key={p.id}>
//             <div className="card mb-4">
//               <div className="card-fill"></div>
//               <div className="card-body text-center">
//                 <h4 style={{ color: "white", fontWeight: "bold" }}>
//                    {p.name} - {p.size} (${p.price.toFixed(2)})
//                 </h4>

//                 <div className="quantity-controls">
//                   <button
//                     onClick={() => decreaseQuantity(p.id)}
//                     disabled={sizesQty[p.id] <= 0}
//                     className="btn btn-secondary"
//                   >
//                     -
//                   </button>
//                   <span className="quantity-display">
//                     {sizesQty[p.id] || 0}
//                   </span>
//                   <button
//                     onClick={() => increaseQuantity(p.id)}
//                     className="btn btn-secondary"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Total for {p.size}: ${calculateSizePrice(p.id).toFixed(2)}
//                 </h5>

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Select Veg Toppings:
//                 </h5>
//                 {vegToppings.map((t) => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[p.id]?.find((x) => x.name === t.name)
//                           ?.selected || false
//                       }
//                       onChange={() => toggleTopping(p.id, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 <h5 style={{ color: "white", fontWeight: "bold" }}>
//                   Select Non-Veg Toppings:
//                 </h5>
//                 {nonVegToppings.map((t) => (
//                   <label key={t.name} className="toggle-button">
//                     <input
//                       type="checkbox"
//                       checked={
//                         toppingsMap[p.id]?.find((x) => x.name === t.name)
//                           ?.selected || false
//                       }
//                       onChange={() => toggleTopping(p.id, t.name)}
//                     />
//                     <span className="slider"></span>
//                     {t.name} (${t.price.toFixed(2)})
//                   </label>
//                 ))}

//                 <button
//                   onClick={() => addToCart(p.id)}
//                   className="btn btn-success mt-3"
//                 >
//                   <i className="fas fa-shopping-cart"></i> Add to Cart
//                 </button>

//                 <h4
//                   className="total-selection-price mt-3"
//                   style={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Total Price: ${calculateSizePrice(p.id).toFixed(2)}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grand-total-strip">
//         <h3 className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



















import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext"; // ✅ use global cart
import "./pizza.css";

const ProductList = () => {
  const [pizzaSizes, setPizzaSizes] = useState([]);
  const [vegToppings, setVegToppings] = useState([]);
  const [nonVegToppings, setNonVegToppings] = useState([]);
  const [sizesQty, setSizesQty] = useState({});
  const [toppingsMap, setToppingsMap] = useState({});
  const { addToCart } = useCart(); // ✅ get addToCart from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const pizzaRes = await fetch("http://localhost:5259/api/pizzas");
        //const toppingRes = await fetch("http://localhost:5259/api/toppings");
const pizzaRes = await fetch("https://micro-productservice-b2g0g5gafpawcsdf.japanwest-01.azurewebsites.net/api/pizzas");
 const toppingRes = await fetch("https://micro-productservice-b2g0g5gafpawcsdf.japanwest-01.azurewebsites.net/api/toppings");

        const pizzaData = await pizzaRes.json();
        const toppingData = await toppingRes.json();

        setPizzaSizes(pizzaData);

        const veg = toppingData.filter((t) => t.isVeg);
        const nonVeg = toppingData.filter((t) => !t.isVeg);

        setVegToppings(veg);
        setNonVegToppings(nonVeg);

        const initialQty = {};
        const initialToppings = {};

        pizzaData.forEach((p) => {
          initialQty[p.id] = 0;
          initialToppings[p.id] = [...veg, ...nonVeg].map((t) => ({
            ...t,
            selected: false,
          }));
        });

        setSizesQty(initialQty);
        setToppingsMap(initialToppings);
      } catch (err) {
        console.error("Error loading pizza data:", err);
      }
    };

    fetchData();
  }, []);

  const increaseQuantity = (pizzaId) => {
    setSizesQty((prev) => ({ ...prev, [pizzaId]: prev[pizzaId] + 1 }));
  };

  const decreaseQuantity = (pizzaId) => {
    setSizesQty((prev) => ({
      ...prev,
      [pizzaId]: Math.max((prev[pizzaId] || 0) - 1, 0),
    }));
  };

  const toggleTopping = (pizzaId, toppingName) => {
    setToppingsMap((prev) => ({
      ...prev,
      [pizzaId]: prev[pizzaId].map((t) =>
        t.name === toppingName ? { ...t, selected: !t.selected } : t
      ),
    }));
  };

  const calculateSizePrice = (pizzaId) => {
    const qty = sizesQty[pizzaId] || 0;
    const base = pizzaSizes.find((p) => p.id === pizzaId)?.price || 0;
    let total = base * qty;

    toppingsMap[pizzaId]?.forEach((t) => {
      if (t.selected) total += t.price * qty;
    });

    return total;
  };

  const addToCartHandler = (pizzaId) => {
    const qty = sizesQty[pizzaId];
    if (qty > 0) {
      const selectedToppings = toppingsMap[pizzaId]
        .filter((t) => t.selected)
        .map((t) => t.name);

      const pizza = pizzaSizes.find((p) => p.id === pizzaId);

      const cartItem = {
        size: pizza.name,
        quantity: qty,
        toppings: selectedToppings,
        basePrice: pizza.price,
        price: calculateSizePrice(pizzaId),
      };

      addToCart(cartItem); // ✅ update global cart
      console.log("Added to cart:", cartItem);
    }
  };

  const grandTotal = pizzaSizes.reduce(
    (sum, p) => sum + calculateSizePrice(p.id),
    0
  );

  return (
    <div className="productlist-wrapper">
    <div className="container">
      <h2 className="text-center mb-4 pizza-header gradient-header">
        Pick Your Order
        <img
          src="https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?semt=ais_hybrid"
          alt="Pizza Icon"
          style={{ width: 100, height: 100, marginLeft: 10 }}
        />
      </h2>

      <div className="row">
        {pizzaSizes.map((p) => (
          <div className="col-md-3" key={p.id}>
            <div className="card mb-4">
              <div className="card-fill"></div> {/* Gradient fill */}
              <div className="card-body text-center">
                <h4 style={{ color: "white", fontWeight: "bold" }}>
                  {p.name} - {p.size} (${p.price.toFixed(2)})
                </h4>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(p.id)}
                    disabled={sizesQty[p.id] <= 0}
                    className="btn btn-secondary"
                  >
                    -
                  </button>
                  <span className="quantity-display">
                    {sizesQty[p.id] || 0}
                  </span>
                  <button
                    onClick={() => increaseQuantity(p.id)}
                    className="btn btn-secondary"
                  >
                    +
                  </button>
                 
                </div>

                <h5 style={{ color: "white", fontWeight: "bold" }}>
                  Total for {p.size}: ${calculateSizePrice(p.id).toFixed(2)}
                </h5>

                <h5 style={{ color: "white", fontWeight: "bold" }}>
                  Select Veg Toppings:
                </h5>
                {vegToppings.map((t) => (
                  <label key={t.name} className="toggle-button">
                    <input
                      type="checkbox"
                      checked={
                        toppingsMap[p.id]?.find((x) => x.name === t.name)
                          ?.selected || false
                      }
                      onChange={() => toggleTopping(p.id, t.name)}
                    />
                    <span className="slider"></span>
                    {t.name} (${t.price.toFixed(2)})
                  </label>
                ))}

                <h5 style={{ color: "white", fontWeight: "bold" }}>
                  Select Non-Veg Toppings:
                </h5>
                {nonVegToppings.map((t) => (
                  <label key={t.name} className="toggle-button">
                    <input
                      type="checkbox"
                      checked={
                        toppingsMap[p.id]?.find((x) => x.name === t.name)
                          ?.selected || false
                      }
                      onChange={() => toggleTopping(p.id, t.name)}
                    />
                    <span className="slider"></span>
                    {t.name} (${t.price.toFixed(2)})
                  </label>
                ))}

                <button
                  onClick={() => addToCartHandler(p.id)}
                  className="btn btn-success mt-3"
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>

                <h4
                  className="total-selection-price mt-3"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Total Price: ${calculateSizePrice(p.id).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grand-total-strip">
        <h3 className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</h3>
      </div>
    </div>
    </div>
  );
};

export default ProductList;


