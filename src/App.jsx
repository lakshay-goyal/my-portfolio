import { useState } from "react";
import experiences from "./store/data/experiences.json";
import majorProjects from "./store/data/majorProjects.json";
import allProjects from "./store/data/allProjects.json";
import skills from "./store/data/skills.json";
import books from "./store/data/books.json";

const email = "lakshaygoyal201@gmail.com";

const contactLinks = [
  { label: "Email", href: `mailto:${email}` },
  { label: "GitHub", href: "https://github.com/lakshay-goyal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/" },
  { label: "X", href: "https://x.com/lakshayg2004" },
  { label: "Resume", href: "/Lakshay_Resume.pdf" },
  { label: "Book a call", href: "https://cal.com/lakshay-goyal/30min?overlayCalendar=true" },
];

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

function MoreAbout() {
  return (
    <section className="section more-section" aria-labelledby="more-heading">
      <h2 id="more-heading" className="section-title">More About Me</h2>
      <p className="more-copy">
        I work across mobile and web development, AI, and backend systems. Here are a few of the areas I keep building in and learning about.
      </p>
      <div className="simple-list">
        {skills.map((item) => (
          <div className="simple-row" key={item.title}>
            <span className="simple-label">{item.title}</span>
            <span className="simple-detail">{item.skills}</span>
          </div>
        ))}
      </div>
      <div className="reading-line">
        <span>On my bookshelf</span>
        <span>{books.map((book) => book.title).join(" · ")}</span>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="portfolio">
      <header className="site-header">
        <h1>Lakshay Goyal</h1>
        <p>Software Engineer</p>
      </header>

      <section className="section about-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title">About</h2>
        <div className="about-copy">
          <p>
            Just a curious builder with a bad habit of going down every damn rabbit hole, building random shit, and figuring out life beyond code.
          </p>
        </div>
      </section>

      <Experience />
      <FeaturedWork />
      <MoreAbout />

      <footer className="section contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="section-title">Contact</h2>
        <div className="contact-links">
          {contactLinks.map((link) => (
            <TextLink href={link.href} key={link.label}>{link.label}</TextLink>
          ))}
        </div>
      </footer>
    </main>
  );
}

export default App;
