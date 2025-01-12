import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import AnimatedContent from '@/blocks/Animations/AnimatedContent/AnimatedContent'


function Hero() {
  return (
    
    <div className='flex flex-col items-center justify-center max-w-1xl mx-auto px-8 py-12 gap-6'>
      <h1 className='text-6xl font-extrabold text-center'>
        <span className='text-orange-500 text-9xl font-clash '>Discover </span>your next adventure with AI: Personalized itineraries at your fingertips
      </h1>
      <p className='text-lg text-center text-gray-600'>
        We offer a wide range of travel packages to suit your budget and preferences
      </p>
     <Link to={'/create-trip'}>
    
     <Button>Get Started, It's Free</Button>
     </Link>
  
      
    </div>
    
      )
}

export default Hero