// components/Filters.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/productsSlice'; // setFilters import ediliyor

const Filters = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Tek input üzerinden hem brand hem de model için filtreleme
    dispatch(setFilters(value)); // Arama terimi Redux'a gönderiliyor
  };

  return (
    <div className="filters">
      <h3>Filter Products</h3>
      <div className="filter-group">
        <label htmlFor="search">Search by brand or model:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by brand or model"
        />
      </div>
    </div>
  );
};

export default Filters;
