import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    increaseQuantity(state, action) {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;