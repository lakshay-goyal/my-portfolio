import { create } from 'zustand';
import awardsData from '../data/awards.json';

const useAwardsStore = create((set) => ({
  awards: awardsData,
}));

export default useAwardsStore; 