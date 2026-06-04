import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  PackageOpen,
  Sparkles,
  Terminal,
  Twitter,
} from "lucide-react";
import Lakshay from "../assets/img/Lakshay.png";
import Banner from "../assets/img/developer-pixel-banner.jpg";

const email = "lakshaygoyal201@gmail.com";

const profileFacts = [
  {
    value: "Founding Engineer @ FOZO",
    Icon: Code2,
  },
  {
    label: "location",
    value: "Bangalore, India",
    Icon: MapPin,
  },
  {
    label: "email",
    value: email,
    href: `mailto:${email}`,
    Icon: Mail,
  },
  {
    label: "site",
    value: "lakshagoyal.in",
    href: "https://lakshagoyal.in",
    Icon: Globe2,
  },
];

const socialLinks = [
  {
    label: "Projects",
    handle: "Mobile / Web / AI",
    href: "/projects",
    Icon: PackageOpen,
  },
  {
    label: "GitHub",
    handle: "@lakshay-goyal",
    href: "https://github.com/lakshay-goyal",
    Icon: Github,
  },
  {
    label: "X",
    handle: "@lakshayg2004",
    href: "https://x.com/lakshayg2004",
    Icon: Twitter,
  },
  {
    label: "LinkedIn",
    handle: "lakshay-goyal",
    href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/",
    Icon: Linkedin,
  },
];

const subtitles = [
  "Learning stacks by building",
  "Brainstorm before building.",
  "Build for users, not engineers.",
];

function HeroSection() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [streamedSubtitle, setStreamedSubtitle] = useState("");
  const [isDeletingSubtitle, setIsDeletingSubtitle] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentSubtitle = subtitles[subtitleIndex];

    if (!isDeletingSubtitle && streamedSubtitle.length === currentSubtitle.length) {
      const holdTimer = window.setTimeout(() => setIsDeletingSubtitle(true), 1100);
      return () => window.clearTimeout(holdTimer);
    }

    if (isDeletingSubtitle && streamedSubtitle.length === 0) {
      const nextTimer = window.setTimeout(() => {
        setSubtitleIndex((current) => (current + 1) % subtitles.length);
        setIsDeletingSubtitle(false);
      }, 220);
      return () => window.clearTimeout(nextTimer);
    }

    const timer = window.setTimeout(() => {
      setStreamedSubtitle((current) => {
        if (isDeletingSubtitle) return current.slice(0, -1);
        return currentSubtitle.slice(0, current.length + 1);
      });
    }, isDeletingSubtitle ? 34 : 52);

    return () => window.clearTimeout(timer);
  }, [isDeletingSubtitle, streamedSubtitle, subtitleIndex]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#070707] px-3 pb-28 pt-5 sm:px-6 sm:pb-32 sm:pt-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[45%] h-10 border-y border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_7px)] opacity-30" />

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto w-full max-w-[768px] border-x border-white/10 bg-[#070707]/88 shadow-2xl shadow-black/40 backdrop-blur"
      >
        <header className="flex h-14 items-center justify-end gap-2 border-y border-white/10 px-3">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-8 items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 font-mono text-xs text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "copied" : "copy email"}
          </button>
          <a
            href="https://www.linkedin.com/in/lakshay-goyal-9778a6246/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://github.com/lakshay-goyal"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://x.com/lakshayg2004"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
            aria-label="X"
          >
            <Twitter size={15} />
          </a>
        </header>

        <div className="relative h-[190px] overflow-hidden border-b border-white/10 sm:h-[242px]">
          <img src={Banner} alt="" className="h-full w-full object-cover opacity-85 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/25" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <h1 className="font-mono text-3xl font-black tracking-[-0.04em] text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.55)] sm:text-5xl">
              lakshagoyal.in
            </h1>
          </div>
        </div>

        <section className="grid border-b border-white/10 sm:grid-cols-[176px_1fr]">
          <div className="relative flex items-center justify-center border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
            <img
              src={Lakshay}
              alt="Lakshay Goyal"
              className="-mt-14 h-36 w-36 rounded-full border-4 border-[#070707] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.18)] sm:-mt-16"
            />
          </div>
          <div className="grid content-end">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="font-mono text-xs text-emerald-300">Building mobile products with clean software.</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h2 className="text-3xl font-bold tracking-[-0.03em] text-white">Lakshay Goyal</h2>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400 text-[10px] font-black text-black">
                  <Check size={13} />
                </span>
                <Sparkles size={16} className="text-zinc-500" />
              </div>
            </div>
            <div className="min-h-11 px-5 py-3 font-mono text-base text-zinc-300">
              {streamedSubtitle}
              <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-zinc-300" />
            </div>
          </div>
        </section>

        <div className="h-10 border-b border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.13)_0,rgba(255,255,255,0.13)_1px,transparent_1px,transparent_7px)] opacity-40" />

        <section className="grid gap-y-1 border-b border-white/10 px-4 py-5 sm:grid-cols-2 sm:gap-x-14 sm:px-5">
          {profileFacts.map(({ label, value, href, Icon }) => {
            const factKey = label || value;
            const content = (
              <>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-500">
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  {label && <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-700">{label}</span>}
                  <span className="block truncate text-sm font-semibold text-zinc-100">{value}</span>
                </span>
              </>
            );

            return href ? (
              <a
                key={factKey}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex min-w-0 items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-white/[0.04]"
              >
                {content}
              </a>
            ) : (
              <div key={factKey} className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2">
                {content}
              </div>
            );
          })}
          <div className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-500">
              <Terminal size={15} />
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-700">Skills</span>
              <span className="block text-sm font-semibold text-zinc-100">Software Development + AI Engineering</span>
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-500">
              <Layers3 size={15} />
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-700">main stack</span>
              <span className="block text-sm font-semibold text-zinc-100">React Native, Expo, MERN</span>
            </span>
          </div>
        </section>

        <div className="h-10 border-b border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.13)_0,rgba(255,255,255,0.13)_1px,transparent_1px,transparent_7px)] opacity-40" />

        <section className="grid border-b border-white/10 sm:grid-cols-2">
          {socialLinks.map(({ label, handle, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 border-b border-white/10 px-4 py-4 transition-all duration-200 hover:bg-white/[0.04] sm:odd:border-r"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.04] text-zinc-200 transition-transform duration-200 group-hover:-translate-y-0.5">
                <Icon size={21} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold text-white">{label}</span>
                <span className="block truncate font-mono text-xs text-zinc-500">{handle}</span>
              </span>
              <ArrowUpRight size={15} className="text-zinc-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
          ))}
        </section>

        <section className="border-b border-white/10 px-4 py-5 sm:px-5">
          <h3 className="text-2xl font-bold tracking-[-0.03em] text-white">About</h3>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-zinc-300">
            I am a React Native mobile developer using Expo, currently working as a
            Founding Engineer at FOZO in Bangalore. I focus on shipping practical
            mobile and software products with clear engineering decisions.
          </p>
          <p className="mt-3 font-mono text-xs text-zinc-600">React Native / Expo / MERN / DevOps</p>
        </section>
      </motion.section>
    </main>
  );
}

export default HeroSection;
