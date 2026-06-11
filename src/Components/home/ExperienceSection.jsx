import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import useExperiencesStore from "../../store/zustand/useExperiencesStore";
import FozoShowcaseModal from "./FozoShowcaseModal";

function CursorLogo({ logo, x, y }) {
  const springX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.4 });

  return createPortal(
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.18 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="relative h-14 w-14 rounded-2xl border border-white/15 bg-[#1a3d34] object-contain p-2 shadow-[0_12px_40px_-12px_rgba(52,211,153,0.55)] sm:h-16 sm:w-16"
        />
      </div>
    </motion.div>,
    document.body,
  );
}

function ExperienceSection() {
  const experiences = useExperiencesStore((state) => state.experiences);
  const sectionRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const interactiveExperience = experiences.find(
    (exp) => exp.cursorLogo && exp.showcase?.screens?.length,
  );

  const handleMouseMove = useCallback(
    (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    },
    [cursorX, cursorY],
  );

  const handleSectionClick = useCallback(
    (event) => {
      if (!interactiveExperience) return;
      if (event.target.closest("a, button")) return;
      setActiveShowcase(interactiveExperience);
    },
    [interactiveExperience],
  );

  return (
    <>
      <section
        id="Experience"
        ref={sectionRef}
        className={`border-b border-white/10 ${interactiveExperience ? "cursor-pointer" : ""}`}
        onMouseEnter={() => interactiveExperience && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={handleSectionClick}
      >
        <header className="stack-header-line relative flex h-[60px] items-center overflow-hidden border-b border-white/10 px-4">
          <h3 className="relative z-10 text-[30px] font-bold tracking-[-0.04em] text-white sm:text-[32px]">
            Experience
          </h3>
          {interactiveExperience && (
            <span className="relative z-10 ml-auto hidden font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 sm:inline">
              Hover & click to explore
            </span>
          )}
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

            {exp.showcase?.screens?.length > 0 && (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-600 sm:hidden">
                Tap anywhere to view app screens
              </p>
            )}
          </article>
        ))}
      </section>

      <AnimatePresence>
        {isHovering && interactiveExperience?.cursorLogo && (
          <CursorLogo
            key="experience-cursor-logo"
            logo={interactiveExperience.cursorLogo}
            x={cursorX}
            y={cursorY}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeShowcase && (
          <FozoShowcaseModal
            company={activeShowcase.company}
            url={activeShowcase.url}
            role={activeShowcase.role}
            screens={activeShowcase.showcase.screens}
            onClose={() => setActiveShowcase(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ExperienceSection;
