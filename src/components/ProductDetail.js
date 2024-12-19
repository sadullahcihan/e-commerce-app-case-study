import React from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // Geri yönlendirme için
import { ArrowLeftOutlined } from "@ant-design/icons";

const ProductDetail = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

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
      <Row>
        <Col span={24} style={{ paddingBottom: "20px" }}>
          <Button
            type="default"
            onClick={() => navigate(-1)} // Bir adım geri gitmek için
            style={{
              padding: "8px 16px",
              borderRadius: "4px", // Çerçeve köşe yuvarlatma
              border: "2px solid #007BFF",
            }}
          >
            <ArrowLeftOutlined style={{ marginRight: "8px" }} />
            Go Back
          </Button>
        </Col>
      </Row>

      {/* Ürün Detayları */}
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
