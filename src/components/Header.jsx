// // import { useEffect, useState } from 'react'
// // import { NavLink } from 'react-router-dom'
// // import { navItems } from '../data'

// // export default function Header() {
// //   const [mobileOpen, setMobileOpen] = useState(false)

// //   useEffect(() => {
// //     document.body.style.overflow = mobileOpen ? 'hidden' : ''
// //     return () => { document.body.style.overflow = '' }
// //   }, [mobileOpen])

// //   return (
// //     <>
// //       <header className="fixed left-0 top-0 z-[100] w-full bg-transparent py-3 sm:py-4" role="banner">
// //         <div className="container-page">
// //           <div className="flex items-center">
// //             <NavLink to="/" className="relative block shrink-0 font-black text-[1.3rem] text-white" aria-label="Home">
// //               <img src="/images/logo.png" alt="Logo" className="h-auto w-[92px] sm:w-[112px] md:w-[125px] lg:w-[225px]" />
// //             </NavLink>

// //             <div className="ml-auto">
// //               <nav className="hidden lg:block text-right" aria-label="Main navigation">
// //                 <ul className="mb-0 list-none p-0">
// //                   {navItems.map((item) => (
// //                     <li key={item.path} className="inline-block">
// //                       <NavLink
// //                         to={item.path}
// //                         className={({ isActive }) =>
// //                           `relative inline-block px-3 py-[6px] xl:px-4 2xl:px-5 text-[11px] xl:text-xs font-normal uppercase tracking-[.08rem] text-white hover:text-white ${
// //                             isActive
// //                               ? 'after:absolute after:bottom-0 after:left-5 after:right-5 after:h-[2px] after:bg-white'
// //                               : ''
// //                           }`
// //                         }
// //                       >
// //                         {item.label}
// //                       </NavLink>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </nav>

// //               <button
// //                 type="button"
// //                 className="lg:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center text-white"
// //                 aria-label="Open menu"
// //                 aria-expanded={mobileOpen}
// //                 onClick={() => setMobileOpen(true)}
// //               >
// //                 <span className="icon-menu text-2xl" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div
// //         className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 ${
// //           mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
// //         }`}
// //         onClick={() => setMobileOpen(false)}
// //         aria-hidden="true"
// //       />

// //       <aside
// //         className={`fixed right-0 top-0 z-[110] h-dvh w-[min(300px,88vw)] bg-white pt-4 shadow-[-10px_0_20px_-10px_rgba(0,0,0,.1)] transition-transform duration-300 ${
// //           mobileOpen ? 'translate-x-0' : 'translate-x-[110%]'
// //         }`}
// //         aria-label="Mobile navigation"
// //       >
// //         <div className="flex justify-end px-5">
// //           <button
// //             type="button"
// //             aria-label="Close menu"
// //             onClick={() => setMobileOpen(false)}
// //             className="mt-2 p-2 text-black"
// //           >
// //             <span className="icon-close2 text-3xl" />
// //           </button>
// //         </div>
// //         <nav className="overflow-y-auto px-5 pb-36 pt-2">
// //           {navItems.map((item) => (
// //             <NavLink
// //               key={item.path}
// //               to={item.path}
// //               onClick={() => setMobileOpen(false)}
// //               className={({ isActive }) =>
// //                 `block px-5 py-2.5 text-xl ${isActive ? 'text-[#ee1e46]' : 'text-[#212529] hover:text-[#ee1e46]'}`
// //               }
// //             >
// //               {item.label}
// //             </NavLink>
// //           ))}
// //         </nav>
// //       </aside>
// //     </>
// //   )
// // }


// import { useEffect, useState } from 'react'
// import { NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { navItems } from '../data'

// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   const location = useLocation()
// const navigate = useNavigate()  
//   const isHome = location.pathname === '/'

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? 'hidden' : ''

//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [mobileOpen])

//   useEffect(() => {
//     // Only change header on Home page
//     if (!isHome) {
//       setScrolled(false)
//       return
//     }

//     const handleScroll = () => {
//       setScrolled(window.scrollY >= window.innerHeight - 100)
//     }

//     handleScroll()

//     window.addEventListener('scroll', handleScroll, {
//       passive: true,
//     })

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [isHome])

//   const handleContactClick = (e) => {
//   e.preventDefault()

//   if (location.pathname === '/') {
//     document.getElementById('footer')?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     })
//   } else {
//     navigate('/')

//     setTimeout(() => {
//       document.getElementById('footer')?.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       })
//     }, 100)
//   }

