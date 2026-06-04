import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Trophy } from "lucide-react";
import posterMaking from "../assets/img/poster_making.jpeg";
import positionSecond from "../assets/img/2nd_positions.jpeg";
import useAwardsStore from "../store/zustand/useAwardsStore";
import useCertificatesStore from "../store/zustand/useCertificatesStore";

const imageMap = {
  "poster_making.jpeg": posterMaking,
  "2nd_positions.jpeg": positionSecond,
};

function Achievements() {
  const [activeAward, setActiveAward] = useState(0);
  const certificatesRef = useRef(null);
  const awards = useAwardsStore((state) => state.awards);
  const certificates = useCertificatesStore((state) => state.certificates);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAward((current) => (current + 1) % awards.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [awards.length]);

  const active = awards[activeAward];

  const moveAward = (direction) => {
    setActiveAward((current) => (current + direction + awards.length) % awards.length);
  };

  const scrollCertificates = (direction) => {
    certificatesRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section id="Achievements" className="border-b border-white/10 bg-[#08090b] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Proof points</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Recognition, papers, and credentials.
            </h2>
          </div>
          <a
            href="https://www.researchgate.net/publication/374505664_Design_of_Language_Translator_Headphone_The_Future_of_Sustainable_Communication"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/40"
          >
            <FileText size={16} />
            Research paper
            <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[360px] overflow-hidden bg-[#0b0c10]">
            {active && (
              <motion.img
                key={active.image}
                src={imageMap[active.image]}
                alt={active.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="h-full min-h-[360px] w-full object-cover grayscale"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/50 px-2.5 py-1.5 font-mono text-xs text-emerald-200">
                <Trophy size={14} />
                award {activeAward + 1}/{awards.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#0b0c10] p-6">
            <motion.div
              key={active?.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-2xl font-semibold text-white">{active?.title}</h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-400">{active?.description}</p>
            </motion.div>
            <div className="mt-8 flex gap-2">
              <button
                type="button"
                onClick={() => moveAward(-1)}
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Previous award"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => moveAward(1)}
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Next award"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">Certificates</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollCertificates(-1)}
                className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                aria-label="Scroll certificates left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollCertificates(1)}
                className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white"
                aria-label="Scroll certificates right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={certificatesRef}
            className="flex snap-x gap-px overflow-x-auto rounded-lg border border-white/10 bg-white/10"
            style={{ scrollbarWidth: "none" }}
          >
            {certificates.map((certificate) => (
              <article
                key={certificate.title}
                className="min-w-[290px] snap-start bg-[#0b0c10] p-4 sm:min-w-[340px]"
              >
                <div className="aspect-video overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-3"
                  />
                </div>
                <h4 className="mt-4 line-clamp-2 text-base font-semibold text-white">{certificate.title}</h4>
                <p className="mt-2 text-sm text-zinc-500">Issued by: {certificate.organization}</p>
                {certificate.href && (
                  <a
                    href={certificate.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-white"
                  >
                    View credential
                    <ExternalLink size={14} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
