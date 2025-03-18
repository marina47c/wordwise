import { createContext, useContext, useReducer } from 'react';
import { AuthAction, AuthState, AuthContextProps, AuthProviderProps } from '../utils/interfaces/IfakeAuthContext';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload || null, isAuthenticated: true };
    case 'logout':
      return { ...initialState };
    default:
      throw new Error('Unknown action type');
  }
}

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  user: null,
  isAuthenticated: false,
});

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Auth conteht must be used inside AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
