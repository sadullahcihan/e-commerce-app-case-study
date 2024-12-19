import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous API call to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    status: 'idle',
    searchTerm: '',
    sortBy: '', // Added for storing sort option
    brands: [], // Brands are now dynamically populated
    models: [], // Models are now dynamically populated
  },
  reducers: {
    // Set filters for search term, sort by, brands, and models
    setFilters: (state, action) => {
      const { searchTerm, sortBy, brands, models } = action.payload;

      // Update the state with the new filter values
      state.searchTerm = searchTerm;
      state.sortBy = sortBy;
      state.brands = brands;
      state.models = models;

      // Apply filtering logic
      let filteredItems = state.items.filter((product) => {
        const matchesSearchTerm =
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.model.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBrand = brands.length ? brands.includes(product.brand) : true;
        const matchesModel = models.length ? models.includes(product.model) : true;

        return matchesSearchTerm && matchesBrand && matchesModel;
      });

      // Sorting based on sort criteria
      if (sortBy) {
        filteredItems = filteredItems.sort((a, b) => {
          switch (sortBy) {
            case 'old-to-new':
              return new Date(a.createdAt) - new Date(b.createdAt); // Sorting by createdAt
            case 'new-to-old':
              return new Date(b.createdAt) - new Date(a.createdAt); // Sorting by createdAt
            case 'price-high-to-low':
              return b.price - a.price; // Sorting by price descending
            case 'price-low-to-high':
              return a.price - b.price; // Sorting by price ascending
            default:
              return 0;
          }
        });
      }

      // Update the filteredItems state
      state.filteredItems = filteredItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload; // Initially set filtered items to all fetched items
        
        // Dynamically populate brands and models
        const uniqueBrands = [...new Set(action.payload.map(product => product.brand))].sort();
        const uniqueModels = [...new Set(action.payload.map(product => product.model))].sort();
        
        state.brands = uniqueBrands;
        state.models = uniqueModels;

        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilters } = productsSlice.actions;
export default productsSlice.reducer;
