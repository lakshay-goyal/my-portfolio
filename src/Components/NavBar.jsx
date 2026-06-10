import { useMemo, useState } from "react";
import { BookOpen, Github, Home, Linkedin, Moon, PackageOpen, Sun, Twitter, UserRound, FileText } from "lucide-react";
import useTheme from "./useTheme";

const navLinks = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: UserRound },
  { href: "/projects", label: "Projects", Icon: PackageOpen },
  { href: "/bookshelf", label: "Books", Icon: BookOpen },
];

function NavBar() {
  const { isLight, isTransitioning, toggleTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;

  const activePath = useMemo(() => {
    if (pathname.startsWith("/projects")) return "/projects";
    if (pathname.startsWith("/bookshelf")) return "/bookshelf";
    if (pathname.startsWith("/about")) return "/about";
    return "/";
  }, [pathname]);

  const dockItems = useMemo(
    () => [
      ...navLinks.map((item) => ({ ...item, type: "route" })),
      {
        href: "https://github.com/lakshay-goyal",
        label: "GitHub",
        Icon: Github,
        type: "external",
        social: true,
      },
      {
        href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/",
        label: "LinkedIn",
        Icon: Linkedin,
        type: "external",
        social: true,
      },
      {
        href: "https://x.com/lakshayg2004",
        label: "X",
        Icon: Twitter,
        type: "external",
        social: true,
      },
      {
        href: "/Lakshay_Resume.pdf",
        label: "Resume",
        Icon: FileText,
        type: "external",
      },
      {
        label: isLight ? "Dark mode" : "Light mode",
        Icon: isLight ? Moon : Sun,
        type: "button",
        onClick: (event) => toggleTheme(event.currentTarget),
      },
    ],
    [isLight, toggleTheme]
  );

  const getDockStyle = (index) => {
    if (hoveredIndex === null) {
      const item = dockItems[index];
      const isActive = item.type === "route" && activePath === item.href;
      return {
        transform: `translateY(${isActive ? -2 : 0}px) scale(${isActive ? 1.06 : 1})`,
      };
    }

    const distance = Math.abs(hoveredIndex - index);
    const scale = distance === 0 ? 1.16 : distance === 1 ? 1.07 : distance === 2 ? 1.02 : 1;
    const translateY = distance === 0 ? -5 : distance === 1 ? -2 : 0;

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
    };
  };

  const dockGap = hoveredIndex === null ? "0.25rem" : "0.56rem";
  const groupGap = hoveredIndex === null ? "0.25rem" : "0.44rem";

  const renderDockItem = (item, index) => {
    const { href, label, Icon, type, onClick, social } = item;
    const isActive = type === "route" && activePath === href;
    const sharedClassName = `relative ${social ? "hidden sm:grid" : "grid"} h-10 w-10 place-items-center rounded-full transition-[transform,background-color,color,box-shadow] duration-200 ease-out will-change-transform sm:h-11 sm:w-11 ${
      isActive
        ? "bg-zinc-950 text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
        : "text-zinc-950 hover:bg-zinc-950/[0.08]"
    }`;
    const sharedProps = {
      "aria-label": label,
      title: label,
      className: sharedClassName,
      style: {
        ...getDockStyle(index),
        transformOrigin: "bottom center",
      },
      onMouseEnter: () => setHoveredIndex(index),
      onMouseLeave: () => setHoveredIndex(null),
      onFocus: () => setHoveredIndex(index),
      onBlur: () => setHoveredIndex(null),
    };
    const content = (
      <>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[48%_52%_44%_56%] bg-white/95 shadow-[0_8px_18px_rgba(24,24,27,0.16)] ring-1 ring-zinc-950/10 transition-all duration-200 ease-out ${
            hoveredIndex === index ? "scale-[1.08] opacity-100" : "scale-90 opacity-0"
          }`}
        />
        <span
          className={`pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl shadow-black/30 transition-all duration-150 ${
            hoveredIndex === index ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-95 opacity-0"
          }`}
        >
          {label}
        </span>
        <Icon
          className={`relative z-10 transition-colors duration-150 ${
            hoveredIndex === index ? "text-zinc-950" : ""
          }`}
          size={18}
          strokeWidth={2.2}
        />
      </>
    );

    if (type === "button") {
      return (
        <button
          key={label}
          type="button"
          onClick={onClick}
          disabled={isTransitioning}
          aria-pressed={isLight}
          {...sharedProps}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        key={href}
        href={href}
        target={type === "external" ? "_blank" : undefined}
        rel={type === "external" ? "noopener noreferrer" : undefined}
        {...sharedProps}
      >
        {content}
      </a>
    );
  };

  return (
    <nav className="fixed inset-x-0 bottom-3 z-50 px-3 sm:bottom-5" aria-label="Primary navigation">
      <div
        className="mx-auto flex w-max max-w-full items-end gap-1 rounded-full border border-zinc-950/20 bg-white/[0.94] p-1.5 text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.75),0_16px_44px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/[0.86]"
        style={{ gap: dockGap, transition: "gap 180ms ease-out" }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="flex min-w-0 items-end" style={{ gap: groupGap, transition: "gap 180ms ease-out" }}>
          {dockItems.slice(0, navLinks.length).map(renderDockItem)}
        </div>

        <div className="mx-1 mb-2 h-7 w-px border-l border-dashed border-zinc-300" />

        <div className="flex items-end" style={{ gap: groupGap, transition: "gap 180ms ease-out" }}>
          {dockItems.slice(navLinks.length).map((item, offset) => renderDockItem(item, navLinks.length + offset))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
