import { configureStore } from "@reduxjs/toolkit";
import locations from "./locations";
import farms from "./farms";

const store = configureStore({
  reducer: {
    locations,
    farms,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
