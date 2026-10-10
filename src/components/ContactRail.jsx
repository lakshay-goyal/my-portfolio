import { LiquidMetal } from "@paper-design/shaders-react";

const email = "lakshaygoyal201@gmail.com";
const bookingUrl = "https://cal.com/lakshay-goyal/30min?overlayCalendar=true";

const contacts = [
  { label: "Email", href: `mailto:${email}`, icon: "email" },
  { label: "GitHub", href: "https://github.com/lakshay-goyal", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/", icon: "linkedin" },
  { label: "X", href: "https://x.com/lakshayg2004", icon: "x" },
  { label: "Resume", href: "/Lakshay_Resume.pdf", icon: "resume" },
];

function ContactIcon({ name }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    github: <><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.8a5.3 5.3 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7S17.4.8 15 2.7a13 13 0 0 0-7 0C5.6.8 4.4 1.2 4.4 1.2a5 5 0 0 0-.1 3.7A5.3 5.3 0 0 0 2.8 8.6c0 5.3 3.1 6.5 6.1 6.8A3.4 3.4 0 0 0 8 18.1V22" /><path d="M15 22h-6" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.01M11 17v-7h2.5a3 3 0 0 1 3 3v4" /></>,
    x: <><path d="M4 3h4.2L20 21h-4.2L4 3Z" /><path d="M20 3 4 21" /></>,
    resume: <><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v6h5M9 13h6M9 17h6" /></>,
  };

  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4m10-4v4M3 10h18m-9 3v5m-2.5-2.5h5" />
    </svg>
  );
}

function ScheduleButton() {
  return (
    <a
      className="schedule-cta fixed bottom-6 right-6 z-30 isolate inline-flex overflow-hidden rounded-full p-[1.5px] text-zinc-900 no-underline transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-offset-4 max-[640px]:right-4 max-[640px]:bottom-4"
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Schedule a 30-minute Google Meet"
      title="Schedule a 30-minute Google Meet"
    >
      <LiquidMetal
        className="absolute inset-0 -z-10 h-full w-full rounded-full"
        shape="none"
        speed={0.6}
        repetition={4}
        softness={0.5}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0}
        contour={0}
        angle={45}
        scale={8}
        offsetX={0.1}
        offsetY={-0.1}
      />
      <span className="schedule-cta-surface relative flex h-11 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium tracking-[-.01em]">
        <CalendarIcon />
        <span>Schedule</span>
      </span>
    </a>
  );
}

export default function ContactRail() {
  return (
    <>
      <aside className="fixed right-0 top-1/2 z-10 max-h-[calc(100dvh-36px)] w-14 -translate-y-1/2 overflow-y-auto rounded-l-md border border-zinc-200 bg-white max-[1150px]:sticky max-[1150px]:top-12 max-[1150px]:col-start-2 max-[1150px]:max-h-none max-[1150px]:overflow-visible max-[1150px]:translate-y-0 max-[640px]:static max-[640px]:col-start-1 max-[640px]:w-fit max-[640px]:justify-self-start max-[640px]:translate-y-0 max-[640px]:rounded-md" aria-label="Contact links">
      <nav aria-label="Contact links">
        <div className="flex flex-col max-[640px]:flex-row">
          {contacts.map((contact) => (
            <a
              className="grid h-11 w-full shrink-0 place-items-center text-zinc-600 transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-900 max-[640px]:w-11 max-[640px]:border-r max-[640px]:last:border-r-0"
              href={contact.href}
              key={contact.label}
              aria-label={contact.label}
              title={contact.label}
              target={contact.href.startsWith("http") || contact.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") || contact.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
            >
              <ContactIcon name={contact.icon} />
            </a>
          ))}
        </div>
      </nav>
      </aside>
      <ScheduleButton />
    </>
  );
}
