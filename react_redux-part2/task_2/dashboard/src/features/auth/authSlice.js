import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: ''
  },
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: function(state, action) {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.isLoggedIn = true
    },
    logout: function(state, action) {
      state.user.email = '';
      state.user.password = '';
      state.isLoggedIn = false
    }
  }
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
