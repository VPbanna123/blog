import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    // <footer className="rounded-3xl ml-1 mr-1 h-14 left-0 right-0 shadow bg-gradient-to-r from-green-400 to-blue-300 hover:from-blue-300 hover:to-green-400  animate-bg-transition  transition-all duration-500 text-white py-4 w-full fixed bottom-0 justify-center ">
    <footer className="font-bold rounded-3xl ml-1 mr-1 h-14 left-0 right-0 shadow bg-gradient-to-r from-black to-gray-700 hover:from-gray-700 hover:to-black transition-all duration-500 text-white py-4 w-full fixed bottom-0 flex justify-center items-center">

      <div className="container mx-auto px-3 flex flex-wrap justify-between items-center">
        {/* Logo & Copyright */}
        <div>
        <Link to="/" className="inline-block mb-2">
            <Logo width="50px" />
          </Link>
        </div>
        <div className='justify-center'>
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6 text-sm">
          <Link className="hover:text-gray-400" to="/">Features</Link>
          <Link className="hover:text-gray-400" to="/">Pricing</Link>
          <Link className="hover:text-gray-400" to="/">Contact</Link>
          <Link className="hover:text-gray-400" to="/">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer