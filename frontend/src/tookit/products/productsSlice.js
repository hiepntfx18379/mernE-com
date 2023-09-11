import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    listProducts: [],
  },
  reducers: {
    listDataProducts: (state, action) => {
      state.listProducts = action.payload;
    },
  },
});

export default productSlice;

export const quantityPro = (state) => state.listProducts.listProducts;
