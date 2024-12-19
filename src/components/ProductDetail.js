import React from "react";
import { Card, Button, Row, Col } from "antd";

const ProductDetail = ({ product, onAddToCart }) => {
  if (!product) {
    return (
      <Card
        hoverable
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        <h2>Product not found</h2>
      </Card>
    );
  }
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <img
            alt={product.name}
            src={product.image}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Col>

        <Col span={12}>
          <h2>{product.name}</h2>
          <p>
            {product.brand} - {product.model}
          </p>
          <h3>{product.price} $</h3>
          <Button
            type="primary"
            style={{ backgroundColor: "#007BFF", borderColor: "#007BFF" }}
            onClick={() => onAddToCart(product)}
            size="large"
          >
            Add to Cart
          </Button>
          <p>{product.description}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;
