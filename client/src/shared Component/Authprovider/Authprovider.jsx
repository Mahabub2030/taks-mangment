import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "../../Firebase/FirebaseConfigFile/Firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const Authcontext = createContext(null);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [looding, setLooding] = useState(true);
  //--------------------------------------------------------Login User-------------------------
const userLogin = (email, password) =>{
  setLooding(true)
  return signInWithEmailAndPassword(auth, email, password)
}
  //--------------------------------------------------------Register User-------------------------
  const userCreated = (email, password) => {
    setLooding(true)
    console.log(email, password, "email and password ");
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //-------------------------------------------------------- User Google Lgoin -------------------------

  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  //-------------------------------------------------------- User Log Out-------------------------
  //-------------------------------------------------------- Update profile-------------------------
  
  //-------------------------------------------------------- Update profile-------------------------

  const userLogOut = () =>{
    return signOut(auth)
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("state captured", currentUser);
  //     if (currentUser?.email) {
  //       const user = { email: currentUser.email };
  //       axios
  //         .post("https://assinment-eleven-server-site.vercel.app/jwt", user, {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           console.log("login", res.data);
  //           setLooding(false);
  //         });
  //     } else {
  //       axios
  //         .post(
  //           "https://assinment-eleven-server-site.vercel.app/logout",
  //           {},
  //           {
  //             withCredentials: true,
  //           }
  //         )
  //         .then((res) => {
  //           console.log("logout", res.data);
  //           setLooding(false);
  //         });
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useEffect(()=>{
    const  unsubscribe = onAuthStateChanged(auth,( currentUser)=>{
      setUser(currentUser)
        setLooding(false)
    } )
    return ()=>unsubscribe()
})
  const userInfo = {
    user,
    googleLogin,
    userCreated,
    userLogin, 
    userLogOut,
    looding
    
  };

  return (
    <Authcontext.Provider value={userInfo}>{children}</Authcontext.Provider>
  );
};

export default Authprovider;
