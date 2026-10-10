import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import experiences from "./store/data/experiences.json";
import majorProjects from "./store/data/majorProjects.json";
import skills from "./store/data/skills.json";
import books from "./store/data/books.json";
import PageRail from "./components/PageRail.jsx";
import ContactRail from "./components/ContactRail.jsx";
import ScrollReveal from "./components/ScrollReveal.jsx";

function ArrowIcon() {
  return (
    <svg className="align-[-3px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 10V4m0 0H6m6 0l-7.833 7.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem("portfolio-theme") === "dark");
  const ref = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = async () => {
    const nextIsDarkMode = !isDarkMode;
    const startViewTransition = document.startViewTransition;

    if (
      !ref.current ||
      !startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(nextIsDarkMode);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        document.documentElement.classList.toggle("dark", nextIsDarkMode);
        setIsDarkMode(nextIsDarkMode);
      });
    });

    await transition.ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={ref}
      type="button"
      className="fixed right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-[color,background,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-md focus-visible:outline-offset-4"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <svg key="moon" className="theme-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.1 15.4A8.5 8.5 0 0 1 8.6 3.9 8.5 8.5 0 1 0 20.1 15.4Z" />
        </svg>
      ) : (
        <svg key="sun" className="theme-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      )}
    </button>
  );
}

