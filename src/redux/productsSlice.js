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
  },
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload; // Initially set filtered items to all fetched items
        
        // Dynamically populate brands and models (using IDs here)
        const uniqueBrands = [...new Set(action.payload.map(product => product.id))].sort();
        const uniqueModels = [...new Set(action.payload.map(product => product.id))].sort();
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
