import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  favoritedAt?: number;
  description?: string;
  stock?: number;
  images?: string[];
  weight?: number;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  favorites: Product[];
  total: number;
  loading: boolean;
  loadingDetail: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  favorites: [],
  total: 0,
  loading: false,
  loadingDetail: false,
  error: null,
};

const FAVORITES_KEY = '@plant_app_favorites';

export const loadFavorites = createAsyncThunk(
  'products/loadFavorites',
  async () => {
    const saved = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    // Ensure all items have a favoritedAt timestamp
    return parsed.map((item: Product, index: number) => ({
      ...item,
      favoritedAt: item.favoritedAt || (Date.now() - index * 1000) // Stagger slightly if missing
    }));
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const { products: productState } = getState() as { products: ProductState };
      const { favorites } = productState;

      const response = await axiosInstance.get(`/products/${id}`);
      const item = response.data;
      
      const mappedProduct: Product & { 
        description: string; 
        stock: number; 
        images: string[];
        weight: number;
        brand: string;
      } = {
        id: item.id,
        name: item.title,
        category: item.category,
        price: item.price,
        imageUrl: item.thumbnail,
        isFavorite: favorites.some(f => f.id === item.id),
        description: item.description,
        stock: item.stock,
        images: item.images,
        weight: item.weight,
        brand: item.brand,
      };
      
      return mappedProduct;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    params: { limit?: number; skip?: number; category?: string; searchQuery?: string } | undefined,
    { getState, rejectWithValue }
  ) => {
    try {
      const { limit = 30, skip = 0, category, searchQuery } = params || {};
      const { products: productState } = getState() as { products: ProductState };
      const { favorites } = productState;

      let url = '/products';
      const requestParams: any = { limit, skip };

      if (searchQuery && searchQuery.trim().length > 0) {
        url = '/products/search';
        requestParams.q = searchQuery.trim();
      } else if (category && category !== 'All') {
        url = `/products/category/${category.toLowerCase().replace(' ', '-')}`;
      }

      const response = await axiosInstance.get(url, {
        params: requestParams,
      });
      
      const data = response.data.products;
      const total = response.data.total;
      
      const mappedProducts: Product[] = data.map((item: any) => ({
        id: item.id,
        name: item.title,
        category: item.category,
        price: item.price,
        imageUrl: item.thumbnail,
        isFavorite: favorites.some(f => f.id === item.id),
      }));
      
      return { products: mappedProducts, total };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(p => p.id === productId);
      const favoriteIndex = state.favorites.findIndex(p => p.id === productId);
      const isCurrentProduct = state.currentProduct?.id === productId;

      if (favoriteIndex > -1) {
        // Remove from favorites
        state.favorites.splice(favoriteIndex, 1);
        if (productIndex > -1) state.products[productIndex].isFavorite = false;
        if (isCurrentProduct) state.currentProduct!.isFavorite = false;
      } else {
        // Add to favorites
        const product = state.products.find(p => p.id === productId) || state.currentProduct;
        if (product) {
          const updatedProduct = { ...product, isFavorite: true, favoritedAt: Date.now() };
          state.favorites.push(updatedProduct);
          if (productIndex > -1) state.products[productIndex].isFavorite = true;
          if (isCurrentProduct) state.currentProduct!.isFavorite = true;
        }
      }
      
      // Save to AsyncStorage
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        // Sync flags in current products list
        state.products.forEach(p => {
          p.isFavorite = state.favorites.some(f => f.id === p.id);
        });
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        const product = action.payload;
        // Final sync with actual favorites in state
        product.isFavorite = state.favorites.some(f => f.id === product.id);
        state.currentProduct = product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedProducts = action.payload.products;
        // Final sync with actual favorites in state to handle race conditions
        fetchedProducts.forEach(p => {
          p.isFavorite = state.favorites.some(f => f.id === p.id);
        });
        state.products = fetchedProducts;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, clearCurrentProduct, setLoading, clearProducts } = productSlice.actions;
export default productSlice.reducer;
