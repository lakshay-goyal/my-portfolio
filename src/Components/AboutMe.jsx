import { motion } from "framer-motion";
import { Braces, GitBranch, Layers3, ServerCog } from "lucide-react";

const principles = [
  {
    title: "Interface precision",
    description: "React and Tailwind UI with attention to layout, state, responsiveness, and motion.",
    Icon: Layers3,
  },
  {
    title: "Backend clarity",
    description: "API integration, data flow, and service boundaries that keep products maintainable.",
    Icon: ServerCog,
  },
  {
    title: "Learning loop",
    description: "Active exploration across AI, Blockchain, DevOps practices, and real-world project work.",
    Icon: GitBranch,
  },
];

function AboutMe() {
  return (
    <section id="About" className="border-b border-white/10 bg-[#08090b] px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">About</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Developer profile, not a template landing page.
          </h2>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-zinc-500">
              <Braces size={15} className="text-emerald-300" />
              lakshay.profile.json
            </div>
            <p className="text-lg leading-8 text-zinc-300">
              I am Lakshay Goyal, a BCA graduate from K.R. Mangalam University and a
              software developer focused on building useful web and app experiences.
              My current work spans MERN stack development, API connectivity, DevOps
              fundamentals, and practical exploration in Blockchain and Artificial
              Intelligence.
            </p>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              I care about product interfaces that feel sharp, backend flows that are
              understandable, and projects that show how a system behaves beyond a
              screenshot.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            {principles.map(({ title, description, Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-[#0b0c10] p-5 transition-colors duration-300 hover:bg-[#101318]"
              >
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-emerald-200 transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
