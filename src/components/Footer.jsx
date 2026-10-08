import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id='footer' className="bg-[#141f32] text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-block text-2xl font-black tracking-[-1px]">
              FOOT<span className="text-[#ee1e46]">BALL</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Your place for football stories, insights and everything that makes the beautiful game special.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/50">
              {[
                ['Home', '/'],
                ['Matches', '/matches'],
                ['Players', '/players'],
                ['Blog', '/blog'],
                ['News', '/news'],
                ['Contact', '/contact'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors duration-300 hover:text-[#ee1e46]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black">Information</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/50">
              {['Privacy policy', 'Terms and conditions', 'About us'].map((label) => (
                <li key={label}>
                  <a href="#" className="transition-colors duration-300 hover:text-[#ee1e46]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black">Questions or ideas?</h3>
            <p className="mt-5 text-sm leading-6 text-white/50">
              We would like to hear from you, whatever level of football you follow.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-[#ee1e46] px-6 py-3 text-xs font-black text-white transition-colors duration-300 hover:bg-white hover:text-[#141f32]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-center text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Football. All rights reserved.</p>
          <p>Made for the love of the game</p>
        </div>
      </div>
    </footer>
  )
}
