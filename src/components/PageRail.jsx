const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "Blogs", href: "/blog" },
];

export default function PageRail({ path }) {
  return (
    <nav className="page-rail" aria-label="Pages">
      <div className="page-rail-body">
        <div className="page-rail-links">
          {pages.map((page) => (
            <a
              className="page-rail-link"
              href={page.href}
              key={page.href}
              aria-current={(page.href === "/blog" ? path.startsWith("/blog") : path === page.href) ? "page" : undefined}
            >
              <span>{page.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
