import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  cartItems: [],
  billsData: [],
  productData: [],
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addToCart: (state, action) => {
      const isCart = state.cartItems.find(
        (product) => product._id === action.payload._id
      );

      if (!isCart) {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === action.payload._id
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product._id !== action.payload._id
      );
    },
    setBillsData: (state, action) => {
      state.billsData = action.payload;
    },
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  addToCart,
  updateCart,
  deleteFromCart,
  setBillsData,
  setProductData,
} = cartItemsSlice.actions;

export const getAllBills = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { data } = await axios.get('/api/bills/getbills');
    dispatch(setBillsData(data));
    dispatch(hideLoading());
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { data } = await axios.get('/api/products/getproducts');
    dispatch(setProductData(data));
    dispatch(hideLoading());
  } catch (error) {
    console.log(error);
    dispatch(hideLoading());
  }
};

export const deleteProduct = (record) => async (dispatch) => {
  try {
    dispatch(showLoading());
    await axios.post('/api/products/deleteproducts', {
      productId: record._id,
    });

    dispatch(hideLoading());
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};

export const handlerToCart = (product) => (dispatch) => {
  dispatch(addToCart({ ...product, quantity: 1 }));
};

export default cartItemsSlice;
