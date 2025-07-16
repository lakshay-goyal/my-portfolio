import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NavBar from '../Components/NavBar';

function extractFrontmatter(markdown) {
  // Simple YAML frontmatter extractor
  if (markdown.startsWith('---')) {
    const end = markdown.indexOf('---', 3);
    if (end !== -1) {
      const fm = markdown.slice(3, end).trim();
      const lines = fm.split('\n');
      const data = {};
      lines.forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
          data[key.trim()] = rest.join(':').trim();
        }
      });
      return { frontmatter: data, content: markdown.slice(end + 3).trim() };
    }
  }
  return { frontmatter: {}, content: markdown };
}

function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Blog not found');
        return res.text();
      })
      .then((text) => {
        const { frontmatter, content } = extractFrontmatter(text);
        setFrontmatter(frontmatter);
        setContent(content);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  // Use cover image from frontmatter or fallback
  const coverImage = frontmatter.cover || frontmatter.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
  const title = frontmatter.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const date = frontmatter.date;

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 pb-12">
      {/* Back Button at top left */}
      <div className="fixed top-6 left-6 z-30">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 mt-16 py-2 bg-white/90 hover:bg-white text-indigo-700 rounded shadow text-base font-medium backdrop-blur border border-gray-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
      </div>
      {/* Cover Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-end justify-center bg-gray-200">
        <img
          src={coverImage}
          alt="Blog cover"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          style={{zIndex: 1}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" style={{zIndex: 2}}></div>
        <div className="relative z-10 w-full max-w-4xl px-4 pb-8 flex flex-col items-center justify-end my-36 mx-auto" style={{minHeight: '100%'}}>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-2 text-center break-words max-w-3xl" style={{lineHeight: 1.15, marginTop: '-2rem'}}>{title}</h1>
          {date && <div className="text-white/80 text-base mb-2 text-center">{date}</div>}
        </div>
      </div>

      {/* Blog Content Card */}
      <div className="max-w-5xl mx-auto -mt-20 relative z-20 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-16 prose prose-lg max-w-none border border-gray-100">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </div>
    </>
  );
}

export default BlogDetailsPage;