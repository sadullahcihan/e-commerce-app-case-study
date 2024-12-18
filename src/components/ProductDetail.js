import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams(); // URL'den ürün ID'sini al
  const [product, setProduct] = useState(null); // Ürün detayını tutan state
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  // Ürün detayını almak için API çağrısı
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h2 style={{ margin: '20px 0' }}>{product.name}</h2>
      <p style={{ fontSize: '18px', color: '#555' }}>{product.brand} - {product.model}</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{product.price} $</p>
      <p style={{ margin: '20px 0', lineHeight: '1.6', color: '#666' }}>{product.description}</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
