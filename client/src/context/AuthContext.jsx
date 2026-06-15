import { createContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import api from '../lib/api';
import { establishSession, endSession } from '../lib/authSession';
import { clearAccessToken, getAccessToken } from '../lib/tokenStorage';
import { resolveGoogleRedirectOnBoot } from '../lib/googleAuth';
import { isProfileOnboarded } from '../lib/authRedirect';

export const AuthContext = createContext(null);

const PROFILE_FETCH_COOLDOWN_MS = 3000;

function profileChanged(prev, next) {
  if (!prev || !next) return true;
  return (
    prev.uid !== next.uid ||
    prev.role !== next.role ||
    prev.phone !== next.phone ||
    prev.isAdmin !== next.isAdmin ||
    prev.needsPasswordSetup !== next.needsPasswordSetup ||
    prev.onboarded !== next.onboarded ||
    prev.pgId !== next.pgId
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const profileFetchRef = useRef(null);
  const profileFetchGen = useRef(0);
  const lastFetchAt = useRef(0);
  const profileRef = useRef(null);

  profileRef.current = profile;

  const fetchProfile = useCallback(async ({ force = false } = {}) => {
    const now = Date.now();
    if (!force && profileRef.current && now - lastFetchAt.current < PROFILE_FETCH_COOLDOWN_MS) {
      return profileRef.current;
    }

    if (force) {
      profileFetchGen.current += 1;
      profileFetchRef.current = null;
    }

    const generation = profileFetchGen.current;

    if (profileFetchRef.current) {
      const inFlight = await profileFetchRef.current;
      if (generation !== profileFetchGen.current && profileFetchRef.current) {
        return profileFetchRef.current;
      }
      return inFlight;
    }

    setProfileLoading(true);

    const promise = (async () => {
      try {
        const loadMe = async () => {
          const { data } = await api.get('/api/auth/me');
          return data;
        };

        if (!getAccessToken()) {
          await establishSession();
        }

        let data;
        try {
          data = await loadMe();
        } catch (err) {
          if (err.response?.status === 401) {
            await establishSession();
            data = await loadMe();
          } else {
            throw err;
          }
        }

        if (generation !== profileFetchGen.current) {
          return undefined;
        }

        lastFetchAt.current = Date.now();

        if (data.success) {
          setProfile((prev) => (profileChanged(prev, data.data) ? data.data : prev));
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
          setProfileLoading(false);
        }
      }
    })();

    profileFetchRef.current = promise;

    const result = await promise;

    if (result === undefined) {
      if (profileFetchRef.current) {
        return profileFetchRef.current;
      }
      return fetchProfile();
    }

    return result;
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
          await fetchProfile({ force: true });
        } else {
          clearAccessToken();
          setProfile(null);
          profileRef.current = null;
          profileFetchGen.current += 1;
          profileFetchRef.current = null;
          lastFetchAt.current = 0;
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
    profileRef.current = null;
    lastFetchAt.current = 0;
  };

  const refreshProfile = useCallback(
    (options) => fetchProfile(options),
    [fetchProfile]
  );

  const patchProfile = useCallback((patch) => {
    setProfile((prev) => {
      const next = prev ? { ...prev, ...patch } : { ...patch };
      profileRef.current = next;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      role: profile?.role || null,
      isAdmin: profile?.isAdmin === true,
      loading,
      profileLoading,
      signOut,
      refreshProfile,
      patchProfile,
      isAuthenticated: !!user,
      isOnboarded: isProfileOnboarded(profile),
      needsPasswordSetup: profile?.needsPasswordSetup === true,
    }),
    [user, profile, loading, profileLoading, refreshProfile, patchProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
