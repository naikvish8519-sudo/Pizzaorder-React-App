const API_BASE = 'http://localhost:3001';

export const fetchAllData = async () => {
  const [brandsRes, categoriesRes, productsRes, ordersRes] = await Promise.all([
    fetch(`${API_BASE}/brands`),
    fetch(`${API_BASE}/categories`),
    fetch(`${API_BASE}/products`),
    fetch(`${API_BASE}/orders`)
  ]);

  const [brands, categories, products, orders] = await Promise.all([
    brandsRes.json(),
    categoriesRes.json(),
    productsRes.json(),
    ordersRes.json()
  ]);

  return { brands, categories, products, orders };
};

export const getUserOrders = (orders, products, userId) => {
  const userOrders = orders.filter(order => order.userId === userId || order.userId === parseInt(userId));

  return userOrders.map(order => ({
    ...order,
    product: products.find(
      p => p.id === order.productId || p.id === parseInt(order.productId)
    )
  }));
};

export const getCartItems = (enrichedOrders) =>
  enrichedOrders.filter(order => !order.isPaymentCompleted);

export const getPreviousOrders = (enrichedOrders) =>
  enrichedOrders.filter(order => order.isPaymentCompleted);



export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
};

export const fetchBrands = async () => {
  const res = await fetch(`${API_BASE}/brands`);
  return res.json();
};

export const fetchProducts = async () => {
  const res = await fetch('http://localhost:3001/products');
  return res.json();
};
