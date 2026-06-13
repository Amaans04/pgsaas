import { createContext, useState, useEffect, useCallback, useRef } from 'react';
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

  const profileFetchRef = useRef(null);

  const fetchProfile = useCallback(async () => {
    if (profileFetchRef.current) {
      return profileFetchRef.current;
    }

    profileFetchRef.current = (async () => {
      try {
        await establishSession();
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
      } finally {
        profileFetchRef.current = null;
      }
    })();

    return profileFetchRef.current;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await fetchProfile();
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
    isOnboarded: profile?.onboarded === true || Boolean(profile?.role),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
