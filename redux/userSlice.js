import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/api';
import { alertFunction } from '../helpers/helpers';

const initialState = {
  token: '',
  isAuthenticated: false,
  isFetching: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticate: () => {},
    logOut: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOrLogInThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerOrLogInThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        state.token = action.payload.data.idToken;
        state.isAuthenticated = true;
      });
  },
});

export const registerOrLogInThunk = createAsyncThunk(
  'user/authThunk',
  async function ({ mode, email, password }) {
    if (mode === 'register') {
      try {
        const response = await authApi.createUser(email, password);
        return { mode, data: response.data };
      } catch (error) {
        alertFunction();
      }
    } else if (mode === 'logIn') {
      try {
        const response = await authApi.login(email, password);
        return { mode, data: response.data };
      } catch (error) {
        alertFunction();
      }
    }
  }
);

export const { authenticate, logOut } = userSlice.actions;
export default userSlice.reducer;
