import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Assuming addToCart action is defined in your cartSlice

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Add product to cart
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: `${product.brand} ${product.model}`,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity when added to the cart
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <p
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#007bff",
          marginBottom: "auto",
          textAlign: "left",
        }}
      >
        {product.price} $
      </p>
      <h3
        style={{
          fontSize: "18px",
          margin: "10px 0",
          textAlign: "left",
        }}
      >
        {product.brand} {product.model}
      </h3>
      <div style={{ flexGrow: 1 }} />
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <br />
      <Link
        to={`/product/${product.id}`}
        style={{
          color: "#007BFF",
          textDecoration: "none",
          fontSize: "14px",
        }}
      >
        Details
      </Link>
    </div>
  );
};

export default ProductCard;
