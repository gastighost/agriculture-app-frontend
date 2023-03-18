import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/api";

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface LocationsState {
  locations: Location[];
  location: null | Location;
}

const initialState: LocationsState = {
  locations: [],
  location: null,
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

export const fetchLocation = createAsyncThunk(
  "locations/fetchLocation",
  async (locationId: string) => {
    const response = await api.getLocation(locationId);

    return response.data.location;
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      .addCase(fetchLocation.pending, (state) => {
        state.location = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.location = action.payload;
      });
  },
});

export default locationsSlice.reducer;
