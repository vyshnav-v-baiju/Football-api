// import Hero from '../components/Hero'
// import MatchResult from '../components/MatchResult'
// import LatestNews from '../components/LatestNews'
// import NextMatchStandings from '../components/NextMatchStandings'
// import Videos from '../components/Videos'
// import BlogSection from '../components/BlogSection'

// export default function Home() {
//   return (
//     <main>
//       <Hero />
//       <MatchResult />
//       <LatestNews />
//       <NextMatchStandings />
//       <Videos />
//       <BlogSection />
//     </main>
//   )
// }



import { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'

/* Theme: white · red #ee1e46 · navy #141f32 */
const RED = '#ee1e46'
const NAVY = '#141f32'

/* ------------------------------------------------------------------
   MOTION
   One gentle reveal (fade + small rise) used on section content,
   plus one soft fade when board information changes.
   Everything switches off for people who prefer reduced motion.
------------------------------------------------------------------- */
const MOTION_CSS = `
@keyframes softFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.soft-fade { animation: softFade 450ms ease-out both; }
@media (prefers-reduced-motion: reduce) { .soft-fade { animation: none; } }
`

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* Small label for content that is only an example */
function SampleTag({ dark = false }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
        dark ? 'border-white/25 text-white/60' : 'border-gray-300 text-gray-500'
      }`}
    >
      Sample content
    </span>
  )
}

/* ------------------------------------------------------------------
   POSITIONS
------------------------------------------------------------------- */
const ROLES = {
  GK: { name: 'Goalkeeper', job: 'The last line of defence and the first pass of every attack. Stops shots, commands the box and starts moves from the back.', skill: 'Reflexes and distribution' },
  CB: { name: 'Centre-back', job: 'Wins headers, blocks shots and keeps the defensive line organised. Often the calmest passer on the team.', skill: 'Reading the game' },
  FB: { name: 'Full-back', job: 'Defends the flank, then runs forward to overlap the winger and deliver crosses.', skill: 'Stamina and crossing' },
  WB: { name: 'Wing-back', job: 'Covers the whole side of the pitch. Part defender, part winger, and the main source of width.', skill: 'Endurance and pace' },
  DM: { name: 'Defensive midfielder', job: 'Sits in front of the defence, breaks up attacks and links defence to midfield.', skill: 'Positioning and tackling' },
  CM: { name: 'Central midfielder', job: 'The engine room. Wins the ball, keeps possession and supports both attack and defence.', skill: 'Passing and work rate' },
  WM: { name: 'Wide midfielder', job: 'Stays wide in attack, then tucks in to help the midfield when the team loses the ball.', skill: 'Crossing and tracking back' },
  AM: { name: 'Attacking midfielder', job: 'Plays between the lines, finds space behind the midfield and creates chances for the striker.', skill: 'Vision and final pass' },
  W: { name: 'Winger', job: 'Stretches the defence, beats players one-on-one and creates chances from wide areas.', skill: 'Dribbling and speed' },
  ST: { name: 'Striker', job: 'Leads the line. Scores goals, holds the ball up and gives the defence someone to worry about.', skill: 'Finishing and movement' },
}

/* p(shirt number, role, x, y) on a 105 × 68 pitch, own goal on the left */
const p = (n, role, x, y) => ({ n, role, x, y })

const FORMATIONS = {
  '4-3-3': {
    note: 'Width in attack, one holding midfielder and a front three that presses together.',
    players: [
      p(1, 'GK', 8, 34),
      p(3, 'FB', 26, 10), p(5, 'CB', 26, 25), p(4, 'CB', 26, 43), p(2, 'FB', 26, 58),
      p(6, 'DM', 48, 34), p(8, 'CM', 58, 17), p(10, 'CM', 58, 51),
      p(11, 'W', 82, 12), p(9, 'ST', 88, 34), p(7, 'W', 82, 56),
    ],
  },
  '4-4-2': {
    note: 'Two banks of four and two strikers. Simple, compact and hard to break down.',
    players: [
      p(1, 'GK', 8, 34),
      p(3, 'FB', 26, 10), p(5, 'CB', 26, 25), p(4, 'CB', 26, 43), p(2, 'FB', 26, 58),
      p(11, 'WM', 54, 9), p(6, 'CM', 52, 25), p(8, 'CM', 52, 43), p(7, 'WM', 54, 59),
      p(10, 'ST', 82, 24), p(9, 'ST', 82, 44),
    ],
  },
  '3-5-2': {
    note: 'Wing-backs provide the width, three centre-backs give cover and the midfield outnumbers the opposition.',
    players: [
      p(1, 'GK', 8, 34),
      p(5, 'CB', 25, 16), p(4, 'CB', 23, 34), p(3, 'CB', 25, 52),
      p(11, 'WB', 48, 6), p(8, 'CM', 46, 22), p(6, 'DM', 44, 34), p(10, 'CM', 46, 46), p(7, 'WB', 48, 62),
      p(9, 'ST', 82, 24), p(20, 'ST', 82, 44),
    ],
  },
  '4-2-3-1': {
    note: 'A double pivot protects the defence while three attacking players support a lone striker.',
    players: [
      p(1, 'GK', 8, 34),
      p(3, 'FB', 26, 10), p(5, 'CB', 26, 25), p(4, 'CB', 26, 43), p(2, 'FB', 26, 58),
      p(6, 'DM', 44, 24), p(8, 'DM', 44, 44),
      p(11, 'W', 66, 11), p(10, 'AM', 64, 34), p(7, 'W', 66, 57),
      p(9, 'ST', 88, 34),
    ],
  },
}

const PHASES = {
  attack: { label: 'With the ball', note: 'The team pushes up and spreads wide to stretch the defence.' },
  defend: { label: 'Without the ball', note: 'The team drops into a compact block and closes the middle of the pitch.' },
}

function place(player, phase) {
  if (player.role === 'GK') return [player.x, player.y]
  if (phase === 'attack') {
    const x = Math.min(player.x + (player.x < 40 ? 10 : 8), 96)
    const y = Math.max(5, Math.min(63, 34 + (player.y - 34) * 1.05))
    return [x, y]
  }
  return [8 + (player.x - 8) * 0.7, 34 + (player.y - 34) * 0.85]
}

const strikerIndex = (f) => FORMATIONS[f].players.findIndex((pl) => pl.role === 'ST')

const BTN =
  'rounded-full border px-5 py-2.5 text-sm font-black transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141f32]'

/* ------------------------------------------------------------------
   SECTION 2: INTRO (general football, not tournament-specific)
------------------------------------------------------------------- */
const LEVELS = [
  { title: 'Club football', text: 'Leagues, cups and local rivalries that shape the week for millions of fans.' },
  { title: 'International football', text: 'Nations, qualifiers and tournaments, where a whole country watches the same match.' },
  { title: 'The men’s and women’s game', text: 'Two sets of stories, one sport. Both belong here.' },
  { title: 'Grassroots', text: 'Park pitches, school teams and the place where every player begins.' },
]

// function Intro() {
//   return (
//     <section className="bg-white py-20 sm:py-24 lg:py-28">
//       <div className="container-page">
//         <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
//           <Reveal>
//             <h2 className="max-w-lg text-3xl font-black leading-tight text-[#141f32] sm:text-4xl lg:text-5xl">
//               One game, played everywhere.
//             </h2>
//             <p className="mt-6 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
//               Whether you follow a local club or a national team, football is easier to enjoy when you
//               understand how it works. Start with the shapes teams play in, then follow the matches and players.
//             </p>
//             <a
//               href="#shape"
//               className="mt-8 inline-block border-b-2 border-[#ee1e46] pb-1 text-sm font-black text-[#141f32] transition-colors duration-300 hover:text-[#ee1e46] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee1e46] focus-visible:ring-offset-2"
//             >
//               Try the tactics board
//             </a>
//           </Reveal>

//           <ul className="divide-y divide-gray-200 border-y border-gray-200">
//             {LEVELS.map((l, i) => (
//               <li key={l.title}>
//                 <Reveal delay={i * 90} className="group py-6">
//                   <div className="flex items-start gap-5">
//                     <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ee1e46] transition-transform duration-300 group-hover:scale-150" />
//                     <div>
//                       <h3 className="text-lg font-black text-[#141f32]">{l.title}</h3>
//                       <p className="mt-1 max-w-md text-sm leading-6 text-gray-500">{l.text}</p>
//                     </div>
//                   </div>
//                 </Reveal>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   )
// }
/* ------------------------------------------------------------------
   SECTION 2: FOOTBALL INTRO
------------------------------------------------------------------- */
// const FOOTBALL_FEATURES = [
//   {
//     number: '01',
//     title: 'The Match',
//     text: 'Ninety minutes where tactics, decisions and individual moments can change everything.',
//   },
//   {
//     number: '02',
//     title: 'The Players',
//     text: 'Every position has a purpose. From the goalkeeper to the striker, every role matters.',
//   },
//   {
//     number: '03',
//     title: 'The Culture',
//     text: 'Clubs, countries, rivalries and supporters turn football into something bigger than the game.',
//   },
// ]

// function Intro() {
//   return (
//     <section className="relative overflow-hidden bg-[#f3f5f8] py-20 sm:py-24 lg:py-28">
//       {/* Decorative football-circle */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border-[70px] border-[#141f32]/[0.035]"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-20 bottom-[-100px] h-64 w-64 rounded-full border-[35px] border-[#ee1e46]/10"
//       />

//       <div className="container-page relative">

//         {/* TOP CONTENT */}
//         <Reveal>
//           <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]">

//             <div>
//               <div className="mb-5 flex items-center gap-3">
//                 <span className="h-[3px] w-12 bg-[#ee1e46]" />
//                 <span className="text-[10px] font-black uppercase tracking-[3px] text-[#ee1e46]">
//                   The beautiful game
//                 </span>
//               </div>

//               <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-1.5px] text-[#141f32] sm:text-5xl lg:text-6xl">
//                 Football is more than
//                 <span className="text-[#ee1e46]"> 90 minutes.</span>
//               </h2>
//             </div>

//             <p className="max-w-md text-sm leading-7 text-gray-500 lg:pb-1 lg:text-base">
//               It is about the way a team moves, the player who finds the
//               winning pass, the noise from the stands and the stories that
//               stay with you long after the final whistle.
//             </p>

//           </div>
//         </Reveal>

//         {/* FEATURE CARDS */}
//         <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16">
//           {FOOTBALL_FEATURES.map((feature, index) => (
//             <Reveal key={feature.number} delay={index * 100}>
//               <div className="group relative h-full overflow-hidden rounded-xl bg-white p-7 shadow-[0_10px_35px_rgba(20,31,50,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,31,50,0.1)] sm:p-8">

//                 {/* Number */}
//                 <div className="flex items-start justify-between">
//                   <span className="text-sm font-black text-[#ee1e46]">
//                     {feature.number}
//                   </span>

//                   <span className="h-2 w-2 rounded-full bg-[#ee1e46] transition-transform duration-500 group-hover:scale-[2]" />
//                 </div>

//                 <div className="mt-12">
//                   <h3 className="text-2xl font-black text-[#141f32]">
//                     {feature.title}
//                   </h3>

//                   <p className="mt-4 text-sm leading-7 text-gray-500">
//                     {feature.text}
//                   </p>
//                 </div>

//                 {/* Bottom accent */}
//                 <div className="mt-8 h-[2px] w-10 bg-[#ee1e46] transition-all duration-500 group-hover:w-full" />
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         {/* BOTTOM STATEMENT */}
//         <Reveal delay={300}>
//           <div className="mt-10 flex flex-col justify-between gap-5 border-t border-[#141f32]/10 pt-6 sm:flex-row sm:items-center">
//             <p className="text-xs font-bold uppercase tracking-[2px] text-[#141f32]/40">
//               Understand the game. Follow the story.
//             </p>

//             <a
//               href="#shape"
//               className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[1.5px] text-[#141f32] transition-colors duration-300 hover:text-[#ee1e46]"
//             >
//               <span>Explore football tactics</span>

//               <span className="h-px w-8 bg-[#ee1e46] transition-all duration-300 group-hover:w-14" />
//             </a>
//           </div>
//         </Reveal>

//       </div>
//     </section>
//   )
// }
/* Drop-in replacement for FOOTBALL_FEATURES + Intro in Home.jsx
   (uses the same Reveal component that is already in that file) */

const FOOTBALL_FEATURES = [
  {
    number: '01',
    title: 'The Match',
    text: 'Ninety minutes where tactics, decisions and individual moments can change everything.',
  },
  {
    number: '02',
    title: 'The Players',
    text: 'Every position has a purpose. From the goalkeeper to the striker, every role matters.',
  },
  {
    number: '03',
    title: 'The Culture',
    text: 'Clubs, countries, rivalries and supporters turn football into something bigger than the game.',
  },
]

function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#f3f5f8] py-20 sm:py-24 lg:py-28">
      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border-[70px] border-[#141f32]/[0.035]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-[-100px] h-64 w-64 rounded-full border-[35px] border-[#ee1e46]/10"
      />

      <div className="container-page relative">
        {/* TOP CONTENT */}
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[3px] w-12 bg-[#ee1e46]" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-[#ee1e46]">
                  The beautiful game
                </span>
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-1.5px] text-[#141f32] sm:text-5xl lg:text-6xl">
                Football is more than
                <span className="text-[#ee1e46]"> 90 minutes.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-500 lg:pb-1 lg:text-base">
              It is about the way a team moves, the player who finds the winning pass, the noise from
              the stands and the stories that stay with you long after the final whistle.
            </p>
          </div>
        </Reveal>

        {/* FEATURE CARDS */}
        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
          {FOOTBALL_FEATURES.map((feature, index) => (
            <Reveal key={feature.number} delay={index * 100} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-xl bg-white p-7 shadow-[0_10px_35px_rgba(20,31,50,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,31,50,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                {/* Soft red wash that rises on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#ee1e46]/[0.06] to-transparent transition-all duration-700 group-hover:h-full motion-reduce:transition-none"
                />

                <div className="relative">
                  {/* NUMBER: outlined numeral that fills red on hover, with a line running to a dot */}
                  <div className="flex items-center gap-5" aria-hidden="true">
                    <span className="inline-block text-7xl font-black leading-none tracking-[-3px] text-transparent transition-all duration-500 [-webkit-text-stroke:1.5px_#ee1e46] group-hover:-translate-y-1 group-hover:text-[#ee1e46] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:text-8xl">
                      {feature.number}
                    </span>

                    <span className="relative h-px flex-1 bg-[#141f32]/10">
                      <span className="absolute inset-y-0 left-0 w-0 bg-[#ee1e46] transition-all duration-700 group-hover:w-full motion-reduce:transition-none" />
                    </span>

                    <span className="h-2.5 w-2.5 rounded-full bg-[#ee1e46] transition-transform duration-500 group-hover:scale-[1.8] motion-reduce:transition-none" />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-black text-[#141f32]">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-gray-500">{feature.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM STATEMENT */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col justify-between gap-5 border-t border-[#141f32]/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs font-bold uppercase tracking-[2px] text-[#141f32]/40">
              Understand the game. Follow the story.
            </p>

            <a
              href="#shape"
              className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[1.5px] text-[#141f32] transition-colors duration-300 hover:text-[#ee1e46] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee1e46] focus-visible:ring-offset-2"
            >
              <span>Explore football tactics</span>
              <span className="h-px w-8 bg-[#ee1e46] transition-all duration-300 group-hover:w-14" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   SECTION 3: TACTICS BOARD
------------------------------------------------------------------- */
function TacticsBoard() {
  const [formation, setFormation] = useState('4-3-3')
  const [phase, setPhase] = useState('attack')
  const [selected, setSelected] = useState(strikerIndex('4-3-3'))

  const current = FORMATIONS[formation]
  const chosen = current.players[selected]
  const role = ROLES[chosen.role]

  const chooseFormation = (f) => {
    setFormation(f)
    setSelected(strikerIndex(f))
  }

  const count = (roles) => current.players.filter((pl) => roles.includes(pl.role)).length
  const def = count(['CB', 'FB'])
  const mid = count(['DM', 'CM', 'WM', 'WB', 'AM'])
  const fwd = count(['W', 'ST'])

  return (
    <section
      id="shape"
      style={{ backgroundColor: NAVY }}
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[56px] border-[#ee1e46]/10" />

      <div className="container-page relative">
        <Reveal className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Learn the game, shape by shape.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              Choose a formation, switch between attacking and defending, then select any player to see
              what their position does.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a formation">
              {Object.keys(FORMATIONS).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => chooseFormation(f)}
                  aria-pressed={f === formation}
                  className={`${BTN} ${
                    f === formation
                      ? 'border-[#ee1e46] bg-[#ee1e46] text-white'
                      : 'border-white/20 text-white/70 hover:border-white hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex w-fit rounded-full border border-white/20 p-1" role="group" aria-label="Choose a phase of play">
              {Object.entries(PHASES).map(([key, ph]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPhase(key)}
                  aria-pressed={key === phase}
                  className={`rounded-full px-5 py-2 text-xs font-black transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    key === phase ? 'bg-white text-[#141f32]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {ph.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
            {/* PITCH */}
            <div>
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/40">
                <svg
                  viewBox="0 0 105 68"
                  className="block h-auto w-full"
                  role="group"
                  aria-label={`Pitch showing a ${formation} formation, ${PHASES[phase].label.toLowerCase()}`}
                >
                  <rect width="105" height="68" fill="#1a7a4c" />
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <rect key={i} x={i * 15} width="7.5" height="68" fill="#000" opacity="0.05" />
                  ))}
                  <g fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.35">
                    <rect x="2" y="2" width="101" height="64" />
                    <line x1="52.5" y1="2" x2="52.5" y2="66" />
                    <circle cx="52.5" cy="34" r="8" />
                    <rect x="2" y="14" width="16" height="40" />
                    <rect x="2" y="24" width="5.5" height="20" />
                    <rect x="87" y="14" width="16" height="40" />
                    <rect x="97.5" y="24" width="5.5" height="20" />
                  </g>
                  <circle cx="52.5" cy="34" r="0.6" fill="#fff" />

                  {/* direction of play */}
                  <g stroke="#fff" strokeOpacity="0.5" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M42 64 H58 M55.5 62.5 L58 64 L55.5 65.5" />
                  </g>
                  <text x="60.5" y="64" dominantBaseline="central" fontSize="2.2" fill="#fff" fillOpacity="0.6">
                    Direction of play
                  </text>

                  {current.players.map((pl, i) => {
                    const [x, y] = place(pl, phase)
                    const isSel = i === selected
                    const keeper = pl.role === 'GK'
                    return (
                      <g
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`${ROLES[pl.role].name}, shirt ${pl.n}`}
                        aria-pressed={isSel}
                        onClick={() => setSelected(i)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelected(i)
                          }
                        }}
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          transition: 'transform 900ms cubic-bezier(.3,.7,.2,1)',
                          cursor: 'pointer',
                        }}
                        className="outline-none motion-reduce:!transition-none"
                      >
                        {isSel && <circle r="5.2" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="1.2 0.9" />}
                        <circle r="3.3" fill={keeper ? '#fff' : RED} stroke="#fff" strokeWidth={isSel ? 0.9 : 0.5} />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="3.1"
                          fontWeight="800"
                          fill={keeper ? NAVY : '#fff'}
                          style={{ pointerEvents: 'none' }}
                        >
                          {pl.n}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
                <p key={phase} className="soft-fade">{PHASES[phase].note}</p>
                <p className="font-bold text-white">
                  {def} defenders · {mid} midfielders · {fwd} forwards
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-white bg-white" />Goalkeeper</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-white bg-[#ee1e46]" />Outfield player</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-dashed border-white" />Selected</span>
              </div>
            </div>

            {/* INFO PANEL */}
            <aside className="flex flex-col rounded-xl bg-white p-7 sm:p-8" aria-live="polite">
              <div key={`${formation}-${selected}`} className="soft-fade">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-500">Selected player</p>
                    <h3 className="mt-1 text-2xl font-black text-[#141f32]">{role.name}</h3>
                  </div>
                  <span className="text-6xl font-black leading-none text-[#ee1e46]">{chosen.n}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-600">{role.job}</p>

                <div className="mt-6 border-t border-gray-200 pt-5">
                  <p className="text-sm font-bold text-gray-500">Key strengths</p>
                  <p className="mt-1 text-base font-black text-[#141f32]">{role.skill}</p>
                </div>

                <div className="mt-6 rounded-lg bg-[#f3f5f8] p-4">
                  <p className="text-sm font-bold text-[#141f32]">About the {formation}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{current.note}</p>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  to="/players"
                  className="inline-flex rounded-full bg-[#ee1e46] px-6 py-3 text-xs font-black text-white transition-colors duration-300 hover:bg-[#141f32] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee1e46] focus-visible:ring-offset-2"
                >
                  Meet the players
                </Link>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   SECTION 4: EXPLORE (one tile per header link)
------------------------------------------------------------------- */
const TILE =
  'group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee1e46] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8'

function Explore() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal className="mb-10 max-w-xl">
          <h2 className="text-3xl font-black leading-tight text-[#141f32] sm:text-4xl">
            Now follow the game.
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            Once you know the shapes, keep up with the matches, meet the players and read the stories behind them.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* MATCHES */}
          <Reveal className="lg:col-span-7">
            <Link to="/matches" className={`${TILE} h-full bg-[#141f32] text-white`}>
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[30px] border-[#ee1e46]/30 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none" />
              <div className="relative flex items-center justify-between">
                <h3 className="text-sm font-bold text-white/60">Matches</h3>
                <SampleTag dark />
              </div>
              <div className="relative">
                <p className="text-sm font-bold text-[#ee1e46]">Saturday · 15:00</p>
                <p className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
                  Riverside FC <span className="font-medium text-white/40">v</span> Harbour United
                </p>
                <p className="mt-3 text-sm text-white/60">Fixtures, results and match details in one place.</p>
              </div>
            </Link>
          </Reveal>

          {/* PLAYERS */}
          <Reveal delay={100} className="lg:col-span-5">
            <Link to="/players" className={`${TILE} h-full bg-[#ee1e46] text-white`}>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-4 select-none text-[11rem] font-black leading-none text-white/15"
              >
                10
              </span>
              <h3 className="relative text-sm font-bold text-white/80">Players</h3>
              <div className="relative">
                <p className="text-2xl font-black leading-tight sm:text-3xl">The people who make the game.</p>
                <p className="mt-3 text-sm text-white/80">Profiles, positions and the numbers they wear.</p>
              </div>
            </Link>
          </Reveal>

          {/* BLOG */}
          <Reveal className="lg:col-span-4">
            <Link to="/blog" className={`${TILE} h-full border border-gray-200 bg-white text-[#141f32] hover:border-[#ee1e46]`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-500">Blog</h3>
                <SampleTag />
              </div>
              <div>
                <span className="mb-4 block h-1 w-10 bg-[#ee1e46] transition-all duration-500 group-hover:w-20" />
                <p className="text-xl font-black leading-snug">Why the high press is changing how teams defend.</p>
                <p className="mt-3 text-sm text-gray-500">Tactics, history and match day culture.</p>
              </div>
            </Link>
          </Reveal>

          {/* NEWS */}
          <Reveal delay={100} className="lg:col-span-4">
            <Link to="/news" className={`${TILE} h-full bg-[#f3f5f8] text-[#141f32]`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-500">News</h3>
                <SampleTag />
              </div>
              <ul className="divide-y divide-gray-300/70">
                {['Transfer window: the deals to watch', 'Cup draw sets up a derby clash', 'Young talents break into first teams'].map((t) => (
                  <li key={t} className="py-3 text-sm font-black leading-snug transition-colors duration-300 group-hover:text-[#ee1e46]">
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>

          {/* CONTACT */}
          <Reveal delay={200} className="lg:col-span-4">
            <Link to="/contact" className={`${TILE} h-full bg-[#141f32] text-white`}>
              <h3 className="text-sm font-bold text-white/60">Contact</h3>
              <div>
                <p className="text-xl font-black leading-snug">Got a question or a story to share?</p>
                <span className="mt-5 inline-block border-b-2 border-[#ee1e46] pb-1 text-sm font-black transition-colors duration-300 group-hover:text-[#ee1e46]">
                  Get in touch
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */
export default function Home() {
  return (
    <main className="bg-white">
      <style>{MOTION_CSS}</style>

      <Hero />
      <Intro />
      <TacticsBoard />
      <Explore />

      {/* CLOSING BAND */}
      <section className="relative overflow-hidden bg-[#ee1e46] py-16 sm:py-20">
        <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border-[44px] border-white/10" />
        <Reveal className="container-page relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
            Every league. Every nation. One game.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/matches"
              className="rounded-full bg-white px-7 py-3.5 text-xs font-black text-[#141f32] transition-colors duration-300 hover:bg-[#141f32] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#ee1e46]"
            >
              See the matches
            </Link>
            <Link
              to="/news"
              className="rounded-full border border-white/60 px-7 py-3.5 text-xs font-black text-white transition-colors duration-300 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Read the news
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      
    </main>
  )
}
