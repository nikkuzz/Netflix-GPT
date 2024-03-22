import React, { useState } from 'react'
import Header from './Header'


const Login = () => {
    const [isSignIn, setisSignIn] = useState(true);

    const toggleSignUpIn = () => {
      setisSignIn(!isSignIn);
    }

  return (
    <div>
      <Header />
      <div className='absolute'>
      <img 
      src='https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
      alt="bg-img"/>
    </div>


      <form className='absolute text-white p-12 w-4/12 bg-black bg-opacity-75 my-36 mx-auto left-0 right-0'>
        <h1 className="font-bold text-3xl">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && <input type='text' placeholder='Full Name' className='p-3 my-3 w-full bg-gray-700'/>}
        <input type='text' placeholder='Email or Phone number' className='p-3 my-3 w-full bg-gray-700'/>
        <input type='password' placeholder='Password' className='p-3 my-3 w-full bg-gray-700'/>
        <button type='submit' className='my-6 p-3 bg-red-600 w-full'>{isSignIn ? "Sign In" : "Sign Up"}</button>
        <p className='mt-4 cursor-pointer' 
        onClick={toggleSignUpIn}>{isSignIn ? "New to Netflix? Sign Up!" : "Already registered.Sign In!"}</p>
      </form>
    </div>
  
  )
}

export default Login