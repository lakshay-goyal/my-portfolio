import { create } from 'zustand';
import papersData from '../data/papers.json';

const usePapersStore = create((set) => ({
  papers: papersData,
}));

export default usePapersStore; 