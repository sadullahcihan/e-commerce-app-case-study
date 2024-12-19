import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Filters from "../components/Filters";
import { Col, Row } from "antd";
//import Header from "../components/Header"; // Header'ı buraya dahil ediyoruz

const HomePage = () => {
  const dispatch = useDispatch();

  // Ürünler ve sepeti Redux'tan alıyoruz
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  // Sepete ürün ekleme işlevi
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="homepage">
      {/* <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Filters />
        </Col>

        <Col span={12}>
          <div className="products-column">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </Col>

        <Col span={6}>
          <Cart />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
