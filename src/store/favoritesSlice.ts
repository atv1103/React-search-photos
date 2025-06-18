import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
    [key: string]: string;
  };
  alt_description?: string;
  description?: string;
  user?: {
    name: string;
  };
  [key: string]: any;
}

export interface FavoritesState {
  items: Photo[];
}

const FAVORITES_STORAGE_KEY = 'favorites';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Photo>) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.items));
    },
    loadFavoritesFromStorage(state) {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      state.items = stored ? JSON.parse(stored) : [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  loadFavoritesFromStorage,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
