import { create } from 'zustand';
import skillsData from '../data/skills.json';

const useSkillsStore = create(() => ({
  skills: skillsData,
}));

export default useSkillsStore; 