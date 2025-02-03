import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  quantity: number;
  name: string;
  unitPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
}
const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce(
        (total, item) =>
          Number(total) + Number(item.unitPrice) * Number(item.quantity),
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;

      state.items = state.items.filter((item) => item.id !== id);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
