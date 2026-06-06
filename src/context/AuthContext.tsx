import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is in 'admins' collection
        try {
          const { collection, query, where, getDocs } = await import('firebase/firestore');
          const { db } = await import('../lib/firebase');
          const q = query(collection(db, 'admins'), where('email', '==', user.email));
          const snap = await getDocs(q);
          
          // If the user email is the owner email or in the admins collection
          setIsAdmin(!snap.empty || user.email === 'mawlanaehsan24@gmail.com');
        } catch (e) {
          console.error('Error checking admin status:', e);
          setIsAdmin(user.email === 'mawlanaehsan24@gmail.com');
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
