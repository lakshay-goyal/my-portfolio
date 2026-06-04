function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#070707]">
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-zinc-200" />
      <span className="font-mono text-sm tracking-wide text-zinc-500">Loading...</span>
    </div>
  );
}

export default Loading; 
