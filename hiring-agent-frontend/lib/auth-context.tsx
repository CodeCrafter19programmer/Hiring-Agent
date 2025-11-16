'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User, AuthResponse } from './supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, role: 'admin' | 'recruiter') => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role || 'recruiter',
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata?.role || 'recruiter',
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, role: 'admin' | 'recruiter'): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email!,
          role: data.user.user_metadata?.role || role,
        };
        setUser(userData);
        return { user: userData, session: data.session, error: null };
      }

      return { user: null, session: null, error: 'Authentication failed' };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Sign in error:', message);
      return { user: null, session: null, error: message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Sign out error:', message);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
