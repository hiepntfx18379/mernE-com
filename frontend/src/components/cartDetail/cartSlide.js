import { createSelector, createSlice } from "@reduxjs/toolkit";

const findIndexPro = (id, arr) => {
  return arr.findIndex((pro) => pro.idProduct === id);
};

export const cartSlide = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
    productUpdate: "",
  },
  reducers: {
    ADD_PRO: (state, action) => {
      if (state.listCart.length > 0) {
        let index = findIndexPro(action.payload.idProduct, state.listCart);
        if (index !== -1) {
          state.listCart[index].quatity += action.payload.quatity;
        } else {
          state.listCart.push(action.payload);
        }
      } else {
        state.listCart.push(action.payload);
      }
    },
    UP_QUAN_PRO: (state, action) => {
      let index = findIndexPro(action.payload.idProduct, state.listCart);
      if (index !== -1) {
        if (action.payload.type === "decre") {
          if (state.listCart[index].quatity < 2) {
            state.listCart[index].quatity = 1;
          } else {
            state.listCart[index].quatity -= 1;
          }
        } else {
          state.listCart[index].quatity += 1;
        }
      }
    },
    DEL_PRO: (state, action) => {
      let index = findIndexPro(action.payload.idProduct, state.listCart);
      state.listCart.splice(index, 1);
    },

    LIST_PRO: (state, action) => {
      state.listCart = action.payload.list;
    },
  },
});

// selector
export const listCartSelector = (state) => state.cart.listCart;
export const aNumberOfProducts = (state) => state.cart.numberProducts;

export const totalProductsSelector = createSelector(
  listCartSelector,
  (list) => {
    return list.reduce(
      (totalPrice, currentNumber) => totalPrice + currentNumber.quatity,
      0,
    );
  },
);

export const totalPriceSelector = createSelector(listCartSelector, (list) => {
  return list.reduce(
    (totalPrice, currentPrice) =>
      totalPrice + currentPrice.quatity * parseInt(currentPrice.product.price),
    0,
  );
});
