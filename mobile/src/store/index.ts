import { configureStore } from '@reduxjs/toolkit';
import problemsReducer from './slices/problemsSlice';
import userReducer from './slices/userSlice';
import subjectsReducer from './slices/subjectsSlice';

export const store = configureStore({
  reducer: {
    problems: problemsReducer,
    user: userReducer,
    subjects: subjectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
