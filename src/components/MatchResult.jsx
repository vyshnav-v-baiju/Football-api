import { teams } from '../data'

function Team({ team }) {
  return (
    <div className="relative z-20 flex w-1/2 justify-center px-3 py-6 text-center sm:px-5 sm:py-7 lg:px-8 lg:py-8">
      <div className="w-full">
        <img
          src={team.logo}
          alt={team.name}
          className="mx-auto w-[58px] sm:w-[70px] lg:w-[78px]"
        />

        <h3 className="mb-3 mt-3 text-sm font-black text-white sm:mb-4 sm:mt-4 sm:text-base lg:text-[20px]">
          {team.name}{' '}
          <span className="font-light">({team.result})</span>
        </h3>

        <ul className="list-none space-y-0 p-0 text-[11px] leading-5 text-white sm:text-xs sm:leading-6 lg:text-base lg:leading-6">
          {team.players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MatchResult() {
  return (
    <section className="relative z-20 mx-auto -mt-[55px] w-full max-w-[1140px] px-3 sm:-mt-[70px] sm:px-[15px] lg:-mt-[90px]">

      <div className="relative flex min-h-[250px] overflow-hidden rounded-[10px] bg-[#0d0f13] shadow-[0_15px_30px_rgba(0,0,0,0.12)]">

        {/* Red diagonal background */}
        <div
          className="
            absolute inset-0 z-0
            bg-[#ee1e46]
            [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]
            sm:[clip-path:polygon(53%_0,100%_0,100%_100%,47%_100%)]
          "
        />

        {/* Teams */}
        <div className="relative z-10 flex w-full">

          {/* Left */}
          <Team team={teams.laLega} />

          {/* Right */}
          <Team team={teams.juvendu} />

        </div>

        {/* Score */}
        <div className="absolute  left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-2xl font-black tracking-[0.08em] text-white sm:text-3xl lg:left-[48%] lg:text-[3rem] lg:tracking-[0.12em]">
          4 - 1
        </div>

      </div>
    </section>
  )
}