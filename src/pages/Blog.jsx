import { useState, useEffect, useMemo } from "react";

// Pre-configured open blog feeds (RSS converted to REST JSON automatically)
const BLOG_FEEDS = [
  {
    id: "isl",
    label: "🇮🇳 ISL & Indian Football",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/indian-football",
  },
  {
    id: "tactics",
    label: "📋 Tactical Analysis",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/football-tactics",
  },
  {
    id: "blogs",
    label: "🔥 Global Football Blogs",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/football",
  },
  {
    id: "goal_in",
    label: "📰 Goal India Editorials",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https://www.goal.com/feeds/en-in/news",
  },
];

export default function FootballBlogsAPI() {
  const [selectedFeed, setSelectedFeed] = useState(BLOG_FEEDS[0].id);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  useEffect(() => {
    const fetchBlogFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        const feedObj = BLOG_FEEDS.find((f) => f.id === selectedFeed) || BLOG_FEEDS[0];
        const response = await fetch(feedObj.url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Unable to fetch blog posts from API.");
        }

        // Process RSS items into structured blog data
        const processedBlogs = (data.items || []).map((item, index) => {
          const thumbnail =
            item.thumbnail ||
            extractImageFromHtml(item.content || item.description) ||
            `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80`;

          const cleanDescription = stripHtml(item.description || item.content).slice(0, 160) + "...";
          const readTime = Math.max(3, Math.ceil(stripHtml(item.content || "").split(" ").length / 200)) + " min read";

          return {
            id: item.guid || `blog-${index}`,
            title: item.title,
            excerpt: cleanDescription,
            content: item.content || item.description,
            link: item.link,
            author: {
              name: item.author || data.feed?.title || "Football Writer",
              role: "Editorial Contributor",
            },
            image: thumbnail,
            readTime,
            pubDate: formatDate(item.pubDate),
            categories: item.categories || ["Football", "Analysis"],
            likes: Math.floor(Math.random() * 80) + 20, // Simulated initial engagement
          };
        });

        setBlogs(processedBlogs);
      } catch (err) {
        setError(err.message || "Failed to load blog posts from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogFeed();
  }, [selectedFeed]);

  // Search filtering
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-7xl mt-30 mx-auto p-3 sm:p-6 font-sans text-slate-100">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xl">
                ✍️
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  Live Football Blogs & Analysis
                </h2>
                <p className=" text-slate-400">
                  Real-time editorial API feed from top football writers
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/80 transition"
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Feed Selector Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
            {BLOG_FEEDS.map((feed) => {
              const isActive = selectedFeed === feed.id;
              return (
                <button
                  key={feed.id}
                  onClick={() => setSelectedFeed(feed.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent shadow-lg scale-[1.02]"
                      : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  {feed.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 min-h-[400px]">
          {loading ? (
            <BlogSkeleton />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-sm text-red-400 bg-red-500/10 inline-block px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm bg-slate-800/20 rounded-xl border border-slate-800 border-dashed">
              No blog posts found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => setActiveArticle(blog)}
                  className="group flex flex-col justify-between bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-amber-500/40 rounded-2xl overflow-hidden p-4 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="h-44 w-full rounded-xl overflow-hidden mb-4 relative bg-slate-950">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80";
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700/60">
                        {blog.readTime}
                      </span>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-slate-200 truncate max-w-[200px]">
                        {blog.author.name}
                      </span>
                      <span className="text-[11px] whitespace-nowrap">{blog.pubDate}</span>
                    </div>

                    {/* Title & Excerpt */}
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLike(blog.id, e)}
                        className={`flex items-center gap-1 text-xs font-semibold transition ${
                          likedPosts[blog.id] ? "text-rose-400" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <svg className="w-4 h-4" fill={likedPosts[blog.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span>{blog.likes + (likedPosts[blog.id] ? 1 : 0)}</span>
                      </button>

                      <button
                        onClick={(e) => handleBookmark(blog.id, e)}
                        className={`text-xs transition ${
                          bookmarkedPosts[blog.id] ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <svg className="w-4 h-4" fill={bookmarkedPosts[blog.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                      </button>
                    </div>

                    <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Post
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <BlogModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </div>
  );
}

// In-App Article Reader Modal
function BlogModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-slate-700">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            {article.readTime}
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Article Body */}
        <div className="p-5 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between my-5 pb-4 border-b border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-100">{article.author.name}</p>
              <p className="text-xs text-slate-400">{article.pubDate}</p>
            </div>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Original Source</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-6 border border-slate-800"
          />

          {/* Render raw content HTML cleanly inside modal */}
          <div
            className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 font-normal blog-content-body overflow-hidden"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-bold text-white rounded-xl transition shadow"
            >
              Read full post on publisher site
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Utilities
function stripHtml(html) {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function extractImageFromHtml(html) {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-64 bg-slate-800/40 rounded-2xl border border-slate-700/30" />
      ))}
    </div>
  );
}