import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  list: number[];
}
const initialState: FavoriteState = {
  list: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.list = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      state.list.push(action.payload);
      updateLocalStorage(state);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item !== action.payload);
      updateLocalStorage(state);
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;

const updateLocalStorage = (state: FavoriteState) => {
  localStorage.setItem("favorite", JSON.stringify(state.list));
};
