import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/api";

export interface Crop {
  id: string;
  name: string;
  plantingDate: string;
  harvestDate: string;
  status: string;
  area: number;
  farmId: string;
}

interface CropsState {
  crops: Crop[];
  crop: Crop | null;
}

const initialState: CropsState = {
  crops: [],
  crop: null,
};

export const fetchCrops = createAsyncThunk(
  "crops/fetchCrops",
  async (cropQuery: {
    name?: string;
    plantingDate?: string;
    harvestDate?: string;
    status?: string;
    area?: number;
    farmId?: string;
  }) => {
    const response = await api.getCrops(cropQuery);

    return response.data.crops;
  }
);

const cropsSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCrops.fulfilled, (state, action) => {
      state.crops = action.payload;
    });
  },
});

export default cropsSlice.reducer;
