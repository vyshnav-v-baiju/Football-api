import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function SiteLayout() {
  return (
    <div className="page-shell min-h-screen bg-[#222831]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
