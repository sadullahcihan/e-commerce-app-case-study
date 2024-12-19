import React from "react";
import { Input, Button, Layout, Row, Col } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ searchTerm, setSearchTerm, onCartClick }) => {
  return (
    <AntHeader style={{ backgroundColor: "#007bff", padding: "0", margin: "0" }}>
      <Row align="middle" justify="space-between" style={{ height: "100%", padding: "0 20px" }}>
        <Col span={3}>
          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Eteration
          </div>
        </Col>

        <Col span={6}>
        <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%" }}
            prefix={<SearchOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
          />
        </Col>

        <Col span={3} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={onCartClick}
          >
            Go to Cart
          </Button>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
