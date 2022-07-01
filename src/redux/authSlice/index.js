import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const fetchUser = () => async (dispatch) => {
  await axios
    .get("/secret")
    .then((res) => {
      const userData = res && res.data;
      localStorage.setItem("auth", JSON.stringify(userData));
      dispatch(setUser(userData));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default authSlice;
