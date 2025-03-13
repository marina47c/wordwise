import { ReactNode } from 'react';

export type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthContextProps {
  login: (email: string, password: string) => void;
  logout: () => void;
  user: string | null;
  isAuthenticated: boolean;
}

export type AuthReducerProps = {
  state: AuthState;
  action: AuthAction;
};

export type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
};

export type AuthAction = {
  type: string;
  payload?: any;
};
