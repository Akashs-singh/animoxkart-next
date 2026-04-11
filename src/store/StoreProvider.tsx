'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { getAllProducts, getAllTags } from '../actions';

// Cache duration: 6 hours in milliseconds
const CACHE_DURATION = 1 * 60 * 60 * 1000;
// const CACHE_DURATION = 1 * 60  ; // 1 minute for testing
const PRODUCTS_CACHE_KEY = 'products_cache';
const TAGS_CACHE_KEY = 'tags_cache';
const PRODUCTS_TIMESTAMP_KEY = 'products_timestamp';
const TAGS_TIMESTAMP_KEY = 'tags_timestamp';

// Helper function to check if cache is valid
const isCacheValid = (timestampKey: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const timestamp = localStorage.getItem(timestampKey);
  if (!timestamp) return false;
  
  const cacheTime = parseInt(timestamp, 10);
  const currentTime = Date.now();
  
  return (currentTime - cacheTime) < CACHE_DURATION;
};

// Helper function to encode data (handles Unicode)
const encodeData = (data: any): string => {
  const jsonString = JSON.stringify(data);
  // Convert to base64 with Unicode support
  return btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
};

// Helper function to decode data (handles Unicode)
const decodeData = (encoded: string): any => {
  // Decode base64 with Unicode support
  const jsonString = decodeURIComponent(
    atob(encoded).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')
  );
  return JSON.parse(jsonString);
};

// Helper function to get cached data
const getCachedData = (cacheKey: string) => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(cacheKey);
    return cached ? decodeData(cached) : null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

// Helper function to set cached data
const setCachedData = (cacheKey: string, timestampKey: string, data: any) => {
  if (typeof window === 'undefined') return;
  
  try {
    const encoded = encodeData(data);
    localStorage.setItem(cacheKey, encoded);
    localStorage.setItem(timestampKey, Date.now().toString());
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  const initialized = useRef(false);
  
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (!initialized.current && storeRef.current) {
      const store = storeRef.current;
      
      // Load products
      if (isCacheValid(PRODUCTS_TIMESTAMP_KEY)) {
        const cachedProducts = getCachedData(PRODUCTS_CACHE_KEY);
        if (cachedProducts) {
          store.dispatch({ type: 'RECEIVE_PRODUCTS', products: cachedProducts });
        } else {
          store.dispatch(getAllProducts());
        }
      } else {
        store.dispatch(getAllProducts());
      }
      
      // Load tags
      if (isCacheValid(TAGS_TIMESTAMP_KEY)) {
        const cachedTags = getCachedData(TAGS_CACHE_KEY);
        if (cachedTags) {
          store.dispatch({ type: 'RECEIVE_TAGS', tags: cachedTags });
        } else {
          store.dispatch(getAllTags());
        }
      } else {
        store.dispatch(getAllTags());
      }
      
      // Subscribe to store changes to cache new data
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        // Cache products when they're loaded
        if (state.data?.products && state.data.products.length > 0) {
          const currentCache = getCachedData(PRODUCTS_CACHE_KEY);
          const productsChanged = !currentCache || JSON.stringify(currentCache) !== JSON.stringify(state.data.products);
          
          if (productsChanged) {
            setCachedData(PRODUCTS_CACHE_KEY, PRODUCTS_TIMESTAMP_KEY, state.data.products);
          }
        }
        
        // Cache tags when they're loaded
        if (state.tags?.tags && state.tags.tags.length > 0) {
          const currentCache = getCachedData(TAGS_CACHE_KEY);
          const tagsChanged = !currentCache || JSON.stringify(currentCache) !== JSON.stringify(state.tags.tags);
          
          if (tagsChanged) {
            setCachedData(TAGS_CACHE_KEY, TAGS_TIMESTAMP_KEY, state.tags.tags);
          }
        }
      });
      
      initialized.current = true;
      
      return () => unsubscribe();
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// Made with Bob

