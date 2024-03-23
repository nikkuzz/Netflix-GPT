import React, { useState,useRef } from 'react'
import Header from './Header'
import { validateData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

import { updateProfile } from "firebase/auth";
import { USER_AVATAR } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {
    const [isSignIn, setisSignIn] = useState(true);
    const [errorMessage,seterrorMessage] = useState(null);
 
   const dispatch = useDispatch();

   const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignUpIn = () => {
      setisSignIn(!isSignIn);
    }

    const handleSubmitButton = () => {

      const credMessage = validateData(email.current.value, password.current.value);
      seterrorMessage(credMessage)

      if(credMessage) return;

      if(!isSignIn){
        // for new user - Sign Up
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
       .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
             displayName: name.current.value,
              photoURL: USER_AVATAR,
        })
        .then(() => {
       // Profile updated!
       const { uid, email, displayName, photoURL } = auth.currentUser;
       dispatch(
         addUser({
           uid: uid,
           email: email,
           displayName: displayName,
           photoURL: photoURL,
         })
       );
       })
      .catch((error) => {
      // An error occurred
          seterrorMessage(error.message);
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode + " -> " + errorMessage)
    // ..
  });
 } 
      else{
        // for existing  user - Sign in
        signInWithEmailAndPassword( auth,
          email.current.value, 
          password.current.value)
       .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode + " -> " + errorMessage)
  });
      }
    }

  return (
    <div>
      <Header />
      <div className='absolute'>
      <img 
      src='https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
      alt="bg-img"/>
    </div>


      <form onSubmit={(e) => e.preventDefault()} className='absolute text-white p-12 w-4/12 bg-black bg-opacity-75 my-36 mx-auto left-0 right-0'>
        
        <h1 className="font-bold text-3xl">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        
        {!isSignIn && 
        <input ref={name} type='text' placeholder='Full Name' className='p-3 my-3 w-full bg-gray-700'/>}


        <input ref={email} type='text' placeholder='Email or Phone number' 
        className='p-3 my-3 w-full bg-gray-700'/>

        <input ref={password} type='password' placeholder='Password'
         className='p-3 my-3 w-full bg-gray-700'/>

        <p className='font-bold text-red-500 mt-2'>{errorMessage}</p>

        <button onClick={handleSubmitButton}  type='submit' className='my-6 p-3 bg-red-600 w-full'>
          {isSignIn ? "Sign In" : "Sign Up"}</button>

        <p className='mt-4 cursor-pointer' 
          onClick={toggleSignUpIn}>
          {isSignIn ? "New to Netflix? Sign Up!" : "Already registered.Sign In!"}
        </p>
      </form>
    </div>
  
  )
}

export default Login