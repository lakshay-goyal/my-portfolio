import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

function PhoneFrame({ screen, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="group flex w-[min(72vw,220px)] shrink-0 snap-center flex-col gap-3 sm:w-[200px] lg:w-[210px]"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-zinc-950 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="overflow-hidden rounded-[22px] bg-black">
          <img
            src={screen.src}
            alt={screen.title}
            className="aspect-[9/19.5] w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <span className="pointer-events-none absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
      <figcaption className="px-1 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h5 className="mt-1 text-sm font-semibold text-white">{screen.title}</h5>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{screen.caption}</p>
      </figcaption>
    </motion.figure>
  );
}

function FozoShowcaseModal({ company, url, role, screens, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b0d] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fozo-showcase-title"
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-500/[0.08] via-transparent to-transparent px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src="/FOZO/logo.png"
                alt={`${company} logo`}
                className="h-12 w-12 rounded-xl border border-white/10 bg-[#1a3d34] object-contain p-1.5"
              />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                  Proof of work
                </p>
                <h4
                  id="fozo-showcase-title"
                  className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl"
                >
                  {company} Mobile App
                </h4>
                <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-400">
                  {role} — UI screens I designed and shipped for the surplus food
                  delivery platform, from onboarding through checkout.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                >
                  getfozo.in
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              aria-label="Close showcase"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-6">
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center lg:gap-6">
            {screens.map((screen, index) => (
              <PhoneFrame key={screen.src} screen={screen} index={index} />
            ))}
          </div>

          <p className="mt-5 text-center font-mono text-[11px] text-zinc-600 sm:hidden">
            Swipe to explore all screens
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default FozoShowcaseModal;
