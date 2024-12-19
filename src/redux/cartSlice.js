import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload || !action.payload.id) {
        console.warn("Invalid payload for addToCart:", action.payload);
        return;
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      state.items = filteredItems;
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (!id || quantity == null) {
        console.warn("Invalid payload for updateQuantity:", action.payload);
        return;
      }

      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // Eğer miktar 0 veya daha azsa, ürünü sepetten çıkar
          state.items = state.items.filter((item) => item.id !== id);
        }
        saveCartToLocalStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
