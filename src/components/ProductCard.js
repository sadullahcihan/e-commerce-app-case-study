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
      name: `${product.name} ${product.brand} ${product.model}`,
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
        padding: "12px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <picture>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "68px", // Resim boyutunu küçülttük
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </picture>

      <p
        style={{
          fontSize: "14px",
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
          fontSize: "14px",
          margin: "8px 0",
          textAlign: "left",
        }}
      >
        {product.name} {product.brand} {product.model}
      </h3>
      <div style={{ flexGrow: 1 }} />
      <button
        style={{
          padding: "6px 6px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "8px",
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
          fontSize: "12px",
        }}
      >
        Details
      </Link>
    </div>
  );
};

export default ProductCard;
