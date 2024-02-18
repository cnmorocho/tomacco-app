import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user';
import countdownReducer from './slices/countdown';

export const store = configureStore({
  reducer: {
    user: userReducer,
    countdown: countdownReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
