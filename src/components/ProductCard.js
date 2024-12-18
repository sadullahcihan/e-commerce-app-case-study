import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}>
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
      }}
    />
    <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.brand} {product.model}</h3>
    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{product.price} $</p>
    <button
      style={{
        padding: '8px 16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
      }}
    >
      Add to Cart
    </button>
    <br />
    <Link
      to={`/product/${product.id}`}
      style={{
        color: '#007BFF',
        textDecoration: 'none',
        fontSize: '14px',
      }}
    >
      Details
    </Link>
  </div>
);

export default ProductCard;
