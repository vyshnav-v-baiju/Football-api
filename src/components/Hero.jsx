import { useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from './Countdown'
import LoadingScreen from './LoadingScreen'
import { ArrowRight } from 'lucide-react'

export default function Hero({
  pageTitle = 'FIFA Women’s World Cup ',
  text = 'Get ready for the world’s biggest football tournament, kicking off in Brazil on June 24, 2027.',
}) {
  const [loading, setLoading] = useState(false)

  const handleTicketClick = () => {
    setLoading(true)

    setTimeout(() => {
      window.open(
        'https://www.fifa.com/en/tickets',
        '_blank',
        'noopener,noreferrer'
      )

      setLoading(false)
    }, 1500)
  }

  return (
    <>
      {/* Reusable Loading Screen */}
      {loading && (
        <LoadingScreen text="Taking you to FIFA..." />
      )}

      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg_3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <div className="container-page flex min-h-[680px] h-[100svh] items-center py-24 sm:min-h-[700px]">
            <div className="ml-0 w-full text-center sm:text-left lg:ml-auto lg:w-5/12">

              <h1 className="text-[2rem] font-bold leading-[1.1] text-white xs:text-[2.25rem] sm:text-[3rem] lg:text-[4rem]">
                {pageTitle}
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base lg:mx-0">
                {text}
              </p>

              <Countdown />

              <div className="mt-6 flex  flex-wrap items-center justify-center gap-5 sm:justify-start">

                {/* BOOK TICKET */}
                <button
                  type="button"
                  onClick={handleTicketClick}
                  disabled={loading}
                  className="ticket-button group rounded-xl"
                >
                  <span className="ticket-shine" />

                  <span className="relative  font-mono text-xl z-10">
                    Book Ticket
                  </span>

                  
                </button>

                {/* LEARN MORE */}
               <Link
  to="/matches"
  className="group relative flex items-center gap-2 px-1 py-1 text-xs uppercase tracking-[1px] text-white transition-colors duration-300 "
>
  <span>More</span>

  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
    <ArrowRight />
  </span>

  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
</Link>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}