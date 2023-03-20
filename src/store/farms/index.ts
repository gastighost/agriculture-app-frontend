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

export interface Weather {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface Soil {
  date: string;
  pH: number;
  moisture: number;
  fertility: number;
}

export interface FarmDetailed {
  id: string;
  name: string;
  locationId: string;
  areaSize: number;
  weather: Weather[];
  soil: Soil[];
  userId: string;
}

interface FarmsState {
  farms: Farm[];
  farm: FarmDetailed | null;
}

const initialState: FarmsState = {
  farms: [],
  farm: null,
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

export const fetchFarm = createAsyncThunk(
  "farms/fetchFarm",
  async (farmId: string) => {
    const response = await api.getFarm(farmId);

    return response.data.farm;
  }
);

const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarms.fulfilled, (state, action) => {
        state.farms = action.payload;
      })
      .addCase(fetchFarm.fulfilled, (state, action) => {
        state.farm = action.payload;
      });
  },
});

export default farmsSlice.reducer;
