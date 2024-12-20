import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // React Router'ın useNavigate hook'unu kullanıyoruz
import { addToCart } from "../redux/cartSlice"; // Assuming addToCart action is defined in your cartSlice

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // navigate hook'unu kullanarak yönlendirme işlemi yapacağız

  // Add product to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Kartın tıklanmasıyla yönlendirmeyi engelle
    const cartItem = {
      id: product.id,
      name: `${product.name} ${product.brand} ${product.model}`,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity when added to the cart
    };
    dispatch(addToCart(cartItem));
  };

  // Kartın tıklanmasıyla ürün detaylarına yönlendirme
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
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
        cursor: "pointer", // Kartın tamamına tıklanabilir bir işaret ekliyoruz
      }}
      onClick={handleCardClick} // Kartın herhangi bir yerine tıklanırsa yönlendir
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
        onClick={handleAddToCart} // Sepete ekleme işlemi
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
