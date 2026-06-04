import { create } from 'zustand';
import majorProjectsData from '../data/majorProjects.json';

const useMajorProjectsStore = create(() => ({
  majorProjects: majorProjectsData,
}));

export default useMajorProjectsStore; 