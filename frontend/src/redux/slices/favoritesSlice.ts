// src/redux/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clothes } from "../../app/api/clothes/clothesService";

interface FavoritesState {
  items: Clothes[];
}

const loadFavoritesFromLocalStorage = (): Clothes[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: FavoritesState = {
  items: loadFavoritesFromLocalStorage(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Clothes>) => {
      if (!state.items.some(item => item._id === action.payload._id)) {
        state.items.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;