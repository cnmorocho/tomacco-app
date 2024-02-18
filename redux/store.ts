import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user';
import countdownReducer from './slices/countdown';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import locationReducer from './slices/location';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'location']
}

const rootReducer = combineReducers({
  user: userReducer,
  countdown: countdownReducer,
  location: locationReducer,
})
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
