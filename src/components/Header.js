import React from "react";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> 
  );
};

export default Header;
