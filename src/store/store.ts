import { configureStore } from "@reduxjs/toolkit";
import locations from "./locations";

const store = configureStore({
  reducer: { locations },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
