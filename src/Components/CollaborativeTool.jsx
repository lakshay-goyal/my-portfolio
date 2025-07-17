import React from 'react';
import useCollaborativeToolsStore from '../store/zustand/useCollaborativeToolsStore';

const CollaborativeTool = () => {
  const collaborativeToolsData = useCollaborativeToolsStore((state) => state.collaborativeTools);

  return (
    <section className="m-16">
      <div className="flex justify-center text-3xl font-semibold mb-8">
        <h2 className="text-center">
          Collaborative Tools
          <div className="bg-black h-1 w-10 mx-auto rounded my-1"></div>
        </h2>
      </div>
      
      <div className="flex flex-wrap justify-center border border-black rounded place-items-center gap-16 px-16 py-8">
        {collaborativeToolsData.map((tool, index) => (
          <div key={index} className="text-center">
            <img src={tool.imageSrc} alt={tool.ToolName} className="w-16 mb-2" />
            <p className="text-center">{tool.ToolName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborativeTool;