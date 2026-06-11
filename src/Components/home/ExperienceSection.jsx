import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import useExperiencesStore from "../../store/zustand/useExperiencesStore";

function ExperienceSection() {
  const experiences = useExperiencesStore((state) => state.experiences);

  return (
    <section id="Experience" className="border-b border-white/10">
      <header className="stack-header-line relative flex h-[60px] items-center overflow-hidden border-b border-white/10 px-4">
        <h3 className="relative z-10 text-[30px] font-bold tracking-[-0.04em] text-white sm:text-[32px]">
          Experience
        </h3>
      </header>

      {experiences.map((exp) => (
        <article key={exp.company} className="px-4 py-6 sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-emerald-300">
                <Briefcase size={18} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-bold tracking-tight text-white">
                    {exp.role}
                  </h4>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-mono text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                  >
                    @ {exp.company}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
                  <span>{exp.period}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 font-mono text-sm leading-7 text-zinc-300">
            {exp.summary}
          </p>

          <ul className="mt-4 space-y-2.5">
            {exp.highlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm leading-6 text-zinc-400"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {exp.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

export default ExperienceSection;
