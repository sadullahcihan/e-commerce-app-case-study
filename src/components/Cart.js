import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  // Sepeti localStorage ile senkronize et
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    };
    
    const timeoutId = setTimeout(saveToLocalStorage, 500); // 500ms debounce
    
    return () => clearTimeout(timeoutId); // Önceki işlemi temizler
  }, [cartItems]);
  

  // Ürünleri kaldırma işlevi
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Sepeti tamamen temizleme
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: {item.price} $</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="clear-cart-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
