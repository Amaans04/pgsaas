import { createContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import api from '../lib/api';
import { establishSession, endSession } from '../lib/authSession';
import { clearAccessToken } from '../lib/tokenStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/api/auth/me');
      if (data.success) {
        setProfile(data.data);
        return data.data;
      }
      setProfile(null);
      return null;
    } catch {
      setProfile(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          await establishSession();
          await fetchProfile();
        } catch {
          clearAccessToken();
          setProfile(null);
        }
      } else {
        clearAccessToken();
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [fetchProfile]);

  const signOut = async () => {
    await endSession();
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    return fetchProfile();
  };

  const value = {
    user,
    profile,
    role: profile?.role || null,
    isAdmin: profile?.isAdmin === true,
    loading,
    signOut,
    refreshProfile,
    isAuthenticated: !!user,
    isOnboarded: profile?.onboarded === true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
