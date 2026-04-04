import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import custom components
import productReducer from '../reducers/products';
import cartReducer from '../reducers/cart';
import filtersReducer from '../reducers/filters';
import wishlistReducer from '../reducers/wishlist';
import compareReducer from '../reducers/compare';
import tagReducer from '../reducers/tags';
import { IntlReducer as Intl } from 'react-redux-multilingual';
import translations from '../constants/translations';

const rootReducer = combineReducers({
  data: productReducer,
  tags: tagReducer,
  cartList: cartReducer,
  filters: filtersReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  Intl,
});

// Helper functions for localStorage (client-side only)
function saveToLocalStorage(state: RootState) {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    }
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage(): RootState | undefined {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    }
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export const makeStore = () => {
  const persistedState = loadFromLocalStorage();

  // Initialize Intl state with translations if not in persisted state
  const initialState = persistedState || {
    Intl: {
      locale: 'en',
      translations: translations,
    },
  };

  // Merge persisted state with Intl translations if Intl is missing
  const preloadedState = persistedState
    ? {
        ...persistedState,
        Intl: persistedState.Intl || {
          locale: 'en',
          translations: translations,
        },
      }
    : initialState;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        // thunk is included by default in Redux Toolkit
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });

  // Subscribe to store changes and save to localStorage
  store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

// Made with Bob
