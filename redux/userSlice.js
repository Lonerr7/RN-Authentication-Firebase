import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/api';
import { alertFunction } from '../helpers/helpers';

const initialState = {
  token: '',
  isAuthenticated: false,
  isFetching: false,
  isAuthenticated: false,
  databaseMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = '';
      state.isAuthenticated = false;
      state.databaseMessage = '';
    },
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
      })
      .addCase(registerOrLogInThunk.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(getDatabaseMessageThunk.fulfilled, (state, action) => {
        state.databaseMessage = action.payload;
      });
  },
});

export const registerOrLogInThunk = createAsyncThunk(
  'user/authThunk',
  async function ({ mode, email, password }, { rejectWithValue }) {
    if (mode === 'register') {
      try {
        const response = await authApi.createUser(email, password);
        if (!response) throw new Error('Wrong response');
        return { mode, data: response.data };
      } catch (error) {
        alertFunction(error.message);
      }
    } else if (mode === 'logIn') {
      try {
        const response = await authApi.login(email, password);
        if (!response) throw new Error('Wrong response');
        // console.log(response.data);
        return { mode, data: response.data };
      } catch (error) {
        alertFunction(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getDatabaseMessageThunk = createAsyncThunk(
  'user/getDatabaseMessageThunk',
  async function ({ token }) {
    const response = await authApi.getDatabaseMessage(token);
    console.log(response.data);

    return response.data;
  }
);

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
