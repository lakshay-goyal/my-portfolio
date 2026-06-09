import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Github,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";
import Loading from "../Components/Loading";
import NavBar from "../Components/NavBar";
import Lakshay from "../assets/img/Lakshay.png";
import Banner from "../assets/img/developer-pixel-banner.jpg";
import TranslatorApp from "../assets/img/LanguageTranslatorApplication.jpg";
import College from "../assets/img/College.png";
import Super30 from "../assets/img/Super30.png";
import Super30Celebration from "../assets/img/Super30-Celebration.png";
import Bangalore from "../assets/img/Bangalore.png";

const storyBeats = [
  {
    kicker: "Starting point / Jan 2022 - 2023",
    title:
      "I started by turning scattered curiosity into a clear learning track.",
    body: "First and Second year of college gave me room to choose a direction seriously. I wanted a stack where I could learn by building, measure progress through projects, and keep improving the parts that users actually touch.",
    image: College,
    imageAlt: "Pixel developer workspace banner",
  },
  {
    kicker: "AI foundations",
    title: "I spent serious time with core ML, DL, and the math behind it.",
    body: "Coming from a commerce background without maths, I had to build the foundation deliberately. I spent most of that phase learning ML and DL concepts, then going back to mathematics from first principles so the models felt understandable instead of magical. And on that journey, Build an language translator Mobile app using local NLP Model in my 1st year of college.",
    image: TranslatorApp,
    imageAlt: "Mobile app project screenshot",
  },
  {
    kicker: "Mar / Apr 2025",
    title: "MERN became the stack that turned learning into output.",
    body: "I switched to MongoDB, Express, React, and Node during my final year. The first one or two projects were honestly generic, but they taught the real basics: auth, APIs, UI state, deployment, and how products behave outside tutorials.",

    Icon: BrainCircuit,
  },
  {
    kicker: "Super30",
    title: "Super30 made the learning curve faster and more serious.",
    body: "Getting into Super30 by @kirat_tw put me around people who were serious about building and learning in public. The pace pushed me to pick up new things quickly, ask better questions, and move my projects beyond basic tutorial work.",
    image: Super30,
  },
  {
    kicker: "Learning phase",
    title:
      "The journey became less about one stack and more about engineering depth.",
    body: "During Super30, I started learning the parts many beginner projects skip: cleaner UI flows, stronger backend decisions, deployment, DevOps basics, AI engineering, real-time systems, and system design. Shipping more made me understand why things scale, fail, and recover.",
    image: Super30Celebration,
  },
  {
    kicker: "Now",
    title:
      "Moving from Delhi to Bangalore brought that learning into real product work.",
    body: "I travelled from Delhi to Bangalore to learn more, explore new opportunities, and put myself closer to serious product work. At @getfozo, working with @sumitalk_s, I get to apply that growth in production: cleaner screens, practical engineering choices, and software that has to work for real users, not just demos.",
    image: Bangalore,
    imageAlt: "Lakshay Goyal",
  },
];

const tools = [
  "MERN",
  "React Native",
  "Expo",
  "DevOps",
  "AI Engineering",
  "System Design",
];

function StoryVisual({ beat, index }) {
  if (beat.image) {
    return (
      <div
        className={`group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 ${index === storyBeats.length - 1 ? "max-h-[360px]" : ""}`}
      >
        <img
          src={beat.image}
          alt={beat.imageAlt}
          loading={index === 0 ? "eager" : "lazy"}
          className={`h-full min-h-[230px] w-full object-cover grayscale transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 ${beat.image === Lakshay ? "object-[center_22%]" : ""}`}
        />
      </div>
    );
  }

  const Icon = beat.Icon;

  return (
    <div className="relative grid min-h-[230px] place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50" />
      <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-emerald-200 shadow-2xl shadow-black/30">
        <Icon size={36} strokeWidth={1.7} />
      </div>
    </div>
  );
}

function StoryBeat({ beat, index }) {
  const visualFirst = index % 2 === 1;

  return (
    <section className="grid gap-7 border-b border-white/10 px-5 py-12 sm:px-7 md:grid-cols-[0.95fr_1.05fr] md:items-center">
      <div className={`${visualFirst ? "md:order-2" : ""}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">
          {beat.kicker}
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          {beat.title}
        </h2>
        <p className="mt-5 font-mono text-sm leading-7 text-zinc-400">
          {beat.body}
        </p>
      </div>
      <StoryVisual beat={beat} index={index} />
    </section>
  );
}

function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100 selection:bg-white selection:text-zinc-950">
      <main className="relative isolate min-h-screen overflow-hidden bg-[#070707] px-3 pb-28 pt-5 sm:px-6 sm:pb-32 sm:pt-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-x-0 top-[45%] h-10 border-y border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_7px)] opacity-30" />

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto w-full max-w-[768px] border-x border-white/10 bg-[#070707]/88 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <header className="flex h-14 items-center justify-between gap-2 border-y border-white/10 px-3">
            <a
              href="/"
              className="inline-flex h-8 items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 font-mono text-xs text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
            >
              <ArrowLeft size={14} />
              home
            </a>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/lakshay-goyal"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/[0.04] text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <span className="rounded-md border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                about
              </span>
            </div>
          </header>

          <section className="border-b border-white/10 px-5 py-12 sm:px-7 sm:py-14">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">
              <Sparkles size={14} />
              about me
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.22)] sm:text-5xl">
              I turn curiosity into shipped software.
            </h1>
          </section>

          <section className="grid border-b border-white/10 sm:grid-cols-[176px_1fr]">
            <div className="relative flex items-center justify-center border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
              <img
                src={Lakshay}
                alt="Lakshay Goyal"
                className="-mt-10 h-36 w-36 rounded-full border-4 border-[#070707] object-cover object-[center_22%] shadow-[0_0_0_1px_rgba(255,255,255,0.18)] transition duration-500 ease-out hover:scale-105 sm:-mt-12"
              />
            </div>
            <div className="grid content-center px-5 pb-24 pt-6 sm:py-6">
              <p className="text-base font-bold text-white">
                Hi, I am Lakshay.
              </p>
              <p className="mt-3 font-mono text-sm leading-7 text-zinc-400">
                A developer from India building real products at FOZO. I like
                interfaces that feel polished, systems that stay understandable,
                and projects that survive beyond the demo.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-white/10">
            <header className="stack-header-line relative flex h-[60px] items-center overflow-hidden border-b border-white/10 px-4">
              <h2 className="relative z-10 text-[30px] font-bold tracking-[-0.04em] text-white sm:text-[32px]">
                Here is the story...
              </h2>
            </header>
          </section>

          {storyBeats.map((beat, index) => (
            <StoryBeat key={beat.kicker} beat={beat} index={index} />
          ))}

          <section className="px-5 py-12 sm:px-7">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">
                where it leaves me
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white">
                Still learning. Still shipping.
              </h2>
              <p className="mt-5 font-mono text-sm leading-7 text-zinc-400">
                I am not trying to make the journey sound perfectly planned. It
                was exploration, course correction, fast learning, and a lot of
                rebuilding. That is also what made the work better.
              </p>
            </div>
          </section>
        </motion.section>
      </main>
      <NavBar />
    </div>
  );
}

export default AboutPage;
