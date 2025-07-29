<<<<<<< HEAD

=======
// src/store/authSlice.js
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20

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
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
<<<<<<< HEAD
export default authSlice.reducer;
=======
export default authSlice.reducer;
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20
