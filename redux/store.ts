// redux/store.ts
import globalReducer, { setLoading } from '@/redux/globalSlice';
import { tmdbApi } from '@/redux/tmdb';
import {
  configureStore,
  isFulfilled,
  isPending,
  isRejected,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

// Middleware: loader
const loadingMiddleware: Middleware<{}, any> = (store: MiddlewareAPI) => next => (action: any) => {
  if (!action || typeof action.type !== 'string') return next(action);

  // Extract endpoint name
  const endpoint = action?.meta?.arg?.endpointName;

  // Only handle RTK Query actions for "getTrendingMovies"
  if (endpoint === 'getTrendingMovies') {
    if (isPending(action)) {
      store.dispatch(setLoading(true));
    } else if (isFulfilled(action) || isRejected(action)) {
      store.dispatch(setLoading(false));
    }
  }

  return next(action);
};

// Store configuration
export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    global: globalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tmdbApi.middleware).concat(loadingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
