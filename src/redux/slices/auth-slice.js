/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosBaseUrl } from '../../config/axios/axios-configuration';

const axios = axiosBaseUrl();

export const SignUp = createAsyncThunk('auth/signUp', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/register', user);

    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return thunkAPI.rejectWithValue({
        err: err.response.data,
        status: err.response.status,
      });
    }
    return thunkAPI.rejectWithValue({
      err: 'Network Error',
    });
  }
});

export const SignIn = createAsyncThunk('auth/signIn', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', user);

    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return thunkAPI.rejectWithValue({
        err: err.response.data,
        status: err.response.status,
      });
    }
    return thunkAPI.rejectWithValue({
      err: 'Network Error',
    });
  }
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    name: '',
    email: '',
    message: '',
    success: '',
    err: false,
    loading: false,
    token: '',
    userId: '',
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    ClearState() {
      return {
        name: '',
        email: '',
        message: '',
        success: '',
        err: false,
        loading: false,
        token: '',
        userId: '',
      };
    },
    logout: state => ({
      name: '',
      email: '',
      message: '',
      success: '',
      err: false,
      loading: false,
      token: '',
      userId: '',
    }),
  },
  extraReducers: {
    [SignUp.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [SignUp.fulfilled]: (state, action) => ({
      success: true,
      message: action.payload.message,
      loading: false,
      token: action.payload.data.token,
      name: action.payload.data.user.name,
      email: action.payload.data.user.email,
      userId: action.payload.data.user._id,
    }),
    [SignUp.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.message || 'Something Went Wrong, Please Try Again',
    }),
    [SignIn.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [SignIn.fulfilled]: (state, action) => ({
      success: true,
      loading: false,
      name: action.payload.data.user.name,
      email: action.payload.data.user.email,
      userId: action.payload.data.user._id,
      token: action.payload.data.token,
    }),
    [SignIn.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.error || 'Something Went Wrong, Please Try Again',
    }),
  },
});

const { reducer, actions } = auth;

export const { SetState, ClearState, logout } = actions;

export default reducer;
