import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#007BFF" : "#f0f0f0",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "1px solid #007bff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
