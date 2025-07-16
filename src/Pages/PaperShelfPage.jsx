import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Loading from '../Components/Loading';

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani et al.",
    publication: "NeurIPS",
    year: 2017,
    link: "https://arxiv.org/abs/1706.03762",
    description: "Introduced the Transformer architecture, revolutionizing NLP and deep learning.",
    category: "AI/ML",
  },
];

const groupedPapers = papers.reduce((acc, paper) => {
  if (!acc[paper.category]) acc[paper.category] = [];
  acc[paper.category].push(paper);
  return acc;
}, {});

function PaperShelfPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">PaperShelf</h1>
        <div className="space-y-12">
          {Object.entries(groupedPapers).map(([category, papers]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {papers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      <a href={paper.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-700">
                        {paper.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 mb-1 text-sm italic">{paper.authors}</p>
                    <p className="text-gray-500 mb-1 text-xs">{paper.publication} &bull; {paper.year}</p>
                    <p className="text-gray-700 text-xs mb-2">{paper.description}</p>
                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-xs hover:underline mt-auto">Read Paper</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaperShelfPage; 