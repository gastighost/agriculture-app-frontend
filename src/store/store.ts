import { configureStore } from "@reduxjs/toolkit";
import locations from "./locations";
import farms from "./farms";
import users from "./users";
import crops from "./crops";

const store = configureStore({
  reducer: {
    locations,
    farms,
    users,
    crops,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
