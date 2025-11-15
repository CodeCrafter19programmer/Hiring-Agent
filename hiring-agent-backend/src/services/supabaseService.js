import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '../config/env.js';

class SupabaseService {
  constructor() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('Supabase credentials not configured');
      this.supabase = null;
    } else {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    }
  }

  isConfigured() {
    return this.supabase !== null;
  }

  async signIn(email, password) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('Supabase sign in error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async signUp(email, password, role = 'recruiter') {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('Supabase sign up error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async signOut(accessToken) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) throw error;

      return {
        success: true,
      };
    } catch (error) {
      console.error('Supabase sign out error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getUser(accessToken) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await this.supabase.auth.getUser(accessToken);
      
      if (error) throw error;

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error('Supabase get user error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getUserRole(userId) {
    if (!this.isConfigured()) {
      return 'recruiter'; // Default role if Supabase not configured
    }

    try {
      // In a real implementation, you might have a profiles table
      // For now, we'll extract role from user metadata
      const { data, error } = await this.supabase.auth.getUser();
      
      if (error) throw error;

      return data.user?.user_metadata?.role || 'recruiter';
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'recruiter'; // Default role on error
    }
  }
}

export default new SupabaseService();
