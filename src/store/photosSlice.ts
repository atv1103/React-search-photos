import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRandomPhotos, searchPhotos } from "../api/unsplash";

interface Photo {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
  user: { name: string };
}

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  query: string;
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
  query: "",
};

export const loadRandomPhotos = createAsyncThunk(
  "photos/loadRandomPhotos",
  async () => {
    const response = await fetchRandomPhotos();
    return response.data as Photo[];
  }
);

export const loadSearchPhotos = createAsyncThunk(
  "photos/loadSearchPhotos",
  async (query: string) => {
    const response = await searchPhotos(query);
    return response.data.results as Photo[];
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearPhotos(state) {
      state.photos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRandomPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRandomPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(loadRandomPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load random photos";
      })
      .addCase(loadSearchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSearchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(loadSearchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search photos";
      });
  },
});

export const { setQuery, clearPhotos } = photosSlice.actions;
export default photosSlice.reducer;
