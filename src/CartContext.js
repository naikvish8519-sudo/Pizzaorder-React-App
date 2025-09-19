import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from localStorage when app starts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCartItems(storedCart);
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // ✅ Remove item by index
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Update quantity for a given index
  const updateQuantity = (index, newQty) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;

      // sample: if you store basePrice separately, recalc price
      const toppingCost = (updated[index].toppings?.length || 0) * 1.5;
      updated[index].price =
        newQty * (updated[index].basePrice + toppingCost);

      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