function TextLink({ href, children, className = "" }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      className={`group font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-500 [&_svg]:ml-0.5 [&_svg]:inline-block [&_svg]:text-black/30 [&_svg]:transition-colors [&_svg]:duration-200 group-hover:[&_svg]:text-black/80 ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children} <ArrowIcon />
    </a>
  );
}

function Experience() {
  return (
    <section className="mt-20 max-[640px]:mt-12" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="mb-8 text-base font-medium leading-6 text-zinc-900">Work Experience</h2>
      <div >
        {experiences.map((experience) => (
          <article className="mb-8 grid grid-cols-[180px_minmax(0,1fr)] items-baseline gap-x-4 last:mb-0 max-[640px]:grid-cols-1 max-[640px]:gap-y-4" key={`${experience.company}-${experience.period}`}>
            <p className="m-0 font-mono text-base font-normal leading-6 text-zinc-400">{experience.period}</p>
            <div className="min-w-0">
              <p className="m-0 text-lg font-normal leading-7 text-zinc-600 [&_a]:text-inherit">
                {experience.role} at{" "}
                <TextLink href={experience.url}>{experience.company}</TextLink>
              </p>
              <p className="mt-1 mb-0 text-base font-normal leading-6 text-zinc-500">{experience.location} • Full-time</p>
              <p className="mt-2 mb-0 text-base font-normal leading-6 text-zinc-500">{experience.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!activeProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section id="work" className="mt-20 scroll-mt-8 max-[640px]:mt-12" aria-labelledby="work-heading">
      <h2 id="work-heading" className="mb-8 text-base font-medium leading-6 text-zinc-900">Selected Work</h2>
      <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
        {majorProjects.map((project, index) => (
          <article className="min-w-0 overflow-hidden rounded-lg border border-zinc-200 bg-white" key={project.title}>
            <button
              type="button"
              className="group relative block aspect-[1.55] w-full cursor-pointer overflow-hidden border-0 bg-zinc-100 p-0 text-left"
              onClick={() => setActiveProject(project)}
              aria-label={`Play ${project.title} demo`}
            >
              <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" src={project.image} alt={`${project.title} interface screenshot`} loading="lazy" />
              <span className="absolute inset-0 grid place-items-center bg-zinc-950/0 transition-colors group-hover:bg-zinc-950/20">
                <span className="grid h-12 w-12 translate-y-1 place-items-center rounded-full bg-white/95 text-zinc-900 opacity-0 shadow-lg transition duration-200 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M6 3.9c0-.6.65-.96 1.15-.63l7.1 4.6a1.35 1.35 0 0 1 0 2.26l-7.1 4.6A.75.75 0 0 1 6 14.1V3.9Z" /></svg>
                </span>
              </span>
              <span className="absolute bottom-3 right-3 rounded-full bg-zinc-950/75 px-2.5 py-1 font-mono text-xs text-white">Play demo</span>
            </button>
            <div className="p-4">
              <p className="mb-1 font-mono text-xs leading-5 text-zinc-400">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="m-0 text-base font-medium leading-6 text-zinc-700"><TextLink href={project.live || project.github}>{project.title}</TextLink></h3>
              <p className="mt-2 mb-0 text-sm leading-6 text-zinc-500">{project.description}</p>
              <p className="mt-2 mb-0 font-mono text-xs leading-5 text-zinc-400">{project.tech.slice(0, 4).join(" · ")}</p>
              {project.live && <TextLink className="mt-2 inline-block text-sm font-normal text-zinc-500" href={project.github}>Source code</TextLink>}
            </div>
          </article>
        ))}
      </div>

      {activeProject && (
        createPortal(
          <div
            className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-zinc-950/85 p-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null); }}
          >
            <section className="w-fit max-w-full" role="dialog" aria-modal="true" aria-label={`${activeProject.title} demo`}>
              <div className="mb-3 flex items-center justify-between gap-4 text-white">
                <h3 className="m-0 text-base font-medium">{activeProject.title}</h3>
                <button type="button" autoFocus className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20" onClick={() => setActiveProject(null)} aria-label="Close video">×</button>
              </div>
              <video key={activeProject.videoLink} className="mx-auto block h-auto w-auto max-h-[calc(100dvh-8rem)] max-w-[calc(100vw-2rem)] rounded-lg bg-black object-contain" src={activeProject.videoLink} poster={activeProject.image} controls autoPlay muted playsInline />
            </section>
          </div>,
          document.body,
        )
      )}
    </section>
  );
}

const skillIcons = {
  "Web Development": (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  "Mobile Development": (
    <>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </>
  ),
  AI: (
    <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
  ),
};

function SkillIcon({ title }) {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {skillIcons[title]}
    </svg>
  );
}

function MoreAbout() {
  return (
    <section className="mt-20 max-[640px]:mt-12" aria-labelledby="more-heading">
      <h2 id="more-heading" className="mb-8 text-base font-medium leading-6 text-zinc-900">Skills</h2>
      <div>
        {skills.map((item) => (
          <div className="grid grid-cols-[190px_minmax(0,1fr)] items-start gap-x-4 py-3 text-base leading-6 text-zinc-500 hover:[&_.skill-label]:text-zinc-600 hover:[&_.skill-detail]:text-zinc-900 max-[640px]:grid-cols-1 max-[640px]:gap-y-1.5" key={item.title}>
            <span className="skill-label flex items-center gap-2 font-mono text-sm leading-6 text-zinc-400 transition-colors">
              <SkillIcon title={item.title} />
              {item.title}
            </span>
            <span className="skill-detail transition-colors">{item.skills.split(",").map((skill) => skill.trim()).join(" · ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <ScrollReveal>
        <section className="mt-12 max-[640px]:mt-8" aria-labelledby="about-heading">
          <h2 id="about-heading" className="mb-6 text-base font-medium leading-6 text-zinc-900">About</h2>
          <div className="mb-6 text-lg font-normal leading-[1.7] text-zinc-600 [&_p]:m-0 [&_p+p]:mt-5">
            <p>
              Just a curious builder with a bad habit of going down every damn rabbit hole, building random shit, and figuring out life beyond code.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><FeaturedWork /></ScrollReveal>
      <ScrollReveal><MoreAbout /></ScrollReveal>
    </>
  );
}

const story = [
  ["2022–2023", "Finding a direction", "I started learning by building projects in college. Coming from a commerce background, I worked through the maths behind machine learning and deep learning, then built a language translator app with a local NLP model."],
  ["2025", "Building for the web", "I moved into the MERN stack and learned how authentication, APIs, interfaces, and deployment come together in real products."],
  ["Super30", "Going deeper", "Being part of Super30 pushed me to ship more and learn about backend design, DevOps, AI engineering, real-time systems, and system design."],
  ["Now", "Working on products", "I moved from Delhi to Bangalore, helped build FOZO from the ground up, and now work on test automation at Testsigma. I care about polished interfaces, understandable systems, and work that lasts beyond a demo."],
];

function PageHeading({ eyebrow, title, description }) {
  return (
    <ScrollReveal>
      <header className="mb-[52px] max-[640px]:mb-9">
        <p className="mb-3 font-mono text-[13px] uppercase leading-5 tracking-[.04em] text-zinc-400">{eyebrow}</p>
        <h2 className="mb-4 max-w-[620px] text-[clamp(28px,4vw,40px)] font-medium leading-[1.2] tracking-[-.035em] text-zinc-900">{title}</h2>
        <p className="m-0 text-lg leading-[1.6] text-zinc-500">{description}</p>
      </header>
    </ScrollReveal>
  );
}

function AboutPage() {
  return (
    <div className="pt-12 max-[640px]:pt-8">
      <PageHeading
        eyebrow="About"
        title="A little about me."
        description="The curiosity that pulled me into software, and the interests that keep me exploring beyond it."
      />
      <section className="mb-12 max-[640px]:mb-9" aria-labelledby="about-heading">
        <h2 id="about-heading" className="mb-5 text-base font-medium leading-6 text-zinc-900">What keeps me curious</h2>
        <div className="mb-6 text-lg font-normal leading-[1.7] text-zinc-600 [&_p]:m-0 [&_p+p]:mt-5">
          <p>
            Just a developer who loves building random shit, experimenting with everything,
            messing things up, and learning along the way.
          </p>
          <p>
            I have a bad habit of wanting to become a polymath — from code, AI, and design
            to philosophy, psychology, politics, and every other shitty thing life has to
            offer. Don’t mistake me for a generalist, though. I love going deep into every
            rabbit hole.
          </p>
          <p>
            I love being a developer, but hell no, I'm not spending my entire life just coding. Wanna be that 60-year-old grandpa still trying to figure out some new shit while living every bit of life.
          </p>
        </div>
      </section>
      <section aria-labelledby="story-heading">
        <h2 id="story-heading" className="mb-5 text-base font-medium leading-6 text-zinc-900">How I got here</h2>
        <div>
          {story.map(([period, title, copy]) => (
            <ScrollReveal key={period}>
              <article className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 border-t border-zinc-200 py-7 max-[640px]:grid-cols-1 max-[640px]:gap-2">
                <span className="font-mono text-base font-normal leading-6 text-zinc-400">{period}</span>
                <div>
                  <h3 className="m-0 text-[19px] font-medium leading-[1.4] text-zinc-900">{title}</h3>
                  <p className="mt-2 mb-0 text-base leading-[1.7] text-zinc-500">{copy}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function BookshelfPage() {
  return (
    <div className="pt-12 max-[640px]:pt-8">
      <PageHeading eyebrow="Bookshelf" title="Ideas I keep close." description="A small collection of books I’ve read and the ideas I took from them." />
      <div >
        {books.map((book) => (
          <ScrollReveal key={book.id}>
            <article className="grid grid-cols-[112px_minmax(0,1fr)] gap-7 border-t border-zinc-200 py-7 max-[640px]:grid-cols-[80px_minmax(0,1fr)] max-[640px]:gap-[18px]">
              <img className="block w-28 max-h-[170px] object-contain object-top max-[640px]:w-20 max-[640px]:max-h-[120px]" src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
              <div>
                <p className="mb-1.5 font-mono text-[13px] uppercase leading-5 tracking-[.04em] text-zinc-400">{book.category === "Phylosohy" ? "Philosophy" : book.category}</p>
                <h3 className="m-0 text-[19px] font-medium leading-[1.4] text-zinc-900">{book.title}</h3>
                <p className="mt-0.5 mb-0 text-sm leading-[1.7] text-zinc-500">by {book.author}</p>
                <p className="mt-2 mb-0 text-base leading-[1.7] text-zinc-500">{book.description}</p>
                <ul className="my-4 pl-5 text-[15px] leading-[1.7] text-zinc-500">{book.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
                <TextLink href={book.amazonLink}>View book</TextLink>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function BlogsPage() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/blog/blog.json")
      .then((response) => { if (!response.ok) throw new Error("Could not load posts"); return response.json(); })
      .then((data) => setPosts(Object.entries(data).flatMap(([category, items]) => items.map((item) => ({ ...item, category })))))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="pt-12 max-[640px]:pt-8">
      <PageHeading eyebrow="Writing" title="Blogs" description="Notes from building, deploying, and learning software." />
      {error && <p className="text-zinc-500">Could not load the posts right now.</p>}
      {!error && !posts && <p className="text-zinc-500">Loading posts…</p>}
      {posts?.length === 0 && <p className="text-zinc-500">No posts yet.</p>}
      <div >
        {posts?.map((post) => (
          <ScrollReveal key={post.link}>
            <article className="border-t border-zinc-200 py-6">
              <div><p className="mb-3 font-mono text-[13px] uppercase leading-5 tracking-[.04em] text-zinc-400">{post.category} · {post.date}</p><h3 className="m-0 text-[19px] font-medium leading-[1.4] text-zinc-900"><TextLink href={post.link}>{post.title}</TextLink></h3></div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage({ slug }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/blog/${encodeURIComponent(slug)}.md`)
      .then((response) => { if (!response.ok) throw new Error("Post not found"); return response.text(); })
      .then(setContent)
      .catch(() => setError(true));
  }, [slug]);

  const body = content?.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "").trim();
  const blocks = body?.split(/\n\s*\n/);

  return (
    <div className="pt-12 max-[640px]:pt-8 [&_h2]:mb-7 [&_h2]:text-4xl [&_h2]:font-medium [&_h2]:tracking-[-.035em] [&_h3]:mt-9 [&_h3]:mb-4 [&_h3]:text-[22px] [&_h3]:font-medium [&_p]:mb-5 [&_ol]:text-base [&_ol]:leading-[1.8] [&_ol]:text-zinc-500">
      <a className="mb-10 inline-block text-[15px] text-zinc-500 no-underline hover:text-zinc-900" href="/blog">← All blogs</a>
      {error && <p className="text-zinc-500">This post could not be found.</p>}
      {!error && !content && <p className="text-zinc-500">Loading post…</p>}
      {blocks?.map((block, index) => {
        if (block.startsWith("# ")) return <h2 className="mb-7 text-4xl font-medium tracking-[-.035em]" key={index}>{block.slice(2)}</h2>;
        if (block.startsWith("## ")) return <h3 key={index}>{block.slice(3)}</h3>;
        if (/^\d+\. /m.test(block)) return <ol className="text-base leading-[1.8] text-zinc-500" key={index}>{block.split("\n").map((line) => <li key={line}>{line.replace(/^\d+\. /, "")}</li>)}</ol>;
        return <p className="mb-5 text-base leading-[1.7] text-zinc-500" key={index}>{block}</p>;
      })}
    </div>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = path === "/" ? <HomePage />
    : path === "/about" ? <AboutPage />
    : path === "/bookshelf" ? <BookshelfPage />
    : path === "/blog" ? <BlogsPage />
    : path.startsWith("/blog/") ? <BlogPostPage slug={path.slice(6)} />
    : <div className="pt-12 max-[640px]:pt-8"><PageHeading eyebrow="404" title="Page not found" description="There’s nothing at this address." /><a className="mb-10 inline-block text-[15px] text-zinc-500 no-underline hover:text-zinc-900" href="/">← Back home</a></div>;

  return (
    <main className="mx-auto grid w-full grid-cols-[minmax(152px,1fr)_minmax(0,672px)_minmax(64px,1fr)] gap-8 px-[clamp(24px,3vw,64px)] py-24 max-[1150px]:grid-cols-[minmax(0,672px)_48px] max-[1150px]:justify-center max-[1150px]:gap-6 max-[1150px]:px-6 max-[1150px]:py-12 max-[640px]:grid-cols-[minmax(0,1fr)] max-[640px]:gap-12">
      <ThemeToggle />
      <PageRail path={path} />
      <div className="col-start-2 min-w-0 max-[1150px]:col-start-1">
        <header >
          <a className="inline-block text-xl font-medium leading-7 tracking-[-.025em] text-zinc-900 no-underline hover:underline hover:decoration-zinc-300 hover:underline-offset-[3px]" href="/">Lakshay Goyal</a>
          <p className="m-0 text-lg font-normal leading-7 text-zinc-500">Software Engineer</p>
        </header>
        {page}
      </div>
      <ContactRail />
    </main>
  );
}

export default App;
