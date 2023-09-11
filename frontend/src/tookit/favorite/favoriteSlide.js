import { createSlice } from "@reduxjs/toolkit";

const favoriteSlide = createSlice({
  name: "favorites",
  initialState: {
    listFavorite: [],
  },
  reducers: {
    addToList: (state, { payload }) => {
      state.listFavorite.push(payload);
    },
    removeFromList: (state, { payload }) => {
      const index = state.listFavorite.findIndex((x) => x._id === payload);
      state.listFavorite.splice(index, 1);
    },
  },
});

export default favoriteSlide;

export const getListFavorite = (state) => state.listFavorite;
