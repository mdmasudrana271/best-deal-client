import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import  { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
export const ThemeContext = createContext();

export const auth = getAuth(app)

const AuthProvider = ({children})=>{

    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)



    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
      }

      const signInWithEmailPassword = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
      }

      const updateUserProfile =(profile)=>{
        setLoading(true)
       return updateProfile(auth.currentUser, profile)
      }

      const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };


      const logOut = ()=>{
        signOut(auth)
        .then(()=>{
          console.log('log out success')
        })
        .catch(error => {
          console.log(error.message)
        })
      }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
          setUser(currentUser)
          setLoading(false)
        })
        return ()=>{
          unsubscribe();
        }
      },[])


      const authInfo = {user ,createUser , signInWithEmailPassword, updateUserProfile, logOut, resetPassword, loading, error, setError,}

      return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
      );
}


export default AuthProvider;