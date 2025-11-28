import { User } from '../types';

const STORAGE_KEY = 'bebest_user_session';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email && password) {
      // Mock successful login
      const user: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0], // Use part of email as name for demo
        email: email,
        company: 'Demo Corp'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password && name) {
      const user: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        company: 'New Client Ltd'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error('Please fill in all fields');
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
};