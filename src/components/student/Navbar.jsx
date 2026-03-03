import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets.js'
import { AppContext } from '../../context/AppContext.jsx'
import { useUser, useClerk, UserButton } from '@clerk/clerk-react'


const Navbar = () => {

  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list');
  const { navigate, isEducator } = React.useContext(AppContext)
  const { user } = useUser()
  const { openSignUp, openSignIn } = useClerk()

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-grey-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-grey-500'>
        {user ? (
          <>
            <div className='flex items-center gap-5'>
              <button onClick={() => { navigate('/educator') }}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button> |
              <Link to="/my-enrollments">My Enrollments</Link>
            </div>
            <UserButton />
          </>
        ) : (
          <>
            <button onClick={() => openSignIn()} className='text-gray-700'>Sign In</button>
            <button onClick={() => openSignUp()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
          </>
        )}
      </div>

      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-grey-500'>
        {user ? (
          <>
            <button onClick={() => { navigate('/educator') }}>{isEducator ? "Educator Dashboard" : "Become Educator"}</button>
            <UserButton />
          </>
        ) : (
          <>
            <button onClick={() => openSignIn()} className='text-gray-700'>Sign In</button>
            <button onClick={() => openSignUp()}><img src={assets.user_icon} alt="Create Account" /></button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar