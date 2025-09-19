// import React, { useEffect, useState } from 'react';
// import { fetchCategories, fetchBrands, fetchProducts } from './Service';

// const Store = () => {
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       const [cat, br, pr] = await Promise.all([
//         fetchCategories(),
//         fetchBrands(),
//         fetchProducts()
//       ]);
//       setCategories(cat);
//       setBrands(br);
//       setProducts(pr);
//     };

//     loadData();
//   }, []);

//   const handleCategorySelect = (id) => {
//     setSelectedCategory(id === selectedCategory ? null : id);
//   };

//   const handleBrandSelect = (id) => {
//     setSelectedBrand(id === selectedBrand ? null : id);
//   };

//   const filteredProducts = products.filter(product => {
//     const categoryMatch = selectedCategory ? product.categoryId.toString() === selectedCategory.toString() : true;
//     const brandMatch = selectedBrand ? product.brandId.toString() === selectedBrand.toString() : true;
//     return categoryMatch && brandMatch;
//   });

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Store</h2>
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3">
//           <div className="mb-4">
//             <h5>Categories</h5>
//             <ul className="list-group">
//               {categories.map(cat => (
//                 <li
//                   key={cat.id}
//                   className={`list-group-item list-group-item-action ${selectedCategory === cat.id ? 'active' : ''}`}
//                   onClick={() => handleCategorySelect(cat.id)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {cat.categoryName}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h5>Brands</h5>
//             <ul className="list-group">
//               {brands.map(brand => (
//                 <li
//                   key={brand.id}
//                   className={`list-group-item list-group-item-action ${selectedBrand === brand.id ? 'active' : ''}`}
//                   onClick={() => handleBrandSelect(brand.id)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {brand.brandName}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="col-md-9">
//           {filteredProducts.length === 0 ? (
//             <div className="alert alert-warning">No products found for selected filters.</div>
//           ) : (
//             <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
//               {filteredProducts.map(product => (
//                 <div className="col" key={product.id}>
//                   <div className="card h-100 shadow-sm">
//                     <div className="card-body">
//                       <h5 className="card-title">{product.productName}</h5>
//                       <p className="card-text mb-1">Price: ₹{product.price}</p>
//                       <p className="card-text">Rating: ⭐ {product.rating}</p>
//                     </div>
//                     <div className="card-footer text-end">
//                       <button className="btn btn-sm btn-outline-primary">Add to Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Store;


import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchBrands, fetchProducts } from './Service';

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [cat, br, pr] = await Promise.all([
        fetchCategories(),
        fetchBrands(),
        fetchProducts()
      ]);
      setCategories(cat);
      setBrands(br);
      setProducts(pr);
    };

    loadData();
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id) => {
    setSelectedBrands(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories(categories.map(cat => cat.id));
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
  };

  const handleSelectAllBrands = () => {
    setSelectedBrands(brands.map(br => br.id));
  };

  const handleClearAllBrands = () => {
    setSelectedBrands([]);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryId.toString());

    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brandId.toString());

    return matchesCategory && matchesBrand;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Store</h2>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          {/* Category Filter */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-2">Categories</h5>
              <div className="btn-group">
                <button className="btn btn-sm btn-outline-primary" onClick={handleSelectAllCategories}>All</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClearAllCategories}>Clear</button>
              </div>
            </div>
            {categories.map(cat => (
              <div className="form-check" key={cat.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                <label className="form-check-label" htmlFor={`cat-${cat.id}`}>
                  {cat.categoryName}
                </label>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-2">Brands</h5>
              <div className="btn-group">
                <button className="btn btn-sm btn-outline-primary" onClick={handleSelectAllBrands}>All</button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClearAllBrands}>Clear</button>
              </div>
            </div>
            {brands.map(br => (
              <div className="form-check" key={br.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`br-${br.id}`}
                  checked={selectedBrands.includes(br.id)}
                  onChange={() => toggleBrand(br.id)}
                />
                <label className="form-check-label" htmlFor={`br-${br.id}`}>
                  {br.brandName}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Display */}
        <div className="col-md-9">
          {filteredProducts.length === 0 ? (
            <div className="alert alert-warning">No products match the selected filters.</div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {filteredProducts.map(product => (
                <div className="col" key={product.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text mb-1">Price: ₹{product.price}</p>
                      <p className="card-text">Rating: ⭐ {product.rating}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-sm btn-outline-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
