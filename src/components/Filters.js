import React, { useState } from "react";
import { Card, Select, Radio } from "antd";

const Filters = ({ items, onFiltersChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [sortOption, setSortOption] = useState("oldToNew");

  // Unique Brands and Models
  const brands = [...new Set(items.map((item) => item.brand))].sort((a, b) =>
    a.localeCompare(b)
  );
  const models = [...new Set(items.map((item) => item.model))].sort((a, b) =>
    a.localeCompare(b)
  );

  // Handle Brand Change
  const handleBrandChange = (value) => {
    setSelectedBrands(value);
    onFiltersChange({ brands: value, models: selectedModels, sortOption });
  };

  // Handle Model Change
  const handleModelChange = (value) => {
    setSelectedModels(value);
    onFiltersChange({ brands: selectedBrands, models: value, sortOption });
  };

  // Handle Sort Change
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onFiltersChange({
      brands: selectedBrands,
      models: selectedModels,
      sortOption: option,
    });
  };

  return (
    <div className="filters">
      <h3>Filter Products</h3>

      {/* Sort By */}
      <Card title="Sort By" style={{ marginBottom: "20px" }}>
        <Radio.Group onChange={handleSortChange} value={sortOption}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Radio value="oldToNew">Old to New</Radio>
            <Radio value="newToOld">New to Old</Radio>
            <Radio value="priceHighToLow">Price High to Low</Radio>
            <Radio value="priceLowToHigh">Price Low to High</Radio>
          </div>
        </Radio.Group>
      </Card>

      {/* Brands Filter */}
      <Card title="Brands" style={{ marginBottom: "20px" }}>
        <Select
          mode="multiple"
          value={selectedBrands}
          onChange={handleBrandChange}
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

      {/* Models Filter */}
      <Card title="Models" style={{ marginBottom: "20px" }}>
        <Select
          mode="multiple"
          value={selectedModels}
          onChange={handleModelChange}
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
