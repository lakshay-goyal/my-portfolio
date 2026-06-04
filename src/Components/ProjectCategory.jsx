import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Shield, Smartphone } from "lucide-react";

const categories = [
  {
    title: "Web Based Projects",
    description: "React, NextJS, full-stack apps, dashboards, and interactive product surfaces.",
    icon: Code,
    category: "web",
    count: "21 builds",
  },
  {
    title: "Mobile App Projects",
    description: "React Native projects with API connectivity and app-oriented flows.",
    icon: Smartphone,
    category: "app",
    count: "01 build",
  },
  {
    title: "Artificial Intelligence Projects",
    description: "Python, FastAPI, ML, NLP, computer vision, GenAI, and agent experiments.",
    icon: Brain,
    category: "ai",
    count: "01 build",
  },
  {
    title: "Blockchain Projects",
    description: "Fundamentals and experiments across Solana, Ethereum, and decentralized apps.",
    icon: Shield,
    category: "blockchain",
    count: "01 build",
  },
];

function ProjectCategory() {
  const navigate = useNavigate();

  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Build lanes</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Browse work by engineering direction.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
          {categories.map(({ title, description, icon: Icon, category, count }, index) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => navigate(`/projects/${category}`)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              className="group min-h-56 bg-[#08090b] p-6 text-left transition-colors duration-300 hover:bg-[#101318]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-emerald-200 transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={21} />
                </span>
                <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-500">
                  {count}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">{description}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300">
                Open collection
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectCategory;
