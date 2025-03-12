import { createContext, ReactNode, useContext, useReducer } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthReducerProps = {
  state: AuthState;
  action: AuthActionProps;
};

type AuthActionProps = {
  type: string;
  payload?: string;
};

type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthState, action: AuthActionProps) {
  switch (action.type) {
    case "login":
      return { ...state };
  }
}

const AuthContext = createContext();

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {}

  function logout() {}

  return (
    <AuthContext.Provider value={(login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth conteht must be used inside AuthProvider.");
  }

  return context;
}
