import { ReactNode } from 'react';
import { User } from '../types';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  login: (email: string, password: string) => void;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthReducerProps {
  state: AuthState;
  action: AuthAction;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthAction {
  type: string;
  payload?: any;
}
