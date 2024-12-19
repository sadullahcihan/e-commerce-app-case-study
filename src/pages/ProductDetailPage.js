import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { Col, Row, Layout } from "antd";
import Header from "../components/Header";
import { addToCart } from "../redux/cartSlice";
import ProductDetail from "../components/ProductDetail";

const { Content } = Layout;

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === id)
  );

  // Toplam tutarı hesaplama
  const { items: cartItems } = useSelector((state) => state.cart); // Sepet ürünleri
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Sepete ürün ekleme işlevi
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header totalAmount={calculateTotalAmount()} />

      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            {product ? (
              <ProductDetail product={product} onAddToCart={handleAddToCart} />
            ) : (
              <p>Loading...</p>
            )}
          </Col>

          <Col span={6}>
            <Cart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductDetailPage;
