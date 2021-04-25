import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const slice = createSlice({
  name: "shop",
  initialState: {
    cart: [],
    favorites: []
  },
  reducers: {
    CART_LOAD(state, action) {
      const cart = action.payload.cart;
      if (cart) state.cart = cart;
    },
    FAVORITES_LOAD(state, action) {
      const favorites = action.payload.favorites;
      if (favorites) state.favorites = favorites;
    },
    FAVORITES_ADD(state, action) {
      const id = action.payload.id;
      const index = state.favorites.indexOf(id);
      if (index === -1) {
        state.favorites.push(id);
        message.success("Đã thêm vào danh sách yêu thích")
      }
      else {
        state.favorites.splice(index, 1);
        message.warn("Đã xóa khỏi danh sách yêu thích")
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    CART_ADD(state, action) {
      const id = action.payload.id;
      const index = state.cart.findIndex(i => i.id === id)
      if (index === -1) {
        state.cart.push({ id, quantity: 1 });
        message.success("Đã thêm vào giỏ hàng")
      }
      else {
        state.cart.splice(index, 1);
        message.warn("Đã xóa khỏi giỏ hàng")
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    CART_SET_QUANTITY(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cart.findIndex(i => i.id === id)
      state.cart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart))
    }
  }
});

const { actions, reducer } = slice;
export const { CART_LOAD, FAVORITES_LOAD, FAVORITES_ADD, CART_ADD,
  CART_SET_QUANTITY } = actions;
export default reducer;