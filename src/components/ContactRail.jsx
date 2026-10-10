const email = "lakshaygoyal201@gmail.com";

const contacts = [
  { label: "Email", href: `mailto:${email}`, icon: "email" },
  { label: "GitHub", href: "https://github.com/lakshay-goyal", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lakshay-goyal-9778a6246/", icon: "linkedin" },
  { label: "X", href: "https://x.com/lakshayg2004", icon: "x" },
  { label: "Resume", href: "/Lakshay_Resume.pdf", icon: "resume" },
  { label: "Book a call", href: "https://cal.com/lakshay-goyal/30min?overlayCalendar=true", icon: "calendar" },
];

function ContactIcon({ name }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    github: <><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.8a5.3 5.3 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7S17.4.8 15 2.7a13 13 0 0 0-7 0C5.6.8 4.4 1.2 4.4 1.2a5 5 0 0 0-.1 3.7A5.3 5.3 0 0 0 2.8 8.6c0 5.3 3.1 6.5 6.1 6.8A3.4 3.4 0 0 0 8 18.1V22" /><path d="M15 22h-6" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.01M11 17v-7h3v1a3 3 0 0 1 5 2.5V17" /></>,
    x: <><path d="M4 3h4.2L20 21h-4.2L4 3Z" /><path d="M20 3 4 21" /></>,
    resume: <><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v6h5M9 13h6M9 17h6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-9 3v5m-2.5-2.5h5" /></>,
  };

  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function ContactRail() {
  return (
    <aside className="contact-rail" aria-label="Contact links">
      <div className="contact-icons">
        {contacts.map((contact) => (
          <a
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
    </aside>
  );
}
