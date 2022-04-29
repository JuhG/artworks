import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import artworkSlice from "redux/artworkSlice";
import favoriteSlice from "redux/favoriteSlice";

const store = configureStore({
  reducer: {
    artwork: artworkSlice,
    favorite: favoriteSlice,
  },
});

export default store;

// these are copied from https://redux.js.org/tutorials/typescript-quick-start

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
