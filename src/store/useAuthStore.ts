import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateMockJWT, isMockJWTValid, decodeMockJWT } from '../utils/jwt';

const TOKEN_KEY = '@auth_token';

interface AuthState {
  token: string | null;
  email: string | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  isLoading: true,

  login: async (email: string) => {
    try {
      const token = generateMockJWT(email);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      set({ token, email, isLoading: false });
    } catch (error) {
      console.error('Failed to save token', error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      set({ token: null, email: null, isLoading: false });
    } catch (error) {
      console.error('Failed to remove token', error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token && isMockJWTValid(token)) {
        const payload = decodeMockJWT(token);
        set({ token, email: payload?.email || null, isLoading: false });
      } else {
        if (token) {
          // Token is invalid/expired, remove it
          await AsyncStorage.removeItem(TOKEN_KEY);
        }
        set({ token: null, email: null, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to check token', error);
      set({ token: null, email: null, isLoading: false });
    }
  },
}));
