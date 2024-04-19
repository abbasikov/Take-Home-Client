import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authSlice from '../slices/auth-slice';
import urlSlice from '../slices/url-sclice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'pipelines'],
  transforms: [],
};

const reducers = combineReducers({
  auth: authSlice,
  url: urlSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});
