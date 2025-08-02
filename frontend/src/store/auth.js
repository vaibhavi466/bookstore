
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "user",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true"); 
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
    },
    changeRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
