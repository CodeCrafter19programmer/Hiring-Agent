import supabaseService from '../services/supabaseService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  const result = await supabaseService.signIn(email, password);
  
  if (!result.success) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: result.error 
    });
  }

  // Extract user role from metadata or default to recruiter
  const role = result.user.user_metadata?.role || 'recruiter';

  res.json({ 
    user: {
      id: result.user.id,
      email: result.user.email,
      role: role,
    },
    session: result.session,
    token: result.session.access_token,
  });
};

export const logout = async (req, res) => {
  const result = await supabaseService.signOut(req.user.token);
  
  if (!result.success) {
    return res.status(500).json({ 
      error: 'Logout failed',
      message: result.error 
    });
  }

  res.json({ message: 'Logged out successfully' });
};

export const me = async (req, res) => {
  const result = await supabaseService.getUser(req.user.token);
  
  if (!result.success) {
    return res.status(401).json({ 
      error: 'Invalid token',
      message: result.error 
    });
  }

  const role = result.user.user_metadata?.role || 'recruiter';

  res.json({ 
    user: {
      id: result.user.id,
      email: result.user.email,
      role: role,
    }
  });
};
