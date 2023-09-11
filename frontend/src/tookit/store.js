import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import productSlice from "./products/productsSlice";
import orderSlice from "./orders/orderSlice";
import favoriteSlide from "./favorite/favoriteSlide";

export const store = configureStore({
  reducer: {
    getUser: userSlice.reducer,
    listProducts: productSlice.reducer,
    orders: orderSlice.reducer,
    listFavorite: favoriteSlide.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
