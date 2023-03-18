import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/api";

export interface Farm {
  name: string;
  areaSize: number;
  id: string;
  location: {
    id: string;
    name: string;
    region: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
}

interface FarmsState {
  farms: Farm[];
}

const initialState: FarmsState = {
  farms: [],
};

export const fetchFarms = createAsyncThunk(
  "farms/fetchFarms",
  async ({
    name,
    locationId,
    userId,
  }: {
    name?: string;
    locationId?: string;
    userId?: string;
  }) => {
    const response = await api.getFarms({ name, locationId, userId });

    return response.data.farms;
  }
);

const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFarms.fulfilled, (state, action) => {
      state.farms = action.payload;
    });
  },
});

export default farmsSlice.reducer;
