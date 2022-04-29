import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artwork, fetchArtwork, fetchArtworks, Pagination, searchArtwork } from "api";
import { AppThunk } from "redux/store";

// Having a separate list and cache is just a lazy solution
// It would be probably better to
//   - normalize the data in cache
//   - store the ids that are currently visible
//   - fetch all missing items at once
// Or just use a proper library like react-query or the built-in RTK query

interface ArtworkState {
  list: Artwork[];
  cache: Artwork[];
  search: string;
  pagination: Pagination;
}
const initialState: ArtworkState = {
  list: [],
  cache: [],
  search: "",
  pagination: {
    current_page: 1,
    limit: 25,
    total_pages: 1,
  },
};

export const artworkSlice = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    setArtworks: (state, action: PayloadAction<Artwork[]>) => {
      state.list = action.payload;
    },
    addToCache: (state, action: PayloadAction<Artwork | Artwork[]>) => {
      if (Array.isArray(action.payload)) {
        state.cache = [...state.cache, ...action.payload];
      } else {
        state.cache.push(action.payload);
      }
    },
    setPagination: (state, action: PayloadAction<Partial<Pagination>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
      updateUrl(state);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.pagination.current_page = 1;
      updateUrl(state);
    },
    clearSearch: (state) => {
      state.search = "";
      state.pagination.current_page = 1;
      updateUrl(state);
    },
  },
});

export const { setArtworks, addToCache, setPagination, setSearch, clearSearch } = artworkSlice.actions;
export default artworkSlice.reducer;

const updateUrl = (state: ArtworkState) => {
  const query = new URLSearchParams({
    current_page: String(state.pagination.current_page),
    limit: String(state.pagination.limit),
    q: state.search,
  });
  history.replaceState(null, "", "?" + query.toString());
};

export const loadPage = (): AppThunk => {
  return async (dispatch, getState) => {
    if (getState().artwork.search) {
      const response = await searchArtwork(getState().artwork.search, getState().artwork.pagination);
      dispatch(setArtworks(response.data));
      dispatch(addToCache(response.data));
      dispatch(setPagination({ total_pages: response.pagination.total_pages }));
    } else {
      const response = await fetchArtworks(getState().artwork.pagination);
      dispatch(setArtworks(response.data));
      dispatch(addToCache(response.data));
      dispatch(setPagination({ total_pages: response.pagination.total_pages }));
    }
  };
};

export const loadItem = (id: number): AppThunk => {
  return async (dispatch) => {
    const response = await fetchArtwork(id);
    dispatch(addToCache(response.data));
  };
};
