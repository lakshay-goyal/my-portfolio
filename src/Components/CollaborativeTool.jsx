import { motion } from "framer-motion";
import useCollaborativeToolsStore from "../store/zustand/useCollaborativeToolsStore";

function CollaborativeTool() {
  const collaborativeToolsData = useCollaborativeToolsStore((state) => state.collaborativeTools);

  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Workflow</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tools I use around the codebase.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {collaborativeToolsData.map((tool, index) => (
            <motion.div
              key={tool.ToolName}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.35, delay: index * 0.025 }}
              className="group flex min-h-36 flex-col items-center justify-center bg-[#08090b] p-5 text-center transition-colors duration-300 hover:bg-[#101318]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-md border border-white/10 bg-white p-2 transition-transform duration-300 group-hover:-translate-y-1">
                <img src={tool.imageSrc} alt={tool.ToolName} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-300">{tool.ToolName}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollaborativeTool;
