import SectionTitle from './SectionTitle'

const posts = [
  { image: '/images/img_1.jpg', title: 'Romolu to stay at Real Nadrid?' },
  { image: '/images/img_3.jpg', title: 'Romolu to stay at Real Nadrid?' },
]

export default function BlogSection() {
  return (
    <section className="container-page py-10 lg:py-20">
      <SectionTitle>Our Blog</SectionTitle>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {posts.map((post) => (
          <article key={post.image} className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            <div className="w-full shrink-0 sm:w-[150px]">
              <img src={post.image} alt="" className="rounded-[7px]" />
            </div>
            <div>
              <span className="text-xs font-bold text-white/30">May 20, 2020</span>
              <h3 className="mb-4 mt-2 text-lg font-bold text-white"><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#ee1e46]">{post.title}</a></h3>
              <p className="mb-3 text-white/60">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.</p>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[#ee1e46] hover:text-white">Read more</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
