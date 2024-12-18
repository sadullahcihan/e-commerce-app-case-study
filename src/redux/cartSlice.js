// import { createSlice } from '@reduxjs/toolkit';
localStorage.clear();
// const initialState = {
//   items: JSON.parse(localStorage.getItem('cart')) || [],
// };
// //clear
// localStorage.clear(); 
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       localStorage.setItem('cart', JSON.stringify(state.items)); // LocalStorage güncelleme
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//       localStorage.setItem('cart', JSON.stringify(state.items)); // LocalStorage güncelleme
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//         localStorage.setItem('cart', JSON.stringify(state.items)); // LocalStorage güncelleme
//       }
//     },
//     clearCart: (state) => {
//       state.items = []; // Sepeti boşalt
//       localStorage.setItem('cart', JSON.stringify(state.items)); // LocalStorage güncelleme
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
