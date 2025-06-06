// src/redux/slices/basketSlice.ts


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clothes } from '../../app/api/clothes/clothesService';

type BasketBase = Omit<Clothes, 'selectedColor' | 'selectedSize'>;

interface StockSize {
  size: string;
  quantity: number;
}

interface StockItem {
  sizes: StockSize[];
}

interface BasketItem extends BasketBase {
  stockItem: StockItem;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface BasketState {
  items: BasketItem[];
}

// Зберігаємо в localStorage
const saveBasketToLocalStorage = (items: BasketItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('basket', JSON.stringify(items));
  }
};

// Завантаження з localStorage
const loadBasketFromLocalStorage = (): BasketItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('basket');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: BasketState = {
  items: loadBasketFromLocalStorage(),
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {    
    addItem: (state, action: PayloadAction<BasketItem>) => {
      const index = state.items.findIndex(
        item =>
          item._id === action.payload._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
    
      // Використовуємо тип StockSize для sizeObj
      const availableStock = action.payload.stockItem?.sizes.find(
        (sizeObj: StockSize) => sizeObj.size === action.payload.selectedSize
      )?.quantity || 0;
    
      if (index !== -1) {
        const newQuantity = state.items[index].quantity + action.payload.quantity;
        if (newQuantity <= availableStock) {
          state.items[index].quantity = newQuantity;
        } else {
          state.items[index].quantity = availableStock;
          alert(`Максимальна кількість цього товару на складі: ${availableStock}`);
        }
      } else {
        if (action.payload.quantity <= availableStock) {
          state.items.push(action.payload);
        } else {
          state.items.push({
            ...action.payload,
            quantity: availableStock,
          });
          alert(`Максимальна кількість цього товару на складі: ${availableStock}`);
        }
      }
    
      saveBasketToLocalStorage(state.items);
    },
    

    removeItem: (state, action: PayloadAction<{ id: string; color?: string; size?: string }>) => {
      state.items = state.items.filter(
        item =>
          !(
            item._id === action.payload.id &&
            item.selectedColor === action.payload.color &&
            item.selectedSize === action.payload.size
          )
      );
      saveBasketToLocalStorage(state.items);
    },
   
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; color?: string; size?: string; quantity: number }>
    ) => {
      const index = state.items.findIndex(
        item =>
          item._id === action.payload.id &&
          item.selectedColor === action.payload.color &&
          item.selectedSize === action.payload.size
      );
    
      if (index !== -1) {
        const item = state.items[index];
        const stockItem = item.stockItem.sizes.find(
          (sizeObj: StockSize) => sizeObj.size === item.selectedSize
        );
        const availableStock = stockItem?.quantity || 0;
    
        const newQuantity = action.payload.quantity;
    
        if (newQuantity <= availableStock && newQuantity >= 1) {
          state.items[index].quantity = newQuantity;
        } else {
          alert(`Максимальна кількість цього товару на складі: ${availableStock}`);
        }
    
        saveBasketToLocalStorage(state.items);
      }
    },
    
    
    clearBasket: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('basket');
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;

