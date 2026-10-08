import { standings } from '../data'
import Countdown from './Countdown'

export default function NextMatchStandings() {
  return (
    <section className="bg-[#1a1e25] py-10 lg:py-20">
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-white/10">
          <div className="bg-[#ee1e46] px-5 py-4"><h3 className="m-0 text-base font-bold text-white">Next Match</h3></div>
          <div className="p-4 sm:p-5">
            <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
              <div className="w-[39%] text-center">
                <img src="/images/logo_1.png" alt="Football League" className="mx-auto max-w-[88px] sm:max-w-[120px]" />
                <h3 className="text-sm font-bold text-white sm:text-lg">Football League</h3>
              </div>
              <span className="shrink-0 rounded-[30px] bg-[#ee1e46] px-3 py-1 text-[10px] font-bold text-white sm:px-5 sm:py-[5px] sm:text-xs">VS</span>
              <div className="w-[39%] text-center">
                <img src="/images/logo_2.png" alt="Soccer" className="mx-auto max-w-[88px] sm:max-w-[120px]" />
                <h3 className="text-sm font-bold text-white sm:text-lg">Soccer</h3>
              </div>
            </div>
            <div className="mb-4 mt-8 text-center">
              <h4 className="text-base font-bold text-[#ee1e46]">World Cup League</h4>
              <p className="mb-5">
                <span className="block">December 20th, 2020</span>
                <span className="block">9:30 AM GMT+0</span>
                <strong className="text-[#ee1e46]">New Euro Arena</strong>
              </p>
              <Countdown compact />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-white/10">
          <table className="min-w-[560px] w-full border-collapse text-left text-sm text-white/60">
            <thead>
              <tr className="bg-[#ee1e46] text-white">
                {['P', 'Team', 'W', 'D', 'L', 'PTS'].map((head) => <th key={head} className="border-none px-3 py-3 font-normal">{head}</th>)}
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, idx) => <td key={`${row[0]}-${idx}`} className="border-b border-white/10 px-3 py-3 last:border-b-0">{idx === 1 ? <strong className="font-normal text-white">{cell}</strong> : cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
