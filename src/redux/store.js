import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "./cartItemsSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: { cartItems: cartItemsSlice.reducer, authSlice: authSlice.reducer },
});

export default store;
