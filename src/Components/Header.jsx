import {onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { BG_IMG } from "../utils/constants";



const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
          // Sign-out successful .
          navigate("/")

        }).catch((error) => {
          // An error happened.
          navigate("/Error")
        });
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse");
          } else {
            dispatch(removeUser());
            navigate("/");
          }
        });
    
        // Unsubscribe when component unmounts
        return () => unsubscribe();
      }, []);

    return (
        <div className="absolute w-screen px-8 py-2 z-10 bg-gradient-to-b from-black flex flex-col justify-between md:flex-row">
            <img src={BG_IMG}
            alt="Netflix-logo"
            className="w-44 mx-auto md:mx-0"
            />
       
      {user && ( 
      <div className="flex p-2" >
         <img
         src={user?.photoURL}
         alt="profile-pic"
           className="w-12 h-12"
         />   
         <button onClick={handleSignOut} className="text-white font-bold">Sign Out</button>
         </div>
      )}
        </div> 
    )
}

export default Header;