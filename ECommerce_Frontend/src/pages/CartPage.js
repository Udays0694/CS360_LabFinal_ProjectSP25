// src/pages/CartPage.js
import React, { useState, useEffect } from 'react';

const CartPage = ({ cartItems, onPlaceOrder }) => {
  const [cart, setCart] = useState(cartItems); // Initialize cart with props data
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price whenever the cart changes
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    };
    
    calculateTotalPrice();
  }, [cart]); // Recalculate whenever cart changes

  const handleRemoveItem = (productId) => {
    // Remove the item from the cart
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    // Update quantity of an item in the cart
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handlePlaceOrderClick = () => {
    // Trigger the order placement
    onPlaceOrder();
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} width="100" />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
                <div>
                  <label>Quantity: </label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={handlePlaceOrderClick}>Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
