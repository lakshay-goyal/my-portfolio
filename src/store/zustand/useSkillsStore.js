import { create } from 'zustand';
import skillsData from '../data/skills.json';

const useSkillsStore = create((set) => ({
  skills: skillsData,
}));

export default useSkillsStore; 