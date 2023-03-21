import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../common/api";

interface User {
  id: string;
  username: string;
}

interface UsersState {
  user: null | User;
  otherUsers: User[];
  activeChatUser: null | User;
}

const initialState: UsersState = {
  user: null,
  otherUsers: [],
  activeChatUser: null,
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await api.getProfile();

  return response.data.user;
});

export const fetchOtherUsers = createAsyncThunk(
  "users/fetchOtherUsers",
  async () => {
    const response = await api.getOtherUsers();

    return response.data.otherUsers;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeUser(state) {
      state.user = null;
    },
    selectChatUser(state, action) {
      state.activeChatUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchOtherUsers.fulfilled, (state, action) => {
        state.otherUsers = action.payload;
      });
  },
});

export const { removeUser, selectChatUser } = usersSlice.actions;

export default usersSlice.reducer;
