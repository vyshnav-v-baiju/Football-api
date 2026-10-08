import { latestNews } from '../data'
import SectionTitle from './SectionTitle'

export default function LatestNews() {
  
  return (
    <section className="py-16 sm:py-20 lg:py-[100px]">
      <div className="container-page">
        <SectionTitle>Latest News</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-0 lg:grid-cols-3">
          {latestNews.map((item) => (
            <article key={item.title} className="news-card relative overflow-hidden">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img src={item.image} alt="" className="h-auto w-full transition-transform duration-300" />
              </a>
              <div className="news-card-overlay absolute inset-0 z-10">
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-[30px] lg:left-[30px] lg:right-[30px]">
                  <h3 className="mb-3 text-base font-bold text-white">{item.title}</h3>
                  <div className="flex items-center">
                    <div className="mb-2 mr-3 w-10 shrink-0">
                      <img src="/images/person_1.jpg" alt="" className="rounded-full" />
                    </div>
                    <div>
                      <h4 className="m-0 text-sm font-bold leading-none text-white">Mellissa Allison</h4>
                      <span className="text-sm leading-none text-white/50">May 19, 2020 • Sports</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
