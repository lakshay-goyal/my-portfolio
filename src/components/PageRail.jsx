import { useEffect, useState } from "react";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "Blogs", href: "/blog" },
];

export default function PageRail({ path }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <nav className="page-rail" aria-label="Pages">
      <p className="rail-heading">Explore</p>
      <div className="page-rail-body">
        <span className="page-rail-track" aria-hidden="true">
          <span className="page-rail-progress" style={{ transform: `scaleY(${progress})` }} />
        </span>
        <div className="page-rail-links">
          {pages.map((page, index) => (
            <a
              className="page-rail-link"
              href={page.href}
              key={page.href}
              aria-current={(page.href === "/blog" ? path.startsWith("/blog") : path === page.href) ? "page" : undefined}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <span className="page-rail-dot" aria-hidden="true" />
              <span>{page.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
