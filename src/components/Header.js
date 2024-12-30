import React from "react";
import { Input, Button, Layout, Row, Col, Avatar } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ searchTerm, setSearchTerm, onCartClick, totalAmount }) => {
  return (
    <AntHeader
      style={{
        backgroundColor: "#007bff",
        padding: "0",
        margin: "0",
        height: "64px",
      }}
    >
      <Row
        align="middle"
        justify="space-between"
        style={{
          height: "100%",
          padding: "0 20px",
          flexWrap: "nowrap",
        }}
      >
        {/* Logo */}
        <Col xs={8} sm={6} md={6}>
          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: "20px",
              textAlign: "left",
            }}
          >
            E-Commerce App
          </h2>
        </Col>

        {/* Search Bar */}
        <Col xs={12} sm={12} md={12}>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
            style={{
              width: "50%",
            }}
            prefix={<SearchOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />}
          />
        </Col>

        {/* Cart and User Info */}
        <Col xs={4} sm={6} md={6} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={onCartClick}
            style={{ marginRight: "10px" }}
          >
            {totalAmount} $
          </Button>
          <Avatar icon={<UserOutlined />} />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
