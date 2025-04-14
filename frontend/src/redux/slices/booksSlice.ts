import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('/api/books');
  return await response.json();
});

interface BooksState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Обробник для видалення книги
    removeBook: (state, action) => {
      const bookId = action.payload;
      state.items = state.items.filter((book) => book._id !== bookId); // Видаляємо книгу з масиву
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Експортуємо функцію для видалення книги
export const { removeBook } = booksSlice.actions;

export default booksSlice.reducer;
