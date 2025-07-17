import { create } from 'zustand';
import experiencesData from '../data/experiences.json';

const useExperiencesStore = create((set) => ({
  experiences: experiencesData,
}));

export default useExperiencesStore; 