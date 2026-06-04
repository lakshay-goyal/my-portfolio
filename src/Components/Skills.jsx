import { motion } from "framer-motion";
import { Brain, Code2, Database, Layers3, Smartphone, Workflow } from "lucide-react";
import useSkillsStore from "../store/zustand/useSkillsStore";

const iconMap = {
  "Web Development": Code2,
  "App Development": Smartphone,
  AI: Brain,
  Blockchain: Workflow,
};

const supportingSkills = [
  { label: "API Development", Icon: Layers3 },
  { label: "Postgres + Prisma", Icon: Database },
  { label: "FastAPI + Python", Icon: Code2 },
];

function Skills() {
  const skillsData = useSkillsStore((state) => state.skills);

  return (
    <section id="Skills" className="border-b border-white/10 bg-[#08090b] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Stack map</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tools grouped by how I build.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
            {supportingSkills.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 bg-[#0b0c10] p-4 text-sm text-zinc-400">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-emerald-200">
                  <Icon size={17} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {skillsData.map((skill, index) => {
            const Icon = iconMap[skill.title] || Code2;
            const items = skill.skills.split(", ");

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                className="group bg-[#0b0c10] p-5 transition-colors duration-300 hover:bg-[#101318]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-emerald-200 transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors duration-200 group-hover:border-white/15"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
