import React from 'react'
import Header from '../dashboard/_components/Header.jsx'
import Footer from '../dashboard/_components/Footer.jsx'

function DashboardLayout({children}) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default DashboardLayout