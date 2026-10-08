import { useState, useEffect, useMemo } from "react";

// Featured leagues list with ISL as #1 priority
const LEAGUES = [
  { id: 323, name: "Indian Super League", short: "ISL", flag: "🇮🇳", accent: "from-orange-500 to-amber-600" },
  { id: 39, name: "Premier League", short: "PL", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", accent: "from-purple-600 to-indigo-600" },
  { id: 140, name: "La Liga", short: "La Liga", flag: "🇪🇸", accent: "from-red-600 to-yellow-500" },
  { id: 135, name: "Serie A", short: "Serie A", flag: "🇮🇹", accent: "from-blue-600 to-cyan-500" },
  { id: 78, name: "Bundesliga", short: "Bundesliga", flag: "🇩🇪", accent: "from-red-600 to-slate-800" },
];

const SEASONS = [2024, 2023, 2022];

export default function LeagueTable({ defaultLeagueId = 323, defaultSeason = 2024 }) {
  const [selectedLeague, setSelectedLeague] = useState(defaultLeagueId);
  const [season, setSeason] = useState(defaultSeason);
  const [standings, setStandings] = useState([]);
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
        if (!apiKey) {
          throw new Error("API Key missing. Please set VITE_FOOTBALL_API_KEY in your .env file.");
        }

        const response = await fetch(
          `https://v3.football.api-sports.io/standings?league=${selectedLeague}&season=${season}`,
          {
            headers: {
              "x-apisports-key": apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
          const firstError = Object.values(data.errors)[0];
          throw new Error(typeof firstError === "string" ? firstError : "Failed to fetch standings.");
        }

        const leagueData = data.response?.[0]?.league;
        if (leagueData && leagueData.standings?.[0]) {
          setLeagueInfo({
            name: leagueData.name,
            country: leagueData.country,
            logo: leagueData.logo,
            flag: leagueData.flag,
          });
          setStandings(leagueData.standings[0]);
        } else {
          setStandings([]);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedLeague, season]);

  // Filter teams by user search query
  const filteredStandings = useMemo(() => {
    if (!searchQuery.trim()) return standings;
    return standings.filter((item) =>
      item.team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [standings, searchQuery]);

  const activeLeagueObj = LEAGUES.find((l) => l.id === selectedLeague) || LEAGUES[0];

  return (
    <div className="w-full max-w-7xl mx-auto p-3 mt-30 sm:p-6 font-sans text-slate-100">
      {/* Outer Card Container */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Title & Active League Info */}
            <div className="flex items-center gap-3.5">
              {leagueInfo?.logo ? (
                <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/60 shadow-inner">
                  <img src={leagueInfo.logo} alt={leagueInfo.name} className="h-10 w-10 object-contain" />
                </div>
              ) : (
                <span className="text-3xl">{activeLeagueObj.flag}</span>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                    {activeLeagueObj.name}
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {season}/{season + 1}
                  </span>
                </div>
                <p className=" text-slate-400">Official Standings & Performance Breakdown</p>
              </div>
            </div>

            {/* Controls: Search & Season Selector */}
            <div className="flex items-center gap-2.5">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-52">
                <input
                  type="text"
                  placeholder="Search team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition"
                />
                <svg className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>

              {/* Season Select Dropdown */}
              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:border-amber-500/80 transition cursor-pointer"
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-slate-200">
                    {s} Season
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* League Selector Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
            {LEAGUES.map((league) => {
              const isActive = selectedLeague === league.id;
              return (
                <button
                  key={league.id}
                  onClick={() => {
                    setSelectedLeague(league.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? `bg-gradient-to-r ${league.accent} text-white border-transparent shadow-lg shadow-amber-500/10 scale-[1.02]`
                      : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <span className="text-sm">{league.flag}</span>
                  <span>{league.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Body / Loading / Error Handling */}
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="py-16 text-center">
              <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-300">{error}</p>
              <button
                onClick={() => setSelectedLeague(selectedLeague)}
                className="mt-4 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredStandings.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              No standings found for this league or search criteria.
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800/80 select-none">
                <tr>
                  <th className="py-3 px-3 sm:px-4 text-center w-12">#</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Team</th>
                  <th className="py-3 px-2 text-center w-10">P</th>
                  <th className="py-3 px-2 text-center w-10">W</th>
                  <th className="py-3 px-2 text-center w-10">D</th>
                  <th className="py-3 px-2 text-center w-10">L</th>
                  <th className="py-3 px-2 text-center w-12">GD</th>
                  <th className="py-3 px-2 text-center w-12 font-bold text-slate-200">PTS</th>
                  <th className="py-3 px-4 text-center hidden md:table-cell">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredStandings.map((team) => {
                  const rank = team.rank;
                  const isTopFour = rank <= 4;
                  const isISLPlayoff = selectedLeague === 323 && rank <= 6;

                  return (
                    <tr
                      key={team.team.id}
                      className="group hover:bg-slate-800/40 transition-colors duration-150"
                    >
                      {/* Rank Position */}
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                            rank === 1
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : isISLPlayoff || isTopFour
                              ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                              : "text-slate-400"
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Team Crest & Name */}
                      <td className="py-3 px-3 sm:px-4 font-medium text-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={team.team.logo}
                            alt={team.team.name}
                            className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-200"
                            loading="lazy"
                          />
                          <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {team.team.name}
                          </span>
                        </div>
                      </td>

                      {/* Played */}
                      <td className="py-3 px-2 text-center text-slate-300 font-medium">
                        {team.all.played}
                      </td>

                      {/* Won */}
                      <td className="py-3 px-2 text-center text-emerald-400 font-medium">
                        {team.all.win}
                      </td>

                      {/* Drawn */}
                      <td className="py-3 px-2 text-center text-slate-400 font-medium">
                        {team.all.draw}
                      </td>

                      {/* Lost */}
                      <td className="py-3 px-2 text-center text-rose-400 font-medium">
                        {team.all.lose}
                      </td>

                      {/* Goal Difference */}
                      <td className="py-3 px-2 text-center font-semibold">
                        <span
                          className={
                            team.goalsDiff > 0
                              ? "text-emerald-400"
                              : team.goalsDiff < 0
                              ? "text-rose-400"
                              : "text-slate-400"
                          }
                        >
                          {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 rounded-md">
                          {team.points}
                        </span>
                      </td>

                      {/* Recent Form (W/D/L) */}
                      <td className="py-3 px-4 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          {team.form ? (
                            team.form.split("").slice(-5).map((res, idx) => (
                              <FormBadge key={idx} result={res} />
                            ))
                          ) : (
                            <span className="text-slate-600 text-xs">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer / Qualification Legend */}
        <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>1st Place / Champion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span>{selectedLeague === 323 ? "ISL Playoff Spots" : "Champions League / Top Spot"}</span>
            </div>
          </div>
          <p className="text-slate-500 font-mono">Data powered by API-Sports</p>
        </div>

      </div>
    </div>
  );
}

// Form Badge Component (W / D / L)
function FormBadge({ result }) {
  const styles = {
    W: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    D: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    L: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <span
      className={`w-5 h-5 inline-flex items-center justify-center rounded text-[10px] font-bold border ${
        styles[result] || "bg-slate-800 text-slate-400 border-slate-700"
      }`}
    >
      {result}
    </span>
  );
}

// Skeleton Loader Component
function TableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-800/60">
          <div className="w-6 h-6 bg-slate-800 rounded" />
          <div className="flex-1 flex items-center gap-3">
            <div className="w-6 h-6 bg-slate-800 rounded-full" />
            <div className="w-32 h-4 bg-slate-800 rounded" />
          </div>
          <div className="w-12 h-4 bg-slate-800 rounded" />
          <div className="w-12 h-4 bg-slate-800 rounded" />
          <div className="w-12 h-4 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
}