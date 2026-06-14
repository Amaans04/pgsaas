import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import api from '../lib/api';
import { establishSession, endSession } from '../lib/authSession';
import { clearAccessToken } from '../lib/tokenStorage';
import { resolveGoogleRedirectOnBoot } from '../lib/googleAuth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const profileFetchRef = useRef(null);
  const profileFetchGen = useRef(0);

  const fetchProfile = useCallback(async ({ force = false } = {}) => {
    if (force) {
      profileFetchRef.current = null;
      profileFetchGen.current += 1;
    }

    const generation = profileFetchGen.current;

    if (profileFetchRef.current) {
      return profileFetchRef.current;
    }

    profileFetchRef.current = (async () => {
      try {
        await establishSession();
        const { data } = await api.get('/api/auth/me');
        if (generation !== profileFetchGen.current) {
          return null;
        }
        if (data.success) {
          setProfile(data.data);
          return data.data;
        }
        setProfile(null);
        return null;
      } catch {
        if (generation === profileFetchGen.current) {
          setProfile(null);
        }
        return null;
      } finally {
        if (generation === profileFetchGen.current) {
          profileFetchRef.current = null;
        }
      }
    })();

    return profileFetchRef.current;
  }, []);

  useEffect(() => {
    let unsubscribe;
    let cancelled = false;

    (async () => {
      await resolveGoogleRedirectOnBoot();

      if (cancelled) return;

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          await fetchProfile();
        } else {
          clearAccessToken();
          setProfile(null);
        }

        setLoading(false);
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [fetchProfile]);

  const signOut = async () => {
    await endSession();
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async (options) => {
    return fetchProfile(options);
  };

  const patchProfile = useCallback((patch) => {
    setProfile((prev) => (prev ? { ...prev, ...patch } : { ...patch }));
  }, []);

  const value = {
    user,
    profile,
    role: profile?.role || null,
    isAdmin: profile?.isAdmin === true,
    loading,
    signOut,
    refreshProfile,
    patchProfile,
    isAuthenticated: !!user,
    isOnboarded: profile?.onboarded === true || Boolean(profile?.role),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
