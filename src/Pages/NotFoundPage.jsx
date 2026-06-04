import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-4 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="w-full max-w-xl border border-white/10 bg-[#070707]/90 p-8 text-center backdrop-blur">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-zinc-500">
          <SearchX size={24} />
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-zinc-600">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-7 text-zinc-400">
          The route does not exist or was moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          <ArrowLeft size={15} />
          Go home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage; 
