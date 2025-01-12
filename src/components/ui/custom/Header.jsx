import React from 'react'
import { Button } from "@/components/ui/button"


function Header() {
  return (
    <div className='p-2 px-8 shadow-lg flex justify-between items-center rounded'>
      <div className="flex items-center">
        <span className="text-3xl font-bold font-playfair tracking-widest text-slate-800 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent flex items-center">
          Wander
          <img 
            src="/logoipsum-339.svg" 
            alt="logo" 
            className="w-12 h-12 hover:scale-105 transition-transform mx-1" 
          />
          Lust
        </span>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
