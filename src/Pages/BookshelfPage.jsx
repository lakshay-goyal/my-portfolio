import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Loading from '../Components/Loading';
import useBooksStore from '../store/zustand/useBooksStore';

function BookDetailsModal({ book, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column - Book cover */}
            <div className="lg:w-2/5">
              <div className="bg-gray-50 rounded-lg p-4 flex justify-center items-center shadow-sm">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-64 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Cover";
                  }}
                />
              </div>

              {/* Purchase options */}
              <div className="mt-4">
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium text-center transition-all shadow hover:shadow-md flex items-center justify-center"
                >
                  Read Now
                </a>
              </div>
            </div>

            {/* Right column - Book details */}
            <div className="lg:w-3/5">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">
                  About this book
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {book.description}
                </p>
              </div>

              {/* Key features */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">
                  My Learnings ?
                </h3>
                <ul className="space-y-2">
                  {book.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
    const timer = setTimeout(() => setLoading(false), 600); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  const openBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  // Group books by category
  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              My Knowledge Library
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Track your reading and capture key insights from each book
          </p>
        </div>

        {/* Bookshelf Content */}
        <div className="space-y-10">
          {Object.entries(groupedBooks).map(([category, books]) => (
            <section key={category} className="relative">
              {/* Category Header */}
              <div className="relative mb-3 pl-4">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"></div>
                <div className="flex items-baseline">
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    {category}
                  </h2>
                  <span className="ml-3 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                    {books.length} {books.length === 1 ? "book" : "books"}
                  </span>
                </div>
              </div>

              {/* Books Grid - Modified for shorter height */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 flex flex-col border border-gray-100 hover:border-indigo-200"
                  >
                    {/* Book Cover - Made shorter */}
                    <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150x200?text=No+Cover";
                        }}
                      />
                    </div>

                    {/* Book Info - Compact layout */}
                    <div className="p-3 flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-500 text-xs mb-2 line-clamp-1">
                        by {book.author}
                      </p>

                      {/* Action Buttons - Made more compact */}
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => openBookDetails(book)}
                          className="flex-1 py-1 px-2 bg-white border border-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        >
                          Details
                        </button>
                        <a
                          href={book.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium text-center transition-colors"
                        >
                          Read
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(groupedBooks).length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Your bookshelf is empty
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4 text-sm">
              Start building your collection by adding your favorite books
            </p>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm shadow hover:shadow-md">
              Add Your First Book
            </button>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetailsModal book={selectedBook} onClose={closeBookDetails} />
      )}
    </div>
  );
}

export default BookshelfPage;