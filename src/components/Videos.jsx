import { useRef } from 'react'
import { videos } from '../data'
import SectionTitle from './SectionTitle'

export default function Videos() {
  const sliderRef = useRef(null)

  const move = (direction) => {
    sliderRef.current?.scrollBy({ left: direction * sliderRef.current.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="py-10 lg:py-20">
      <div className="container-page">
        <SectionTitle
          right={
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} className="relative h-10 w-10 rounded-[5px] bg-white/10 text-2xl text-white transition hover:bg-[#ee1e46]" aria-label="Previous video">
                <span className="icon-keyboard_arrow_left absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </button>
              <button type="button" onClick={() => move(1)} className="relative h-10 w-10 rounded-[5px] bg-white/10 text-2xl text-white transition hover:bg-[#ee1e46]" aria-label="Next video">
                <span className="icon-keyboard_arrow_right absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </button>
            </div>
          }
        >Videos</SectionTitle>

        <div ref={sliderRef} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
          {videos.map((item, index) => (
            <article key={`${item.title}-${index}`} className="video-media relative w-[86%] shrink-0 snap-start overflow-hidden sm:w-1/2 lg:w-1/4">
              <img src={item.image} alt="" className="h-auto w-full" />
              <a href="https://vimeo.com/139714818" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 z-20 flex w-[calc(100%-32px)] items-center text-lg font-bold text-white sm:bottom-5 sm:left-5 sm:w-[calc(100%-40px)] sm:text-xl">
                <span className="video-play-ring relative mr-4 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#ee1e46] text-white sm:mr-6 sm:h-[50px] sm:w-[50px]">
                  <span className="icon-play text-lg" />
                </span>
                <span className="leading-tight text-base font-bold sm:text-lg">{item.title}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
