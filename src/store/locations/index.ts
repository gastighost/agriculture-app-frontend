import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/api";

interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface LocationsState {
  locations: Location[];
}

const initialState: LocationsState = {
  locations: [],
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (locationQuery: {
    name?: string;
    region?: string;
    country?: string;
  }) => {
    const response = await api.getLocations(locationQuery);

    return response.data.locations;
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
  },
});

export default locationsSlice.reducer;