//   setMobileOpen(false)
// }
//   return (
//     <>
//       <header
//         className={`fixed left-0 top-0 z-[100] w-full py-3 transition-all duration-500 sm:py-4 ${
//           isHome && scrolled
//             ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
//             : 'bg-transparent'
//         }`}
//         role="banner"
//       >
//         <div className="container-page">
//           <div className="flex items-center">

//             {/* LOGO */}
//             <NavLink
//               to="/"
//               className="relative block shrink-0"
//               aria-label="Home"
//             >
//               <img  
//                 src={isHome && scrolled ? "/images/blacklogo.png" : "/images/logo.png"}
//                 alt="Logo"
//                 className={`h-auto w-[92px] transition-all duration-500 sm:w-[112px] md:w-[125px] lg:w-[225px] `}
//               />
//             </NavLink>


//             {/* NAV */}
//             <div className="ml-auto">

//               <nav
//                 className="hidden text-right lg:block"
//                 aria-label="Main navigation"
//               >
//                 <ul className="mb-0 list-none p-0">

//                   {navItems.map((item) => (
//   <li key={item.label} className="inline-block">
//     {item.label === 'Contact' ? (
//       <button
//         type="button"
//         onClick={handleContactClick}
//         className={`relative inline-block cursor-pointer border-0 bg-transparent px-3 py-[6px] xl:px-4 2xl:px-5 text-[11px] xl:text-xs font-normal uppercase tracking-[.08rem] transition-colors duration-300 ${
//           isHome && scrolled
//             ? 'text-[#222831] hover:text-[#ee1e46]'
//             : 'text-white hover:text-white'
//         }`}
//       >
//         Contact
//       </button>
//     ) : (
//       <NavLink
//         to={item.path}
//         className={({ isActive }) => `
//           relative inline-block
//           px-3 py-[6px]
//           xl:px-4
//           2xl:px-5
//           text-[11px]
//           xl:text-xs
//           font-normal
//           uppercase
//           tracking-[.08rem]
//           transition-colors
//           duration-300
//           ${
//             isHome && scrolled
//               ? '!text-[#222831] hover:!text-[#ee1e46]'
//               : '!text-white hover:!text-white'
//           }
//           ${
//             isActive
//               ? `after:absolute after:bottom-0 after:left-5 after:right-5 after:h-[2px] ${
//                   isHome && scrolled
//                     ? 'after:bg-[#222831]'
//                     : 'after:bg-white'
//                 }`
//               : ''
//           }
//         `}
//       >
//         {item.label}
//       </NavLink>
//     )}
//   </li>
// ))}
//                 </ul>
//               </nav>


//               {/* MOBILE BUTTON */}
//               <button
//                 type="button"
//                 className={`inline-flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-300 lg:hidden ${
//                   isHome && scrolled
//                     ? '!text-[#222831]'
//                     : '!text-white'
//                 }`}
//                 aria-label="Open menu"
//                 aria-expanded={mobileOpen}
//                 onClick={() => setMobileOpen(true)}
//               >
//                 <span className="icon-menu text-2xl" />
//               </button>

//             </div>

//           </div>
//         </div>
//       </header>


//       {/* MOBILE OVERLAY */}
//       <div
//         className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 ${
//           mobileOpen
//             ? 'visible opacity-100'
//             : 'invisible opacity-0'
//         }`}
//         onClick={() => setMobileOpen(false)}
//         aria-hidden="true"
//       />


//       {/* MOBILE MENU */}
//       <aside
//         className={`fixed right-0 top-0 z-[110] h-dvh w-[min(300px,88vw)] bg-white pt-4 shadow-[-10px_0_20px_-10px_rgba(0,0,0,.1)] transition-transform duration-300 ${
//           mobileOpen
//             ? 'translate-x-0'
//             : 'translate-x-[110%]'
//         }`}
//         aria-label="Mobile navigation"
//       >

//         <div className="flex justify-end px-5">

//           <button
//             type="button"
//             aria-label="Close menu"
//             onClick={() => setMobileOpen(false)}
//             className="mt-2 p-2 text-black"
//           >
//             <span className="icon-close2 text-3xl" />
//           </button>

//         </div>

//         <nav className="overflow-y-auto px-5 pb-36 pt-2">

//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               onClick={() => setMobileOpen(false)}
//               className={({ isActive }) =>
//                 `block px-5 py-2.5 text-xl ${
//                   isActive
//                     ? 'text-[#ee1e46]'
//                     : 'text-[#212529] hover:text-[#ee1e46]'
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}

