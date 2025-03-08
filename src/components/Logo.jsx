import React from 'react'

function Logo({width="100px"}) {
  return (
    <div className="flex items-center justify-center">
    <img
      src="/logo.jpg"  // Ensure the logo is inside `public` folder
      alt="Logo"
      width={width}  
      height="auto"  // Keeps aspect ratio
      className="object-cover rounded-full shadow-md"  // Circle with border & shadow
      loading="lazy" // Optimized loading
    />
  </div>
  )
}

export default Logo
