import * as React from "react";
import { useContext, useEffect, useState, FC, ReactNode, SetStateAction, Dispatch } from "react";

export interface AuthContextType {
  isAuth: boolean;
  toggleAuth: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuth: false,
  toggleAuth: () => {},
};

export const AuthContext = React.createContext(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setAuth] = useState<boolean>(JSON.parse(localStorage.getItem('isAuth') ?? 'false'));

  const initializeAuth = async () => {
    console.log('useEffect toggleAuth222');
    const authValue = await JSON.parse(localStorage.getItem("isAuth") ?? 'false');
    setAuth(authValue);
  };

  useEffect(() => {
    console.log('useEffect toggleAuth');
    initializeAuth();
  }, []);

  const toggleAuth = () => {
    console.log('toggleAuth')
    setAuth((prevIsAuth) => {
      const newIsAuth = !prevIsAuth;
      localStorage.setItem('isAuth', JSON.stringify(newIsAuth));
      localStorage.removeItem('role');
      return newIsAuth;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
