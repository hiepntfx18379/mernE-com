import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listProducts: [],
    allOrder: [],
  },
  reducers: {
    orderDataProducts: (state, { payload }) => {
      state.listProducts.push(payload);
    },
    increQuantityProduct: (state, { payload }) => {
      const pro = state.listProducts.find((x) => x._id === payload.id);
      pro.quantity += 1;
    },
    decreQuantityProduct: (state, { payload }) => {
      const pro = state.listProducts.find((x) => x._id === payload.id);
      if (pro.quantity > 1) {
        pro.quantity -= 1;
      } else {
        pro.quantity = 1;
      }
    },
    refeshCart: (state, { payload }) => {
      state.listProducts = payload;
    },
    removeOrder: (state, { payload }) => {
      const index = state.listProducts.indexOf((x) => x._id === payload.id);
      state.listProducts.splice(index, 1);
    },

    //all order
    allOrder: (state, { payload }) => {
      state.allOrder = payload.all;
    },
  },
});

export default orderSlice;

export const getAllOrderSelector = (state) => state.orders.allOrder;
