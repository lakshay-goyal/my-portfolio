import { create } from 'zustand';
import collaborativeToolsData from '../data/collaborativeTools.json';

const useCollaborativeToolsStore = create(() => ({
  collaborativeTools: collaborativeToolsData,
}));

export default useCollaborativeToolsStore; 