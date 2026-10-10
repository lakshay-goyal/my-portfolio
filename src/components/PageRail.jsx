const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "Blogs", href: "/blog" },
];

export default function PageRail({ path }) {
  return (
    <nav className="fixed left-[clamp(16px,1.5vw,28px)] top-1/2 z-10 max-h-[calc(100dvh-32px)] w-40 -translate-y-1/2 overflow-y-auto max-[1150px]:static max-[1150px]:col-span-2 max-[1150px]:w-auto max-[1150px]:max-h-none max-[1150px]:overflow-visible max-[1150px]:translate-y-0 max-[640px]:col-span-1" aria-label="Pages">
      <div>
        <div className="flex flex-col max-[1150px]:flex-row max-[1150px]:flex-wrap max-[1150px]:gap-x-7 max-[1150px]:gap-y-2">
          {pages.map((page) => (
            <a
              className="relative flex min-h-[52px] items-center text-[15px] text-zinc-500 no-underline transition-[color,transform] duration-200 hover:translate-x-1 hover:text-zinc-900 max-[1150px]:min-h-7 aria-[current=page]:font-medium aria-[current=page]:text-zinc-900 max-[1150px]:aria-[current=page]:underline max-[1150px]:aria-[current=page]:decoration-zinc-300 max-[1150px]:aria-[current=page]:underline-offset-[5px]"
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
