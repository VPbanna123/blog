import { useState,useEffect } from 'react'
import authService from './appwrite/auth'
import './App.css'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import { Footer,Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
const dispatch=useDispatch()

useEffect(() => {
authService.getCurrentUser()
.then((userData)=>{
  if(userData){
    dispatch(login({userData}))
  }
  else{
    dispatch(logout())
  }
})
.finally(()=>{setLoading(false)})



}, [])

return !loading?(<div className="min-h-screen flex flex-col">
   
{/* Fixed Header */}
<Header className="fixed top-0 left-0 w-full" />
<div className="absolute top-0 left-0 w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        poster="/fallback.jpg"
      >
        <source src="/bg.mp4" type="video/mp4" />
        <img src="/bg.jpg" alt="Background" className="w-full h-full object-cover" />
      </video>
    </div>
{/* Main Content - Centered */}
<main className="flex-2 flex items-center justify-center text-center px-4 py-20">
 
  <Outlet />
</main>

{/* Fixed Footer */}
<Footer />
</div>):null

}

export default App
