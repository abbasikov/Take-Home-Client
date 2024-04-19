/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosBaseUrl } from '../../config/axios/axios-configuration';

const axios = axiosBaseUrl();

export const CreateShortenedUrl = createAsyncThunk('url/create', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/url/create', data);

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

export const GetUserUrlHistory = createAsyncThunk('url/history', async (data, thunkAPI) => {
  try {
    const response = await axios.get('/url/history', {
      params: {
        userId: data?.userId,
      },
    });

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

export const UpdateUserUrl = createAsyncThunk('url/update', async (data, thunkAPI) => {
  try {
    const response = await axios.put(
      '/url/update',
      {},
      {
        params: {
          urlId: data?.urlId,
        },
      },
    );

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

export const DeleteUserUrl = createAsyncThunk('url/delete', async (data, thunkAPI) => {
  try {
    const response = await axios.delete('/url/delete', {
      params: {
        urlId: data?.urlId,
      },
    });

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

const url = createSlice({
  name: 'url',
  initialState: {
    url: {
      actualUrl: '',
      shortenedUrl: '',
      urlHistory: [],
    },
    message: '',
    urlHistory: [],
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
        url: {
          actualUrl: '',
          shortenedUrl: '',
          urlHistory: [],
        },
        urlHistory: [],
        success: '',
        err: false,
        loading: false,
        token: '',
        userId: '',
      };
    },
    logout: state => ({
      url: {
        actualUrl: '',
        shortenedUrl: '',
        urlHistory: [],
      },
      urlHistory: [],
      success: '',
      err: false,
      loading: false,
      token: '',
      userId: '',
    }),
  },
  extraReducers: {
    [CreateShortenedUrl.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [CreateShortenedUrl.fulfilled]: (state, action) => ({
      success: true,
      message: action.payload.message || '',
      loading: false,
      url: {
        actualUrl: action.payload.actualUrl,
        shortenedUrl: action.payload.shortenedUrl,
        urlHistory: action.payload.urlHistory,
      },
    }),
    [CreateShortenedUrl.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.message || 'Something Went Wrong, Please Try Again',
    }),
    [UpdateUserUrl.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [UpdateUserUrl.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      success: true,
      message: action.payload.message || 'Url Edited Successfuly',
    }),
    [UpdateUserUrl.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.error || 'Something Went Wrong, Please Try Again',
    }),
    [DeleteUserUrl.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [DeleteUserUrl.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      success: true,
      message: action.payload.message || 'Url Deleted Successfuly',
    }),
    [DeleteUserUrl.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.error || 'Something Went Wrong, Please Try Again',
    }),
    [GetUserUrlHistory.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GetUserUrlHistory.fulfilled]: (state, action) => {
      return {
        loading: false,
        urlHistory: action.payload,
      };
    },
    [GetUserUrlHistory.rejected]: (state, action) => ({
      ...state,
      success: false,
      loading: false,
      err: action.payload.err?.error || 'Something Went Wrong, Please Try Again',
    }),
  },
});

const { reducer, actions } = url;

export const { SetState, ClearState, logout } = actions;

export default reducer;
