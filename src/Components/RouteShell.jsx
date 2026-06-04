import NavBar from "./NavBar";

function RouteShell({ eyebrow, title, description, children }) {
  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100">
      <main className="relative isolate min-h-screen overflow-hidden px-3 pb-28 pt-5 sm:px-6 sm:pb-32 sm:pt-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute inset-x-0 top-[46%] -z-10 h-10 border-y border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_7px)] opacity-30" />
        <div className="mx-auto w-full max-w-[768px] border-x border-white/10 bg-[#070707]/88 backdrop-blur">
          <header className="border-y border-white/10 bg-[#070707]/80 p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-600">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-zinc-400">{description}</p>}
          </header>
          <div className="h-10 border-b border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.13)_0,rgba(255,255,255,0.13)_1px,transparent_1px,transparent_7px)] opacity-40" />
          <div>{children}</div>
        </div>
      </main>
      <NavBar />
    </div>
  );
}

export default RouteShell;
