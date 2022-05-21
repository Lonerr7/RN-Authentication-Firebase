import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: () => {},
    logOut: () => {},
  },
});

export const { authenticate, logOut } = userSlice.actions;
export default userSlice.reducer;
