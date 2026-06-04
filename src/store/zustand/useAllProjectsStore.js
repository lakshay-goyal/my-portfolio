import { create } from 'zustand';
import allProjectsData from '../data/allProjects.json';

const useAllProjectsStore = create(() => ({
  allProjects: allProjectsData,
}));

export default useAllProjectsStore; 