import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { addToCart } from "../redux/cartSlice";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Filters from "../components/Filters";
import { Col, Row, Layout, Spin, message } from "antd";
import Header from "../components/Header";

const { Content } = Layout;

const HomePage = () => {
  const dispatch = useDispatch();

  // Get products and cart from Redux state
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    sortOption: "oldToNew",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Optimize filtering and sorting operations with useMemo
  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    if (filters.brands.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    if (filters.models.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.models.includes(product.model)
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sıralama işlemi
    if (filters.sortOption === "oldToNew") {
      updatedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortOption === "newToOld") {
      updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortOption === "priceHighToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortOption === "priceLowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    return updatedProducts;
  }, [searchTerm, filters, products]);

  // Add product to cart function
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Calculate total amount of the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    message.error(`Error loading products: ${error}`);
    return <div>Error loading products.</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCartClick={() => console.log("Go to cart clicked!")}
        totalAmount={calculateTotalAmount()}
      />

      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6} md={4} lg={6}>
            <Filters items={products} onFiltersChange={handleFiltersChange} />
          </Col>

          <Col xs={24} sm={12} md={16} lg={12}>
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </Col>

          <Col xs={24} sm={6} md={4} lg={6}>
            <Cart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
