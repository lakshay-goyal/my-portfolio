import stackItems from "./stackItems";

function StackSection() {
  return (
    <section id="Skills" className="border-b border-white/10">
      <header className="stack-header-line relative flex h-[60px] items-center overflow-hidden border-b border-white/10 px-4">
        <h3 className="relative z-10 text-[30px] font-bold tracking-[-0.04em] text-white sm:text-[32px]">Skills</h3>
      </header>

      <div className="stack-surface relative overflow-hidden px-6 py-6 sm:px-7">
        <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-7">
          {stackItems.map(({ label, imageUrl, imageClassName }) => (
            <div
              key={label}
              className={"group relative grid h-12 place-items-center w-12"}
              aria-label={label}
              title={label}
            >
              <span className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/80 px-2 py-1 font-mono text-[10px] text-zinc-200 opacity-0 shadow-xl shadow-black/30 transition-all duration-150 group-hover:-bottom-7 group-hover:opacity-100">
                {label}
              </span>
              <span className={"grid h-12 place-items-center transition-transform duration-200 group-hover:-translate-y-1 w-12"}>
                <img
                  src={imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-contain ${imageClassName || ""}`}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackSection;
