import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header'
import SplashCursor from './components/SplashCursor'
import { Toaster } from './components/ui/sonner'
import AnimatedContent from './blocks/Animations/AnimatedContent/AnimatedContent'





const router=createBrowserRouter([{

  path:'/',
  element:<App/> 
},
{
  path:'/create-trip',
  element:<CreateTrip/>
}
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Header/>
    <AnimatedContent/>
    
    <Toaster/>
    <SplashCursor/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
