import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from './productSlice';

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const CART_KEY = '@plant_app_cart';

export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async () => {
    const saved = await AsyncStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }
);

const saveCartToStorage = (items: CartItem[]) => {
  AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selected: false,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.product.id === id);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    toggleSelectItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.product.id === action.payload);
      if (item) {
        item.selected = !item.selected;
      }
      saveCartToStorage(state.items);
    },
    removeSelectedItems: (state) => {
      state.items = state.items.filter((item) => !item.selected);
      saveCartToStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleSelectItem,
  removeSelectedItems,
} = cartSlice.actions;

export default cartSlice.reducer;
