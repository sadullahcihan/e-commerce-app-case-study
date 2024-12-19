import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Filters from "../components/Filters";
import { Col, Row, Layout } from "antd";
import Header from "../components/Header";

const { Content } = Layout;

const HomePage = () => {
  const dispatch = useDispatch();

  // Ürünler ve sepeti Redux'tan alıyoruz
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { items: cartItems } = useSelector((state) => state.cart); // Sepet ürünleri

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

  // Toplam tutarı hesaplama
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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

  const handleCartClick = () => {
    console.log("Go to cart clicked!");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onCartClick={handleCartClick} 
        totalAmount={calculateTotalAmount()} 
      />

      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Filters />
          </Col>

          <Col span={12}>
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
          </Col>

          <Col span={6}>
            <Cart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
