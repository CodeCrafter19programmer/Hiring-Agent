'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, type User } from '@/lib/auth';

export function useAuth(requireAuth: boolean = false) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = auth.getToken();
      
      if (!token) {
        setLoading(false);
        if (requireAuth) {
          router.push('/login');
        }
        return;
      }

      try {
        const { user: fetchedUser } = await auth.me();
        setUser(fetchedUser);
        // Update localStorage with fresh user data
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(fetchedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        auth.logout();
        if (requireAuth) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router]);

  return { user, loading, isAuthenticated: !!user };
}
