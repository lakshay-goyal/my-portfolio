import { useEffect, useState } from "react";
import experiences from "./store/data/experiences.json";
import majorProjects from "./store/data/majorProjects.json";
import allProjects from "./store/data/allProjects.json";
import skills from "./store/data/skills.json";
import books from "./store/data/books.json";
import PageRail from "./components/PageRail.jsx";
import ContactRail from "./components/ContactRail.jsx";
import ScrollReveal from "./components/ScrollReveal.jsx";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 10V4m0 0H6m6 0l-7.833 7.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TextLink({ href, children, className = "" }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      className={`text-link ${className}`}
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
    <section className="section experience-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-title">Work Experience</h2>
      <div className="row-list">
        {experiences.map((experience) => (
          <article className="timeline-row" key={`${experience.company}-${experience.period}`}>
            <p className="timeline-date">{experience.period}</p>
            <div className="row-content">
              <p className="row-title">
                {experience.role} at{" "}
                <TextLink href={experience.url}>{experience.company}</TextLink>
              </p>
              <p className="row-detail">{experience.location} • Full-time</p>
              <p className="row-summary">{experience.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const archive = Object.entries(allProjects).filter(([, projects]) => projects.length);

  return (
    <section id="work" className="section work-section" aria-labelledby="work-heading">
      <h2 id="work-heading" className="section-title">Selected Work</h2>
      <div className="row-list">
        {majorProjects.map((project, index) => (
          <article className="timeline-row project-row" key={project.title}>
            <p className="timeline-date">{String(index + 1).padStart(2, "0")}</p>
            <div className="row-content">
              <p className="row-title">
                <TextLink href={project.live || project.github}>{project.title}</TextLink>
              </p>
              <p className="row-detail">{project.description}</p>
              <p className="project-meta">{project.tech.slice(0, 4).join(" · ")}</p>
              {project.live && <TextLink className="project-source" href={project.github}>Source code</TextLink>}
            </div>
          </article>
        ))}
      </div>

      <div className="archive-control">
        <button
          type="button"
          className="archive-button"
          aria-expanded={archiveOpen}
          aria-controls="project-archive"
          onClick={() => setArchiveOpen((open) => !open)}
        >
          {archiveOpen ? "Hide project archive" : "View project archive"} <ArrowIcon />
        </button>
      </div>

      {archiveOpen && (
        <div id="project-archive" className="archive-content">
          {archive.map(([category, projects]) => (
            <div className="archive-group" key={category}>
              <h3>{category === "app" ? "Mobile apps" : category === "ai" ? "AI" : category === "web" ? "Web" : "Blockchain"}</h3>
              {projects.map((project) => (
                <div className="archive-row" key={`${category}-${project.id}`}>
                  <span>{project.title}</span>
                  <TextLink href={project.liveLink || project.githubLink}>
                    {project.liveLink ? "View project" : "Source code"}
                  </TextLink>
                </div>
              ))}
            </div>
          ))}
        </div>
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
  "App Development": (
    <>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </>
  ),
  AI: (
    <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
  ),
  Blockchain: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
};

function SkillIcon({ title }) {
  return (
    <svg className="skill-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {skillIcons[title]}
    </svg>
  );
}

function MoreAbout() {
  return (
    <section className="section more-section" aria-labelledby="more-heading">
      <h2 id="more-heading" className="section-title">Skills</h2>
      <div className="skill-list">
        {skills.map((item) => (
          <div className="skill-row" key={item.title}>
            <span className="skill-label">
              <SkillIcon title={item.title} />
              {item.title}
            </span>
            <span className="skill-detail">{item.skills.split(",").map((skill) => skill.trim()).join(" · ")}</span>
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
        <section className="section about-section" aria-labelledby="about-heading">
          <h2 id="about-heading" className="section-title">About</h2>
          <div className="about-copy">
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
      <header className="page-heading">
        <p className="page-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
    </ScrollReveal>
  );
}

function AboutPage() {
  return (
    <div className="inner-page">
      <PageHeading eyebrow="About me" title="I turn curiosity into shipped software." description="A little more about the path that brought me here." />
      <div className="story-list">
        {story.map(([period, title, copy]) => (
          <ScrollReveal key={period}>
            <section className="story-row">
              <span className="timeline-date">{period}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </section>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function BookshelfPage() {
  return (
    <div className="inner-page">
      <PageHeading eyebrow="Bookshelf" title="Ideas I keep close." description="A small collection of books I’ve read and the ideas I took from them." />
      <div className="book-list">
        {books.map((book) => (
          <ScrollReveal key={book.id}>
            <article className="book-row">
              <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
              <div>
                <p className="page-eyebrow">{book.category === "Phylosohy" ? "Philosophy" : book.category}</p>
                <h3>{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p>{book.description}</p>
                <ul>{book.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
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
    <div className="inner-page">
      <PageHeading eyebrow="Writing" title="Blogs" description="Notes from building, deploying, and learning software." />
      {error && <p className="state-message">Could not load the posts right now.</p>}
      {!error && !posts && <p className="state-message">Loading posts…</p>}
      {posts?.length === 0 && <p className="state-message">No posts yet.</p>}
      <div className="post-list">
        {posts?.map((post) => (
          <ScrollReveal key={post.link}>
            <article className="post-row">
              <div><p className="page-eyebrow">{post.category} · {post.date}</p><h3><TextLink href={post.link}>{post.title}</TextLink></h3></div>
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
    <div className="inner-page blog-post">
      <a className="back-link" href="/blog">← All blogs</a>
      {error && <p className="state-message">This post could not be found.</p>}
      {!error && !content && <p className="state-message">Loading post…</p>}
      {blocks?.map((block, index) => {
        if (block.startsWith("# ")) return <h2 key={index}>{block.slice(2)}</h2>;
        if (block.startsWith("## ")) return <h3 key={index}>{block.slice(3)}</h3>;
        if (/^\d+\. /m.test(block)) return <ol key={index}>{block.split("\n").map((line) => <li key={line}>{line.replace(/^\d+\. /, "")}</li>)}</ol>;
        return <p key={index}>{block}</p>;
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
    : <div className="inner-page"><PageHeading eyebrow="404" title="Page not found" description="There’s nothing at this address." /><a className="back-link" href="/">← Back home</a></div>;

  return (
    <main className="portfolio">
      <PageRail path={path} />
      <div className="main-column">
        <header className="site-header">
          <a className="site-name" href="/">Lakshay Goyal</a>
          <p>Software Engineer</p>
        </header>
        {page}
      </div>
      <ContactRail />
    </main>
  );
}

export default App;
