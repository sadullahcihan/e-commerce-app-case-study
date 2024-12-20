import React from "react";
import { Card, Button, Row, Col, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "styled-components"; // To add custom styling

const { Title, Text } = Typography;

// Styled components for better design control
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const GoBackButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 4px;
  border: 2px solid #007bff;
  margin-bottom: 20px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

// Styled component for the product description with scroll functionality
const DescriptionContainer = styled.div`
  max-height: 200px; /* Maximum height for the description */
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 16px;
`;

const ProductDetail = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  if (!product) {
    return (
      <StyledCard hoverable>
        <Title level={3}>Product not found</Title>
      </StyledCard>
    );
  }

  return (
    <div>
      <StyledCard hoverable style={{ marginTop: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={12}>
            <ProductImage alt={product.name} src={product.image} />
          </Col>

          <Col xs={24} sm={24} md={16} lg={12}>
            <Title level={2}>{product.name}</Title>
            <Text>
              {product.brand} - {product.model}
            </Text>
            <Title level={3} style={{ marginTop: "16px" }}>
              {product.price} $
            </Title>
            <Button
              type="primary"
              style={{ backgroundColor: "#007BFF", borderColor: "#007BFF" }}
              onClick={() => onAddToCart(product)}
              size="large"
            >
              Add to Cart
            </Button>
            <Divider />

            {/* Description with scroll if it's too long */}
            <DescriptionContainer>
              <Text>{product.description}</Text>
            </DescriptionContainer>
          </Col>
        </Row>
      </StyledCard>

      <Row justify="start" style={{ marginBottom: "10px" }}>
        <Col>
          <GoBackButton
            type="default"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            <ArrowLeftOutlined style={{ marginRight: "8px" }} />
            Go Back
          </GoBackButton>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
