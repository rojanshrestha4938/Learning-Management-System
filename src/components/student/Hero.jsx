import React from 'react'
import { assets } from '../../assets/assets.js'
import SearchBar from './SearchBar.jsx'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-20 md:pt-36 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 to-white">
  
  <h1 className="relative max-w-3xl mx-auto font-bold text-gray-800 text-[--text-home-heading-small] md:text-[--text-home-heading-large]">
    Empower your future with the course designed to{" "}
    <span className="text-blue-600">fit your choice.</span>
    <img
      src={assets.sketch}
      alt="sketch"
      className="absolute hidden md:block -bottom-7 right-0 pointer-events-none select-none"
    />
  </h1>

  <p className="hidden md:block max-w-2xl mx-auto text-gray-500">
    We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
  </p>

  <p className="md:hidden max-w-sm mx-auto text-gray-500">
    We bring together world-class instructors to help you achieve your personal and professional goals.
  </p>
    <SearchBar />
</div>

  )
}

export default Hero