//         </nav>

//       </aside>
//     </>
//   )
// }



import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../data'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === '/'

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    // Scroll effect only works on Home page
    if (!isHome) {
      setScrolled(false)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight - 100)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  // CONTACT → FOOTER
  const handleContactClick = (e) => {
    e.preventDefault()

    if (location.pathname === '/') {
      document.getElementById('footer')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      navigate('/')

      setTimeout(() => {
        document.getElementById('footer')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 300)
    }

    setMobileOpen(false)
  }

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed left-0 top-0 z-[100] w-full py-3 transition-all duration-500 sm:py-4 ${
          isHome && scrolled
            ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-page">
          <div className="flex items-center">

            {/* LOGO */}
            <NavLink
              to="/"
              className="relative block shrink-0"
              aria-label="Home"
            >
              <img
                src={
                  isHome && scrolled
                    ? '/images/blacklogo.png'
                    : '/images/logo.png'
                }
                alt="Logo"
                className="h-auto w-[92px] transition-all duration-500 sm:w-[112px] md:w-[125px] lg:w-[225px]"
              />
            </NavLink>

            {/* DESKTOP NAV */}
            <div className="ml-auto">
              <nav
                className="hidden text-right lg:block"
                aria-label="Main navigation"
              >
                <ul className="mb-0 list-none p-0">

                  {navItems.map((item) => (
                    <li
                      key={item.label}
                      className="inline-block"
                    >
                      {/* CONTACT */}
                      {item.label === 'Contact' ? (
                        <button
                          type="button"
                          onClick={handleContactClick}
                          className={`relative inline-block cursor-pointer border-0 bg-transparent px-3 py-[6px] text-[11px] font-normal uppercase tracking-[.08rem] transition-colors duration-300 xl:px-4 xl:text-xs 2xl:px-5 ${
                            isHome && scrolled
                              ? 'text-[#222831] hover:text-[#ee1e46]'
                              : 'text-white hover:text-white'
                          }`}
                        >
                          Contact
                        </button>
                      ) : (
                        /* NORMAL NAV LINKS */
                        <NavLink
                          to={item.path}
                          className={({ isActive }) => `
                            relative inline-block
                            px-3 py-[6px]
                            text-[11px]
                            font-normal
                            uppercase
                            tracking-[.08rem]
                            transition-colors
                            duration-300
                            xl:px-4
                            xl:text-xs
                            2xl:px-5
                            ${
                              isHome && scrolled
                                ? '!text-[#222831] hover:!text-[#ee1e46]'
                                : '!text-white hover:!text-white'
                            }
                            ${
                              isActive
                                ? `after:absolute after:bottom-0 after:left-5 after:right-5 after:h-[2px] ${
                                    isHome && scrolled
                                      ? 'after:bg-[#222831]'
                                      : 'after:bg-white'
                                  }`
                                : ''
                            }
                          `}
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </li>
                  ))}

                </ul>
              </nav>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-300 lg:hidden ${
                  isHome && scrolled
                    ? '!text-[#222831]'
                    : '!text-white'
                }`}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <span className="icon-menu text-2xl" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 ${
          mobileOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-[110] h-dvh w-[min(300px,88vw)] bg-white pt-4 shadow-[-10px_0_20px_-10px_rgba(0,0,0,.1)] transition-transform duration-300 ${
          mobileOpen
            ? 'translate-x-0'
            : 'translate-x-[110%]'
        }`}
        aria-label="Mobile navigation"
      >

        {/* CLOSE BUTTON */}
        <div className="flex justify-end px-5">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="mt-2 p-2 text-black"
          >
            <span className="icon-close2 text-3xl" />
          </button>
        </div>

        {/* MOBILE LINKS */}
        <nav className="overflow-y-auto px-5 pb-36 pt-2">

          {navItems.map((item) => (
            item.label === 'Contact' ? (
              <button
                key={item.label}
                type="button"
                onClick={handleContactClick}
                className="block w-full px-5 py-2.5 text-left text-xl text-[#212529] transition-colors duration-300 hover:text-[#ee1e46]"
              >
                Contact
              </button>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-2.5 text-xl transition-colors duration-300 ${
                    isActive
                      ? 'text-[#ee1e46]'
                      : 'text-[#212529] hover:text-[#ee1e46]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}

        </nav>
      </aside>
    </>
  )
}