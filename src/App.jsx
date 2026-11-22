import { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import experiences from "./store/data/experiences.json";
import majorProjects from "./store/data/majorProjects.json";
import skills from "./store/data/skills.json";
import books from "./store/data/books.json";
import PageRail from "./components/PageRail.jsx";
import ContactRail from "./components/ContactRail.jsx";
import useStreamReveal from "./components/useStreamReveal.js";
import brandIcons from "./components/brandIcons.js";

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

// Shared type scale and layout so every page reads the same.
// Kept as literal Tailwind classes because dark mode overrides target them in index.css.
const styles = {
  page: "flex flex-col gap-16 pt-14 max-[640px]:gap-12 max-[640px]:pt-10",
  // Contrast on white: zinc-900 ~17:1, zinc-700 ~10:1, zinc-600 ~7.7:1, zinc-500 ~4.8:1 (all pass WCAG AA).
  sectionTitle: "mb-5 text-xl font-medium leading-8 tracking-[-.015em] text-zinc-900",
  meta: "m-0 font-mono text-sm leading-6 text-zinc-500",
  title: "m-0 text-[17px] font-medium leading-7 tracking-[-.01em] text-zinc-900",
  lead: "text-lg leading-[1.75] text-zinc-700 [&_p]:m-0 [&_p+p]:mt-5",
  body: "m-0 text-base leading-[1.7] text-zinc-600",
  row: "grid grid-cols-[168px_minmax(0,1fr)] gap-x-6 border-t border-dashed border-zinc-200 py-6 max-[640px]:grid-cols-1 max-[640px]:gap-y-1.5",
};

function TextLink({ href, children, className = "", muted = false }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  const tone = muted ? "font-normal text-zinc-500 hover:text-zinc-900" : "font-medium text-zinc-900";

  return (
    <a
      className={`group underline decoration-zinc-400 decoration-dotted decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-zinc-500 [&_svg]:ml-0.5 [&_svg]:inline-block [&_svg]:text-black/30 [&_svg]:transition-colors [&_svg]:duration-200 group-hover:[&_svg]:text-black/80 ${tone} ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children} <ArrowIcon />
    </a>
  );
}

// "A · B · C" that never starts a wrapped line with "·" or splits a multi-word tag.
function joinTags(tags) {
  return tags.map((tag) => tag.replaceAll(" ", "\u00a0")).join("\u00a0· ");
}

function BackLink({ href, children }) {
  return <a data-reveal className="inline-block self-start text-base text-zinc-600 no-underline transition-colors hover:text-zinc-900" href={href}>← {children}</a>;
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-8" aria-labelledby={`${id}-heading`}>
      <h2 data-reveal id={`${id}-heading`} className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

// Each paragraph streams in on its own, top to bottom.
function Lead({ paragraphs }) {
  return (
    <div className={styles.lead}>
      {paragraphs.map((paragraph) => <p data-reveal key={paragraph}>{paragraph}</p>)}
    </div>
  );
}

// Opens every page the same way: heading + lead paragraph(s).
function PageHeading({ title, paragraphs }) {
  return (
    <header>
      <h2 data-reveal className={styles.sectionTitle}>{title}</h2>
      <Lead paragraphs={paragraphs} />
    </header>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Work Experience">
      {experiences.map((experience) => (
        <article data-reveal className={styles.row} key={`${experience.company}-${experience.period}`}>
          <p className={styles.meta}>{experience.period}</p>
          <div className="min-w-0">
            <h3 className={styles.title}>
              {experience.role} at <TextLink href={experience.url}>{experience.company}</TextLink>
            </h3>
            <p className={`mt-0.5 ${styles.meta}`}>{experience.location} · Full-time</p>
            <p className={`mt-2 ${styles.body}`}>{experience.summary}</p>
          </div>
        </article>
      ))}
    </Section>
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
    <Section id="work" title="Selected Work">
      <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
        {majorProjects.map((project, index) => (
          <article data-reveal className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white" key={project.title}>
            <button
              type="button"
              className="group relative block aspect-[1.55] w-full cursor-pointer overflow-hidden border-0 border-b border-solid border-zinc-200 bg-zinc-100 p-0 text-left"
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
            <div className="flex flex-1 flex-col p-5">
              <p className={`mb-1 ${styles.meta}`}>{String(index + 1).padStart(2, "0")}</p>
              <h3 className={styles.title}><TextLink href={project.live || project.github}>{project.title}</TextLink></h3>
              <p className={`mt-2 ${styles.body}`}>{project.description}</p>
              <p className={`mt-3 ${styles.meta}`}>{joinTags(project.tech.slice(0, 4))}</p>
              {project.live && <TextLink muted className="mt-2 self-start" href={project.github}>Source code</TextLink>}
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
    </Section>
  );
}

function BrandIcon({ name }) {
  return (
    <svg className="shrink-0 text-zinc-900" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d={brandIcons[name]} />
    </svg>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      {skills.map((item) => (
        <div data-reveal className="border-t border-dashed border-zinc-200 py-6" key={item.title}>
          <h3 className={styles.title}>{item.title}</h3>
          <ul className="m-0 mt-4 grid list-none grid-cols-3 gap-x-6 gap-y-3.5 p-0 max-[640px]:grid-cols-2">
            {item.tools.map((tool) => (
              <li className="flex min-w-0 items-center gap-2.5 text-base leading-6 text-zinc-700" key={tool}>
                <BrandIcon name={tool} />
                {tool}
              </li>
            ))}
          </ul>
          {item.also.length > 0 && (
            <p className={`mt-4 ${styles.body}`}>
              <span className="font-medium text-zinc-900">Also: </span>
              {joinTags(item.also)}
            </p>
          )}
        </div>
      ))}
    </Section>
  );
}

function HomePage() {
  return (
    <div className={styles.page}>
      <PageHeading
        title="About"
        paragraphs={["Just a curious builder with a bad habit of going down every damn rabbit hole, building random shit, and figuring out life beyond code."]}
      />
      <Experience />
      <FeaturedWork />
      <Skills />
    </div>
  );
}

const story = [
  ["2022–2023", "Finding a direction", "I started learning by building projects in college. Coming from a commerce background, I worked through the maths behind machine learning and deep learning, then built a language translator app with a local NLP model."],
  ["2025", "Building for the web", "I moved into the MERN stack and learned how authentication, APIs, interfaces, and deployment come together in real products."],
  ["Super30", "Going deeper", "Being part of Super30 pushed me to ship more and learn about backend design, DevOps, AI engineering, real-time systems, and system design."],
  ["Now", "Working on products", "I moved from Delhi to Bangalore, helped build FOZO from the ground up, and now work on test automation at Testsigma. I care about polished interfaces, understandable systems, and work that lasts beyond a demo."],
];

function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHeading title="About" paragraphs={["A little about me. The curiosity that pulled me into software, and the interests that keep me exploring beyond it."]} />
      <Section id="curious" title="What keeps me curious">
        <Lead
          paragraphs={[
            "Just a developer who loves building random shit, experimenting with everything, messing things up, and learning along the way.",
            "I have a bad habit of wanting to become a polymath — from code, AI, and design to philosophy, psychology, politics, and every other shitty thing life has to offer. Don’t mistake me for a generalist, though. I love going deep into every rabbit hole.",
            "I love being a developer, but hell no, I'm not spending my entire life just coding. Wanna be that 60-year-old grandpa still trying to figure out some new shit while living every bit of life.",
          ]}
        />
      </Section>
      <Section id="story" title="How I got here">
        {story.map(([period, title, copy]) => (
          <article data-reveal className={styles.row} key={period}>
            <span className={styles.meta}>{period}</span>
            <div>
              <h3 className={styles.title}>{title}</h3>
              <p className={`mt-2 ${styles.body}`}>{copy}</p>
            </div>
          </article>
        ))}
      </Section>
    </div>
  );
}

function BookshelfPage() {
  return (
    <div className={styles.page}>
      <PageHeading title="Bookshelf" paragraphs={["Ideas I keep close. A small collection of books I’ve read and the ideas I took from them."]} />
      <Section id="books" title="Books">
        {books.map((book) => (
          <article data-reveal className={`${styles.row} max-[640px]:grid-cols-[80px_minmax(0,1fr)] max-[640px]:gap-x-5`} key={book.id}>
            <img className="block w-28 max-h-[170px] object-contain object-top max-[640px]:w-20 max-[640px]:max-h-[120px]" src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
            <div>
              <p className={`mb-1 ${styles.meta}`}>{book.category === "Phylosohy" ? "Philosophy" : book.category}</p>
              <h3 className={styles.title}>{book.title}</h3>
              <p className={`mt-0.5 ${styles.body}`}>by {book.author}</p>
              <p className={`mt-2 mb-4 ${styles.body}`}>{book.description}</p>
              <TextLink href={book.amazonLink}>View book</TextLink>
            </div>
          </article>
        ))}
      </Section>
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
    <div className={styles.page}>
      <PageHeading title="Blogs" paragraphs={["Notes from building, deploying, and learning software."]} />
      <Section id="posts" title="Posts">
        {error && <p data-reveal className={styles.body}>Could not load the posts right now.</p>}
        {!error && !posts && <p className={styles.body}>Loading posts…</p>}
        {posts?.length === 0 && <p data-reveal className={styles.body}>No posts yet.</p>}
        {posts?.map((post) => (
          <article data-reveal className={styles.row} key={post.link}>
            <p className={styles.meta}>{post.date}</p>
            <div>
              <h3 className={styles.title}><TextLink href={post.link}>{post.title}</TextLink></h3>
              <p className={`mt-1 ${styles.meta}`}>{post.category}</p>
            </div>
          </article>
        ))}
      </Section>
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
    <div className={styles.page}>
      <BackLink href="/blog">All blogs</BackLink>
      <article>
        {error && <p data-reveal className={styles.body}>This post could not be found.</p>}
        {!error && !content && <p className={styles.body}>Loading post…</p>}
        {blocks?.map((block, index) => {
          if (block.startsWith("# ")) return <h1 data-reveal className="mb-6 text-[28px] font-medium leading-9 tracking-[-.025em] text-zinc-900" key={index}>{block.slice(2)}</h1>;
          if (block.startsWith("## ")) return <h2 data-reveal className={`mt-10 mb-3 ${styles.title}`} key={index}>{block.slice(3)}</h2>;
          if (/^\d+\. /m.test(block)) return <ol data-reveal className={`mb-5 list-decimal pl-5 ${styles.lead}`} key={index}>{block.split("\n").map((line) => <li key={line}>{line.replace(/^\d+\. /, "")}</li>)}</ol>;
          return <p data-reveal className={`mb-5 ${styles.lead}`} key={index}>{block}</p>;
        })}
      </article>
    </div>
  );
}

function SiteHeader() {
  const current = experiences[0];

  return (
    <header data-reveal className="flex items-center gap-4">
      <a className="monogram grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-mono text-lg font-medium tracking-[-.04em] no-underline" href="/" aria-label="Lakshay Goyal, home">
        LG
      </a>
      <div className="min-w-0">
        <h1 className="m-0 text-[28px] font-medium leading-9 tracking-[-.035em] text-zinc-900">Lakshay Goyal</h1>
        <p className="m-0 text-base leading-6 text-zinc-600">
          {current.role} at <TextLink href={current.url}>{current.company}</TextLink>
          <span className="text-zinc-500 max-[640px]:hidden"> · {current.location}</span>
        </p>
      </div>
    </header>
  );
}

function App() {
  const contentRef = useRef(null);
  useStreamReveal(contentRef);

  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page = path === "/" ? <HomePage />
    : path === "/about" ? <AboutPage />
    : path === "/bookshelf" ? <BookshelfPage />
    : path === "/blog" ? <BlogsPage />
    : path.startsWith("/blog/") ? <BlogPostPage slug={path.slice(6)} />
    : <div className={styles.page}><BackLink href="/">Back home</BackLink><PageHeading title="Page not found" paragraphs={["There’s nothing at this address."]} /></div>;

  return (
    <main className="mx-auto grid w-full grid-cols-[minmax(152px,1fr)_minmax(0,672px)_minmax(64px,1fr)] gap-8 px-[clamp(24px,3vw,64px)] py-24 max-[1150px]:grid-cols-[minmax(0,672px)_48px] max-[1150px]:justify-center max-[1150px]:gap-6 max-[1150px]:px-6 max-[1150px]:py-12 max-[640px]:grid-cols-[minmax(0,1fr)] max-[640px]:gap-12">
      <ThemeToggle />
      <PageRail path={path} />
      <div ref={contentRef} className="col-start-2 min-w-0 max-[1150px]:col-start-1">
        <SiteHeader />
        {page}
      </div>
      <ContactRail />
    </main>
  );
}

export default App;
