import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asenkron API çağrısı
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { 
    items: [], 
    status: 'idle', 
    searchTerm: '' // Arama terimi ekleniyor
  },
  reducers: {
    // Filtreleme işlemi
    setFilters: (state, action) => {
      state.searchTerm = action.payload;  // Arama terimi set ediliyor
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilters } = productsSlice.actions; // setFilters'ı export ediyoruz
export default productsSlice.reducer;
