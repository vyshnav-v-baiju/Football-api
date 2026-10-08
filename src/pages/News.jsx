import { useState, useEffect } from "react";

const QUICK_TOPICS = [
  { label: "All Football", query: "football OR soccer" },
  { label: "🇮🇳 ISL & Indian Football", query: "Indian Super League OR ISL football" },
  { label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", query: "Premier League" },
  { label: "🇪🇸 La Liga", query: "La Liga" },
  { label: "🔄 Transfers", query: "football transfers OR transfer news" },
];

export default function FootballNews() {
  const [news, setNews] = useState([]);
  const [activeTopic, setActiveTopic] = useState(QUICK_TOPICS[0].query);
  const [customSearch, setCustomSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey =
          import.meta.env.VITE_GNEWS_API_KEY 

        // Dynamically compute the last 7 days window
        const now = new Date();
        const pastDate = new Date();
        pastDate.setDate(now.getDate() - 7);

        const toStr = now.toISOString();
        const fromStr = pastDate.toISOString();

        const query = customSearch.trim() || activeTopic;

        const url = `https://gnews.io/api/v4/search?apikey=${apiKey}&q=${encodeURIComponent(
          query
        )}&lang=en&max=7&from=${fromStr}&to=${toStr}&in=title,description,content`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0] || "API limit reached or invalid request.");
        }

        setNews(data.articles || []);
      } catch (err) {
        setError(err.message || "Unable to load latest football news.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce custom search or fetch on topic change
    const timer = setTimeout(() => {
      fetchNews();
    }, 400);

    return () => clearTimeout(timer);
  }, [activeTopic, customSearch]);

  const heroArticle = news[0];
  const secondaryArticles = news.slice(1);

  return (
    <div className="w-full max-w-7xl mx-auto mt-30 p-3 sm:p-6 font-sans text-slate-100">
      {/* Outer Glassmorphism Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header & Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xl">
                📰
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  Matchday News & Headlines
                </h2>
                <p className=" text-white">
                  Powered by GNews API • Updated in real-time
                </p>
              </div>
            </div>

            {/* Custom Search Bar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search headlines or clubs..."
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/80 transition"
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Quick Topic Chips */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_TOPICS.map((topic) => {
              const isActive = !customSearch && activeTopic === topic.query;
              return (
                <button
                  key={topic.label}
                  onClick={() => {
                    setCustomSearch("");
                    setActiveTopic(topic.query);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent shadow-lg scale-[1.02]"
                      : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  {topic.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* News Content Area */}
        <div className="p-4 sm:p-6 min-h-[400px]">
          {loading ? (
            <NewsSkeleton />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-sm text-red-400 bg-red-500/10 inline-block px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm bg-slate-800/20 rounded-xl border border-slate-800 border-dashed">
              No news articles found for this topic right now.
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Top Featured Hero Card */}
              {heroArticle && (
                <a
                  href={heroArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl overflow-hidden bg-slate-800/40 border border-slate-700/60 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 h-56 sm:h-72 lg:h-80 overflow-hidden relative">
                      <img
                        src={heroArticle.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80"}
                        alt={heroArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                      <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                        Top Story
                      </span>
                    </div>

                    <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                          <span className="font-semibold text-amber-400">
                            {heroArticle.source?.name || "Football News"}
                          </span>
                          <span>•</span>
                          <span>{formatTimeAgo(heroArticle.publishedAt)}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                          {heroArticle.title}
                        </h3>
                        <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-3 sm:line-clamp-4 leading-relaxed">
                          {heroArticle.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                        <span>Read Full Story</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {/* Grid for Remaining 6 Articles */}
              {secondaryArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {secondaryArticles.map((article, idx) => (
                    <a
                      key={idx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl overflow-hidden p-3.5 transition-all duration-200"
                    >
                      <div>
                        <div className="h-40 w-full rounded-lg overflow-hidden mb-3 relative bg-slate-950">
                          <img
                            src={article.image || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&q=80"}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&q=80";
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                          <span className="font-semibold text-slate-300 truncate">
                            {article.source?.name || "News"}
                          </span>
                          <span>•</span>
                          <span className="whitespace-nowrap">
                            {formatTimeAgo(article.publishedAt)}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>

                        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {article.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-amber-400 transition-colors">
                        <span>Read More</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Relative time formatter helper
function formatTimeAgo(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 60) return `${Math.max(1, diffInMinutes)}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

// Pulse Skeleton Loader
function NewsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-64 sm:h-80 w-full bg-slate-800/50 rounded-2xl border border-slate-700/30" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-60 bg-slate-800/30 rounded-xl border border-slate-700/30" />
        ))}
      </div>
    </div>
  );
}