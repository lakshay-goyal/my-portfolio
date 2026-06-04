import { create } from 'zustand';
import papersData from '../data/papers.json';

const usePapersStore = create(() => ({
  papers: papersData,
}));

export default usePapersStore; 