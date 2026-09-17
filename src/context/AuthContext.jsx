import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'CA Aspirant',
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            isAnonymous: false
          });
          setIsDemoMode(false);
        } else {
          // Default guest user
          setUser({
            uid: 'guest',
            displayName: 'Guest Student',
            email: null,
            photoURL: null,
            isAnonymous: true
          });
          setIsDemoMode(true);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local demo mode
      setUser({
        uid: 'guest',
        displayName: 'Demo CA Aspirant',
        email: null,
        photoURL: null,
        isAnonymous: true
      });
      setIsDemoMode(true);
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      alert("Firebase configuration is not attached yet. Continuing in interactive Demo Mode!");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert(`Sign in failed: ${error.message}`);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth && user && !user.isAnonymous) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
    setUser({
      uid: 'guest',
      displayName: 'Guest Student',
      email: null,
      photoURL: null,
      isAnonymous: true
    });
    setIsDemoMode(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isDemoMode,
      isFirebaseConfigured,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
