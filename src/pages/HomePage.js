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

  // Redux state’den ürünleri ve sepeti alıyoruz
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const { items: cartItems } = useSelector((state) => state.cart);

  // Arama ve filtreleme için state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filtreleme için brand, model ve sıralama bilgisi
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    sortOption: "oldToNew",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Arama ve filtreleme uygulama
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

    // Sıralama uygulama
    if (filters.sortOption === "oldToNew") {
      updatedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortOption === "newToOld") {
      updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortOption === "priceHighToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortOption === "priceLowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, filters, products]);

  // Sepete ürün ekleme işlevi
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Toplam tutarı hesaplama
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Filters bileşeninden gelen değişiklikleri yönetme
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
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
          <Col span={6}>
            <Filters items={products} onFiltersChange={handleFiltersChange} />
          </Col>

          <Col span={12}>
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
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
