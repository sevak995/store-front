import { configureStore } from '@reduxjs/toolkit';
import cartItemsSlice from './cartItemsSlice';

const store = configureStore({
  reducer: { cartItems: cartItemsSlice.reducer },
});

export default store;
