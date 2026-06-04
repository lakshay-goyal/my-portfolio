import { create } from 'zustand';
import booksData from '../data/books.json';

const useBooksStore = create(() => ({
  books: booksData,
  // Add actions if needed
}));

export default useBooksStore; 