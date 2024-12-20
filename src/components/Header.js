import React from "react";
import { Input, Button, Layout, Row, Col, Avatar } from "antd";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ searchTerm, setSearchTerm, onCartClick, totalAmount }) => {
  return (
    <AntHeader style={{ backgroundColor: "#007bff", padding: "0", margin: "0" }}>
      <Row align="middle" justify="space-between" style={{ height: "100%", padding: "0 20px" }}>
        {/* Logo */}
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

        {/* Search Bar */}
        <Col span={6}>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%" }}
            prefix={<SearchOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
          />
        </Col>

        {/* Cart and User Info */}
        <Col span={6} style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "20px" }}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={onCartClick}
          >
            {totalAmount} $
          </Button>
          <div style={{ display: "flex", alignItems: "center", color: "white" }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#1890ff", marginRight: "8px" }} />
            <span>Sadullah Cihan</span>
          </div>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
