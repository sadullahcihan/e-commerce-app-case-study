import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { Col, Row, Layout, Spin } from "antd"; // Added Spin for loading indicator
import Header from "../components/Header";
import { addToCart } from "../redux/cartSlice";
import ProductDetail from "../components/ProductDetail";

const { Content } = Layout;

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === id)
  );

  // Get cart items from Redux state
  const { items: cartItems } = useSelector((state) => state.cart);

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Add product to cart
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header totalAmount={calculateTotalAmount()} />

      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            {product ? (
              <ProductDetail product={product} onAddToCart={handleAddToCart} />
            ) : (
              <Spin size="large" tip="Loading product details..." /> // Loading indicator
            )}
          </Col>

          <Col xs={24} sm={8} md={6}>
            <Cart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductDetailPage;
