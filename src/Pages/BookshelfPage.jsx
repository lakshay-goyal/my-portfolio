import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, Check, X } from "lucide-react";
import Loading from "../Components/Loading";
import RouteShell from "../Components/RouteShell";
import useBooksStore from "../store/zustand/useBooksStore";

function BookDetailsModal({ book, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <div className="max-h-[90vh] w-full max-w-[768px] overflow-y-auto border border-white/10 bg-[#08090b]">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">book notes</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">{book.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-[0.42fr_0.58fr]">
          <div className="bg-[#08090b] p-5">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
              <img
                src={book.cover}
                alt={book.title}
                className="mx-auto h-72 object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
            <a
              href={book.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              Read Now
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="bg-[#08090b] p-5">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">About</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-300">{book.description}</p>

            <h3 className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">Learnings</h3>
            <ul className="mt-3 space-y-3">
              {book.keyPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-400">
                    <Check size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookshelfPage() {
  const books = useBooksStore((state) => state.books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <RouteShell
      eyebrow="knowledge library"
      title="Bookshelf"
      description="A small shelf of books and the ideas I want to keep close while building."
    >
      {Object.keys(groupedBooks).length === 0 ? (
        <div className="border border-white/10 bg-[#08090b]/95 p-5 text-zinc-400">No books found.</div>
      ) : (
        <div className="space-y-5">
          {Object.entries(groupedBooks).map(([category, categoryBooks]) => (
            <section key={category} className="overflow-hidden border border-white/10 bg-white/10">
              <div className="flex items-center justify-between bg-[#08090b]/95 px-4 py-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">{category}</h2>
                <span className="rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-600">
                  {categoryBooks.length} books
                </span>
              </div>
              <div className="grid gap-px bg-white/10">
                {categoryBooks.map((book) => (
                  <article key={book.id} className="group flex flex-col gap-4 bg-[#08090b]/95 p-4 transition-colors hover:bg-[#101010] sm:flex-row sm:items-center">
                    <div className="shrink-0 rounded-md border border-white/10 bg-white/[0.025] p-3 sm:w-32">
                      <img
                        src={book.cover}
                        alt={book.title}
                        loading="lazy"
                        className="mx-auto h-40 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-base font-bold text-white">{book.title}</h3>
                      <p className="mt-1 text-sm text-zinc-600">by {book.author}</p>
                    </div>
                    <div className="flex gap-2 sm:w-44 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => setSelectedBook(book)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                      >
                        <BookOpen size={15} />
                        Details
                      </button>
                      <a
                        href={book.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
                      >
                        Read
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {selectedBook && <BookDetailsModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </RouteShell>
  );
}

export default BookshelfPage;
