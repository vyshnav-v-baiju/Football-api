export default function SectionPage({ title }) {
  return (
    <main className="min-h-[100svh] bg-[#222831] pt-[88px] sm:pt-24">
      <section className="container-page flex min-h-[calc(100svh-88px)] items-center justify-center py-20">
        <h1 className="m-0 text-center text-[2rem] font-bold leading-tight text-white sm:text-[2.75rem] lg:text-[4rem]">
          {title}
        </h1>
      </section>
    </main>
  )
}
