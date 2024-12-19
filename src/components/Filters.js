import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/productsSlice";
import { Card, Select, Radio } from "antd";

const Filters = () => {
  const dispatch = useDispatch();
  const { items, searchTerm, sortBy } = useSelector((state) => state.products); // Redux state'ten alınan veriler
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  // Markalar ve modelleri elde et
  const brands = [...new Set(items.map((item) => item.brand))].sort();
  const models = [...new Set(items.map((item) => item.model))].sort();

  // Handle Sort By Radio Change
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    dispatch(
      setFilters({
        searchTerm,
        sortBy: sortValue,
        brands: selectedBrands,
        models: selectedModels,
      })
    );
  };

  // Handle Brand Selection Change
  const handleBrandChange = (value) => {
    setSelectedBrands(value); // Update selected brands
    dispatch(
      setFilters({ searchTerm, sortBy, brands: value, models: selectedModels })
    ); // Trigger filter update
  };

  // Handle Model Selection Change
  const handleModelChange = (value) => {
    setSelectedModels(value); // Update selected models
    dispatch(
      setFilters({ searchTerm, sortBy, brands: selectedBrands, models: value })
    ); // Trigger filter update
  };

  return (
    <div className="filters">
      <h3>Filter Products</h3>

      {/* Sort By Filter - Card Component */}
      <Card title="Sort By" style={{ marginBottom: "20px" }}>
        <Radio.Group
          value={sortBy}
          onChange={handleSortChange}
          style={{ width: "100%" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Radio value="old-to-new">Old to New</Radio>
            <Radio value="new-to-old">New to Old</Radio>
            <Radio value="price-high-to-low">Price High to Low</Radio>
            <Radio value="price-low-to-high">Price Low to High</Radio>
          </div>
        </Radio.Group>
      </Card>

      {/* Brands Filter - Card Component */}
      <Card title="Brands" style={{ marginBottom: "20px" }}>
        <Select
          mode="multiple"
          value={selectedBrands} // Ensure the selected brands are reflected in the UI
          onChange={handleBrandChange} // Update brands on change
          placeholder="Select brands"
          style={{ width: "100%" }}
          allowClear
        >
          {brands.map((brand) => (
            <Select.Option key={brand} value={brand}>
              {brand}
            </Select.Option>
          ))}
        </Select>
      </Card>

      {/* Model Filter - Card Component */}
      <Card title="Models" style={{ marginBottom: "20px" }}>
        <Select
          mode="multiple"
          value={selectedModels} // Ensure the selected models are reflected in the UI
          onChange={handleModelChange} // Update models on change
          placeholder="Select models"
          style={{ width: "100%" }}
          allowClear
        >
          {models.map((model) => (
            <Select.Option key={model} value={model}>
              {model}
            </Select.Option>
          ))}
        </Select>
      </Card>
    </div>
  );
};

export default Filters;
