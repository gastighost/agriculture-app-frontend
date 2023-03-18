import { configureStore } from "@reduxjs/toolkit";
import locations from "./locations";
import farms from "./farms";
import users from "./users";

const store = configureStore({
  reducer: {
    locations,
    farms,
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
