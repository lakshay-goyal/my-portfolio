import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';

function BlogPage() {
  const [blogs, setBlogs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/blog/blog.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load blogs');
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Flatten all blogs for search
  const allBlogs = Object.entries(blogs).flatMap(([category, blogArr]) =>
    blogArr.map(blog => ({ ...blog, category }))
  );

  const filteredBlogs = allBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered blogs by category
  const groupedBlogs = filteredBlogs.reduce((acc, blog) => {
    if (!acc[blog.category]) acc[blog.category] = [];
    acc[blog.category].push(blog);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavBar />
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The knowledge I gained from my journey is the greatest gift. And I would love to share those with others. All this blogs is just an reminder for me to explore new things and unlock new opportunities.<br/> <b>'Hope Everyone likes this'</b>.
          </p>
        </div>
        {/* Blog List by Category */}
        {loading ? (
          <div className="text-gray-500">Loading blogs...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : Object.keys(groupedBlogs).length === 0 ? (
          <div className="text-gray-500">No blogs found.</div>
        ) : (
          Object.entries(groupedBlogs).map(([category, blogArr]) => (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 capitalize">{category}</h2>
              <ul className="space-y-2">
                {blogArr.map((blog, idx) => (
                  <li key={idx}>
                    <span className="text-gray-500 mr-2">{blog.date}</span>:
                    <a
                      href={blog.link}
                      rel="noopener noreferrer"
                      className="text-indigo-700 hover:underline ml-2"
                    >
                      {blog.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogPage;