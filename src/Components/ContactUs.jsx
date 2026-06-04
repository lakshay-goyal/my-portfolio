import { useState } from "react";
import { CheckCircle2, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Lakshay from "../assets/img/Lakshay.png";

const email = "lakshaygoyal201@gmail.com";

function ContactUs() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <footer id="Contact" className="bg-[#08090b] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="bg-[#0b0c10] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Contact</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Have a role, project, or collaboration in mind?
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
                Send me the context and I will respond with the clearest next step.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-200"
                >
                  <Mail size={17} />
                  Email me
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white transition-all duration-200 hover:border-emerald-300/40"
                >
                  {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>

            <div className="bg-[#0b0c10] p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <img src={Lakshay} alt="Lakshay Goyal" className="h-16 w-16 rounded-lg border border-white/10 object-cover grayscale" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Lakshay Goyal</h3>
                  <p className="mt-1 text-sm text-zinc-500">Software Developer</p>
                </div>
              </div>

              <div className="mt-7 space-y-3 text-sm text-zinc-400">
                <a href={`mailto:${email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Mail size={16} className="text-emerald-300" />
                  {email}
                </a>
                <p className="flex items-center gap-3">
                  <MapPin size={16} className="text-emerald-300" />
                  Rajasthan, India
                </p>
              </div>

              <div className="mt-7 flex gap-2">
                <a
                  href="https://github.com/lakshay-goyal"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/lakshay-goyal-9778a6246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center font-mono text-xs text-zinc-600">
          Built with React, Tailwind CSS, Framer Motion and Vite.
        </p>
      </div>
    </footer>
  );
}

export default ContactUs;
