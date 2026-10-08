import { useState, useEffect, useMemo } from "react";

const LEAGUES = [
  { id: 323, name: "Indian Super League", short: "ISL", flag: "🇮🇳", accent: "from-orange-500 to-amber-600" },
  { id: 39, name: "Premier League", short: "PL", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", accent: "from-purple-600 to-indigo-600" },
  { id: 140, name: "La Liga", short: "La Liga", flag: "🇪🇸", accent: "from-red-600 to-yellow-500" },
  { id: 135, name: "Serie A", short: "Serie A", flag: "🇮🇹", accent: "from-blue-600 to-cyan-500" },
  { id: 78, name: "Bundesliga", short: "Bundesliga", flag: "🇩🇪", accent: "from-red-600 to-slate-800" },
];

const SEASONS = [2024, 2023, 2022];

const STAT_TYPES = [
  { id: "topscorers", label: "Top Scorers", icon: "⚽" },
  { id: "topassists", label: "Top Assists", icon: "👟" },
  { id: "topyellowcards", label: "Most Cards", icon: "🟨" },
];

export default function PlayerStats({ defaultLeagueId = 323, defaultSeason = 2024 }) {
  const [selectedLeague, setSelectedLeague] = useState(defaultLeagueId);
  const [season, setSeason] = useState(defaultSeason);
  const [statType, setStatType] = useState("topscorers");
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlayerStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
        if (!apiKey) {
          throw new Error("API Key missing. Please set VITE_FOOTBALL_API_KEY in your .env file.");
        }

        const response = await fetch(
          `https://v3.football.api-sports.io/players/${statType}?league=${selectedLeague}&season=${season}`,
          {
            headers: {
              "x-apisports-key": apiKey,
            },
          }
        );

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
          const firstError = Object.values(data.errors)[0];
          throw new Error(typeof firstError === "string" ? firstError : "Failed to fetch player stats.");
        }

        setPlayersData(data.response || []);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [selectedLeague, season, statType]);

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return playersData;
    return playersData.filter((item) =>
      item.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.statistics[0]?.team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playersData, searchQuery]);

  const activeLeagueObj = LEAGUES.find((l) => l.id === selectedLeague) || LEAGUES[0];

  return (
    <div className="w-full max-w-7xl mt-30 mx-auto p-3 sm:p-6 font-sans text-slate-100">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeLeagueObj.flag}</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  Player Leaderboard
                </h2>
                <p className="text-xs text-slate-400">Individual Stats & Profiles</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-48">
                <input
                  type="text"
                  placeholder="Search player or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-800/60 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/80 transition"
                />
                <svg className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>

             

              {/* Season Dropdown */}
              <select
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
                className="bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none transition cursor-pointer"
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-slate-200">
                    {s}-{String(s + 1).slice(-2)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* League Selector */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
            {LEAGUES.map((league) => (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  selectedLeague === league.id
                    ? `bg-gradient-to-r ${league.accent} text-white border-transparent shadow-lg scale-[1.02]`
                    : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <span>{league.short}</span>
              </button>
            ))}
             {/* Stat Type Toggle */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                {STAT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setStatType(type.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      statType === type.id
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span className="hidden sm:inline">{type.label}</span>
                  </button>
                ))}
              </div>
          </div>

          
        </div>

        {/* Player List */}
        <div className="p-3 sm:p-5">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-sm text-red-400 bg-red-500/10 inline-block px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No player stats found for this selection.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPlayers.map(({ player, statistics }, index) => {
                const stats = statistics[0] || {};
                const goals = stats.goals?.total || 0;
                const assists = stats.goals?.assists || 0;
                const yellowCards = stats.cards?.yellow || 0;
                const appearances = stats.games?.appearences || 0;

                return (
                  <div
                    key={player.id}
                    onClick={() => setSelectedPlayer({ player, stats })}
                    className="flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/70 transition-all duration-200 rounded-xl border border-slate-700/50 cursor-pointer group hover:border-slate-600"
                  >
                    {/* Rank & Photo & Basic Info */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 text-center text-xs font-black ${
                          index === 0
                            ? "text-amber-400 text-sm"
                            : index === 1
                            ? "text-slate-300"
                            : index === 2
                            ? "text-amber-600"
                            : "text-slate-500"
                        }`}
                      >
                        #{index + 1}
                      </span>

                      <div className="relative">
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="h-11 w-11 rounded-full object-cover bg-slate-800 border border-slate-700 group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        {stats.team?.logo && (
                          <img
                            src={stats.team.logo}
                            alt={stats.team.name}
                            className="h-4 w-4 absolute -bottom-0.5 -right-0.5 object-contain bg-slate-900 rounded-full p-0.5 border border-slate-700"
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                          {player.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span>{stats.team?.name || "Unknown Team"}</span>
                          <span>•</span>
                          <span className="text-slate-500">{stats.games?.position || "N/A"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Metric Display Badge */}
                    <div className="text-right">
                      {statType === "topscorers" && (
                        <div>
                          <span className="text-lg font-black text-amber-400">{goals}</span>
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Goals</span>
                        </div>
                      )}
                      {statType === "topassists" && (
                        <div>
                          <span className="text-lg font-black text-sky-400">{assists}</span>
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Assists</span>
                        </div>
                      )}
                      {statType === "topyellowcards" && (
                        <div>
                          <span className="text-lg font-black text-yellow-400">{yellowCards}</span>
                          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Yellow Cards</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Player Details Modal */}
      {selectedPlayer && (
        <PlayerModal data={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  );
}

// Detailed Player Profile Modal
function PlayerModal({ data, onClose }) {
  const { player, stats } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Player Header */}
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <img
            src={player.photo}
            alt={player.name}
            className="w-16 h-16 rounded-2xl object-cover bg-slate-800 border border-slate-700 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white">{player.name}</h3>
            </div>
            <p className="text-xs font-semibold text-amber-400">{stats.team?.name}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {player.nationality} • {player.age} yrs • {stats.games?.position || "Player"}
            </p>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <StatBox label="Matches" value={stats.games?.appearences ?? 0} />
          <StatBox label="Minutes" value={stats.games?.minutes ?? 0} />
          <StatBox label="Rating" value={stats.games?.rating ? parseFloat(stats.games.rating).toFixed(1) : "N/A"} highlight />
          <StatBox label="Goals" value={stats.goals?.total ?? 0} color="text-amber-400" />
          <StatBox label="Assists" value={stats.goals?.assists ?? 0} color="text-sky-400" />
          <StatBox label="Passes" value={stats.passes?.total ?? "N/A"} />
          <StatBox label="Yellow Cards" value={stats.cards?.yellow ?? 0} color="text-yellow-400" />
          <StatBox label="Red Cards" value={stats.cards?.red ?? 0} color="text-rose-400" />
          <StatBox label="Shots (On Target)" value={`${stats.shots?.on ?? 0}/${stats.shots?.total ?? 0}`} />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition border border-slate-700"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value, color = "text-slate-100", highlight = false }) {
  return (
    <div className={`p-2.5 rounded-xl border text-center ${highlight ? "bg-amber-500/10 border-amber-500/20" : "bg-slate-800/40 border-slate-800"}`}>
      <span className={`text-sm font-black block ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{label}</span>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-800/40 rounded-xl border border-slate-800" />
      ))}
    </div>
  );
}