import React,{ createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

let AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
    
  const [currentUser, setCurrentUser] = useState();
  const [loading,setLoading] = useState(false)
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

