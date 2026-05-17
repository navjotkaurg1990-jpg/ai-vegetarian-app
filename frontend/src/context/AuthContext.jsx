import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user);
        setLoading(false);
      }, (error) => {
        console.error("Firebase Auth Error:", error);
        setFirebaseError(error.message);
        setLoading(false);
      });

      // Safety timeout - if Firebase never responds in 5 seconds, stop loading
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => {
        unsubscribe();
        clearTimeout(timeout);
      };
    } catch (error) {
      console.error("Firebase initialization error:", error);
      setFirebaseError(error.message);
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    firebaseError
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Outfit, sans-serif', color: '#059669', fontSize: '1.2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid #10b981', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
            <p>Loading PureBite...</p>
          </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};
